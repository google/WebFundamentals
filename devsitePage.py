import os
import re
import yaml
import logging
import markdown
import devsiteHelper
from google.appengine.ext.webapp.template import render

SOURCE_PATH = os.path.join(os.path.dirname(__file__), 'src/content/')
UNSUPPORTED_TAGS = [
  r'{% link_sample_button .+%}',
  r'{% include_code (.+)%}'
]

def getPage(requestPath, lang):
  response = None
  title = 'Web Fundamentals'
  leftNav = '- No Left Nav Found - '
  toc = '- No TOC Found - '
  announcementBanner = ''
  template = 'gae/article.tpl'
  fileLocations = [
    os.path.join(SOURCE_PATH, lang, requestPath) + '.md',
    os.path.join(SOURCE_PATH, 'en', requestPath) + '.md',
    os.path.join(SOURCE_PATH, lang, requestPath) + '.jshtml',
    os.path.join(SOURCE_PATH, 'en', requestPath) + '.jshtml',
  ]
  for fileLocation in fileLocations:
    if os.path.isfile(fileLocation):
      content = open(fileLocation, 'r').read()
      content = content.decode('utf8')

      # If it's a .jshtml file, just serve it.
      if fileLocation.endswith('.jshtml'):
        return content

      dateUpdated = re.search(r"{# wf_updated_on:[ ]?(.*)[ ]?#}", content)
      if dateUpdated is None:
        logging.warn('Missing wf_updated_on tag.')
        dateUpdated = 'Unknown'
      else:
        dateUpdated = dateUpdated.group(1)

      ## Injects markdown includes into the markdown as appropriate
      includes = re.findall(r'^<<.+?\.md>>(?m)', content)
      for includeTag in includes:
        fileName = includeTag.replace('<<', '').replace('>>', '')
        fileName = os.path.join(os.path.dirname(fileLocation), fileName)
        include = devsiteHelper.readFile(fileName, lang)
        if include is None:
          include = 'Warning: Unable to find included markdown file.\n\n'
        content = content.replace(includeTag, include)

      # Remove any comments {# something #} from the markdown
      content = re.sub(r'{#.+?#}', '', content)
      content = re.sub(r'{% comment %}.*?{% endcomment %}(?ms)', '', content)

      # Show warning for unsupported elements
      for tag in UNSUPPORTED_TAGS:
        if re.search(tag, content) is not None:
          logging.error(' - Unsupported tag: ' + tag)
          replaceWith = '<aside class="warning">Web<strong>Fundamentals</strong>: '
          replaceWith += '<span>Unsupported tag: <code>' + tag + '</code></span></aside>'
          content = re.sub(tag, replaceWith, content)

      # Show warning for template tags
      if re.search('{{', content) is not None:
        logging.warn(' - Warning: possible unescaped template tag')

      # Render any DevSite specific tags
      content = devsiteHelper.renderDevSiteContent(content, lang)

      # If it's a markdown file, parse it to HTML
      if fileLocation.endswith('.md'):
        content = re.sub(r'^Note: (.*?)\n^\n(?ms)', r'<aside class="note" markdown="1"><strong>Note:</strong> <span>\1</span></aside>', content)
        content = re.sub(r'^Caution: (.*?)\n^\n(?ms)', r'<aside class="caution" markdown="1"><strong>Caution:</strong> <span>\1</span></aside>', content)
        content = re.sub(r'^Warning: (.*?)\n^\n(?ms)', r'<aside class="warning" markdown="1"><strong>Warning:</strong> <span>\1</span></aside>', content)
        content = re.sub(r'^Key Point: (.*?)\n^\n(?ms)', r'<aside class="key-point" markdown="1"><strong>Key Point:</strong> <span>\1</span></aside>', content)
        content = re.sub(r'^Key Term: (.*?)\n^\n(?ms)', r'<aside class="key-term" markdown="1"><strong>Key Term:</strong> <span>\1</span></aside>', content)
        content = re.sub(r'^Objective: (.*?)\n^\n(?ms)', r'<aside class="objective" markdown="1"><strong>Objective:</strong> <span>\1</span></aside>', content)
        content = re.sub(r'^Success: (.*?)\n^\n(?ms)', r'<aside class="success" markdown="1"><strong>Success:</strong> <span>\1</span></aside>', content)
        content = re.sub(r'^Dogfood: (.*?)\n^\n(?ms)', r'<aside class="dogfood" markdown="1"><strong>Dogfood:</strong> <span>\1</span></aside>', content)
        
        # Adds a set of markdown extensions available to us on DevSite
        ext = [
          'markdown.extensions.attr_list', # Adds support for {: #someid }
          'markdown.extensions.meta', # Removes the meta data from the top of the doc
          'markdown.extensions.toc', # Generate the TOC for the right side
          'markdown.extensions.tables', # Support for Markdown Tables
          'markdown.extensions.def_list', # Support for definition lists
          'markdown.extensions.extra' # Support for markdown='1' in tags
        ]
        md = markdown.Markdown(extensions=ext)
        content = md.convert(content)

        # Reads the book.yaml file and generate the lefthand nav
        if 'book_path' in md.Meta and len(md.Meta['book_path']) == 1:
          bookPath = md.Meta['book_path'][0]
          bookYaml = devsiteHelper.parseBookYaml(bookPath, lang)
          leftNav = devsiteHelper.getLeftNav(requestPath, bookYaml)
          lowerTabs = devsiteHelper.getLowerTabs(bookYaml)

        if 'project_path' in md.Meta and len(md.Meta['project_path']) == 1:
          projectPath = md.Meta['project_path'][0]
          announcementBanner = devsiteHelper.getAnnouncementBanner(projectPath, lang)

        # Checks if the page should be displayed in full width mode
        if 'full_width' in md.Meta and len(md.Meta['full_width']) == 1:
          fullWidth = md.Meta['full_width'][0]
          if fullWidth.lower().strip() == 'true':
            template = 'gae/home.tpl'

        # Build the table of contents & transform so it fits within DevSite
        toc = md.toc
        toc = toc.strip()
        # Strips the outer wrapper and the page title from the doc
        toc = re.sub(r'<div class="toc">(.*?<ul>){2}(?s)', '', toc)
        toc = re.sub(r'</ul>\s*</li>\s*</ul>\s*</div>(?s)', '', toc)
        # Add appropriate classes
        toc = re.sub(r'<ul>', '<ul class="devsite-page-nav-list">', toc)
        toc = re.sub(r'<a href', '<a class="devsite-nav-title" href', toc)
        toc = re.sub(r'<li>', '<li class="devsite-nav-item">', toc)

      # Replaces <pre> tags with prettyprint enabled tags
      content = re.sub(r'^<pre>(?m)', r'<pre class="prettyprint">', content)

      # Get the page title from the markup.
      titleRO = re.search(r'<h1 class="page-title".*?>(.*?)<\/h1>', content)
      if titleRO:
        title = titleRO.group(1)

      gitHubEditUrl = 'https://github.com/google/WebFundamentals/blob/'
      gitHubEditUrl += 'master/src/content/'
      gitHubEditUrl += fileLocation.replace(SOURCE_PATH, '')

      gitHubIssueUrl = 'https://github.com/google/WebFundamentals/issues/'
      gitHubIssueUrl += 'new?title=Feedback for: ' + title + ' ['
      gitHubIssueUrl += lang + ']&body='
      gitHubIssueUrl += gitHubEditUrl

      # Renders the content into the template
      response = render(template, {
        'title': title,
        'announcementBanner': announcementBanner,
        'lowerTabs': lowerTabs,
        'gitHubIssueUrl': gitHubIssueUrl,
        'gitHubEditUrl': gitHubEditUrl,
        'requestPath': requestPath.replace('/index', ''),
        'leftNav': leftNav,
        'content': content,
        'toc': toc,
        'dateUpdated': dateUpdated,
        'lang': lang,
        'footerPromo': devsiteHelper.getFooterPromo(),
        'footerLinks': devsiteHelper.getFooterLinkBox()
        }
      )
      break

  return response
