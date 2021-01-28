import os
import re
import yaml
import logging
import markdown
import devsiteHelper
from google.appengine.ext.webapp.template import render

SOURCE_PATH = os.path.join(os.path.dirname(__file__), 'src/content/')
SERVED_FROM_AE = not os.environ['SERVER_SOFTWARE'].startswith('Dev')

def parse(requestPath, fileLocation, content, lang='en'):
  context = {
    'lang': lang,
    'requestPath': requestPath.replace('/index', ''),
    'bodyClass': 'devsite-doc-page',
    'servedFromAppEngine': SERVED_FROM_AE
  }

  ## Injects markdown includes into the markdown as appropriate
  includes = re.findall(r'^<<.+?\.md>>(?m)', content)
  for includeTag in includes:
    fileName = includeTag.replace('<<', '').replace('>>', '')
    fileName = os.path.join(os.path.dirname(fileLocation), fileName)
    include = devsiteHelper.readFile(fileName, lang)
    if include is None:
      include = 'Warning: Unable to find included markdown file.\n\n'
    content = content.replace(includeTag, include)

  # Remove any comments {# something #}
  content = re.sub(r'{#.+?#}', '', content)
  content = re.sub(r'{% comment %}.*?{% endcomment %}(?ms)', '', content)

  # Remove any markdown=1 since it's not supported
  content = re.sub(r'markdown=[\'\"]?1[\'\"]?', '', content)

  # Render any DevSite specific tags
  content = devsiteHelper.renderDevSiteContent(content, lang)

  # Turn Callouts into the appropriate HTML elements
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
    'markdown.extensions.extra' #
  ]
  md = markdown.Markdown(extensions=ext)
  content = md.convert(content)

  # Replaces <pre> tags with prettyprint enabled tags
  content = re.sub(r'^<pre>(?m)', r'<pre class="prettyprint devsite-code-highlight">', content)
  # Adds code highlighting support, which requires devsite-code-highlight
  content = re.sub(r'^<pre class="prettyprint">(?m)', r'<pre class="prettyprint devsite-code-highlight">', content)

  # Save the content
  context['content'] = content

  # Get the project_path and read/parse the project file.
  projectPath = md.Meta['project_path'][0]
  projectYaml = yaml.load(devsiteHelper.readFile(projectPath, lang))
  context['projectYaml'] = projectYaml

  # Read the parent project.yaml file if applicable
  parentProjectYaml = None
  if 'parent_project_metadata_path' in projectYaml:
    parentprojectPath = projectYaml['parent_project_metadata_path']
    parentProjectYaml = yaml.load(devsiteHelper.readFile(parentprojectPath, lang))

  # Reads the book.yaml file and generate the lefthand nav
  bookPath = md.Meta['book_path'][0]
  bookYaml = devsiteHelper.parseBookYaml(bookPath, lang)
  context['bookYaml'] = devsiteHelper.expandBook(bookYaml)
  # context['lowerTabs'] = devsiteHelper.getLowerTabs(bookYaml)
  context['renderedLeftNav'] = devsiteHelper.getLeftNav(requestPath, bookYaml)

  lowerTabs = devsiteHelper.getLowerTabs(bookYaml)
  context['lowerTabs'] = lowerTabs

  # Get the logo row (TOP ROW) icon
  context['logoRowIcon'] = projectYaml['icon']['path']

  # Get the logo row (TOP ROW) title
  if parentProjectYaml:
    context['logoRowTitle'] = parentProjectYaml['name']
  else:
    context['logoRowTitle'] = projectYaml['name']

  # Get the header title & description
  context['headerTitle'] = projectYaml['name']
  # headerDescription is rarely shown, hiding temporarily
  # context['headerDescription'] = projectYaml['description']

  # Get the page title
  pageTitle = []
  titleRO = re.search(r'<h1 class="page-title".*?>(.*?)<\/h1>', content)
  if titleRO:
    pageTitle.append(titleRO.group(1))
  pageTitle.append(projectYaml['name'])
  pageTitle.append('WebFu Staging')
  context['pageTitle'] = ' | '.join(pageTitle)

  # Get the footer path & read/parse the footer file.
  footerPath = projectYaml['footer_path']
  footers = yaml.load(devsiteHelper.readFile(footerPath, lang))['footer']
  for item in footers:
    if 'promos' in item:
      context['footerPromos'] = item['promos']
    elif 'linkboxes' in item:
      context['footerLinks'] = item['linkboxes']

  if 'full_width' in md.Meta and len(md.Meta['full_width']) == 1:
    context['fullWidth'] = True

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
  context['renderedTOC'] = toc;

  gitHubEditUrl = 'https://github.com/google/WebFundamentals/blob/'
  gitHubEditUrl += 'main/src/content/'
  gitHubEditUrl += fileLocation.replace(SOURCE_PATH, '')
  context['gitHubEditUrl'] = gitHubEditUrl

  gitHubIssueUrl = 'https://github.com/google/WebFundamentals/issues/'
  gitHubIssueUrl += 'new?title=Feedback for: ' + context['pageTitle'] + ' ['
  gitHubIssueUrl += lang + ']&body='
  gitHubIssueUrl += gitHubEditUrl
  context['gitHubIssueUrl'] = gitHubIssueUrl

  return render('gae/page-article.html', context)
