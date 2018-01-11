import os
import re
import yaml
import logging
import devsiteHelper
from google.appengine.ext.webapp.template import render

SOURCE_PATH = os.path.join(os.path.dirname(__file__), 'src/content/')
UNSUPPORTED_TAGS = [
  r'{% link_sample_button .+%}',
  r'{% include_code (.+)%}'
]

def parse(requestPath, fileLocation, content, lang='en'):
  ## Get the HTML tag
  htmlTag = re.search(r'<html.*?>', content)
  if htmlTag is None:
    log.warning('Does not contain <html> root element')
  else:
    htmlTag = htmlTag.group(0)
    # Check the HTML tag contains the devsite
    if htmlTag.find('devsite') == -1:
      return content

  # Isolate the <head>
  headStart = content.find('<head')
  headEnd = content.find('</head>')
  head = content[headStart:headEnd].strip()

  # Isolate the <body>
  bodyStart = content.find('<body')
  bodyEnd = content.rfind('</body>')
  body = content[bodyStart:bodyEnd].strip()
  body = re.sub(r'<body.*?>', '', body)

  dateUpdated = re.search(r"{# wf_updated_on:[ ]?(.*)[ ]?#}", content)
  if dateUpdated is None:
    dateUpdated = 'Unknown'
  else:
    dateUpdated = dateUpdated.group(1)

  # Remove any comments {# something #}
  body = re.sub(r'{#.+?#}', '', body)
  body = re.sub(r'{% comment %}.*?{% endcomment %}(?ms)', '', body)

  # Show warning for unsupported elements
  for tag in UNSUPPORTED_TAGS:
    if re.search(tag, body) is not None:
      logging.error(' - Unsupported tag: ' + tag)
      replaceWith = '<aside class="warning">Web<strong>Fundamentals</strong>: '
      replaceWith += '<span>Unsupported tag: <code>' + tag + '</code></span></aside>'
      body = re.sub(tag, replaceWith, body)

  # Show warning for template tags
  if re.search('{{', body) is not None:
    logging.warn(' - Warning: possible unescaped template tag')

  # Render any DevSite specific tags
  body = devsiteHelper.renderDevSiteContent(body, lang)

  # Read the book.yaml file and generate the left hand nav
  bookPath = re.search('name=\"book_path\" value=\"(.*?)\"', head)
  if bookPath is None:
    logging.error('Unable to read book_path')
    leftNav = 'Book not found.'
    lowerTabs = ''
  else:
    bookPath = bookPath.group(1)
    bookYaml = devsiteHelper.parseBookYaml(bookPath, lang)
    leftNav = devsiteHelper.getLeftNav(requestPath, bookYaml)
    lowerTabs = devsiteHelper.getLowerTabs(bookYaml)

  # Read the project.yaml file
  projectPath = re.search('name=\"project_path\" value=\"(.*?)\"', head)
  if bookPath is None:
    logging.error('Unable to read project_path')
  else:
    projectPath = projectPath.group(1)
    announcementBanner = devsiteHelper.getAnnouncementBanner(projectPath, lang)

  parentProjectYaml = None
  projectYaml = yaml.load(devsiteHelper.readFile(projectPath, lang))
  if 'parent_project_metadata_path' in projectYaml:
    parentprojectPath = projectYaml['parent_project_metadata_path']
    parentProjectYaml = yaml.load(devsiteHelper.readFile(parentprojectPath, lang))

  # Read the page title
  pageTitle = []
  title = re.search('<title>(.*?)</title>', head)
  if title is None:
    title = '** UNKNOWN TITLE **'
  else:
    title = title.group(1)
    pageTitle.append(title)
    if body.find('<h1>') == -1:
      body = '<h1 class="page-title">' + title + '</h1>\n\n' + body
  pageTitle.append(projectYaml['name'])
  pageTitle.append('DevSite Staging')

  # Get the header description
  headerTitle = projectYaml['name']
  headerDescription = projectYaml['description']

  # Replaces <pre> tags with prettyprint enabled tags
  body = re.sub(r'^<pre>(?m)', r'<pre class="prettyprint">', body)

  # Checks if the page should be displayed in full width mode
  fullWidth = re.search('name=\"full_width\" value=\"true\"', head)
  if fullWidth is not None:
    template = 'gae/home.tpl'

  # # Build the table of contents & transform so it fits within DevSite
  toc = '- TOC NYI - '

  # Get the footer path & read/parse the footer file.
  footerPath = projectYaml['footer_path']
  footerPromos = None
  footerLinks = None
  footers = yaml.load(devsiteHelper.readFile(footerPath, lang))['footer']
  for item in footers:
    if 'promos' in item:
      footerPromos = item['promos']
    elif 'linkboxes' in item:
      footerLinks = item['linkboxes']

  # Get the logo row (TOP ROW) title
  logoRowTitle = projectYaml['name']
  if parentProjectYaml:
    logoRowTitle = parentProjectYaml['name']

  gitHubEditUrl = 'https://github.com/google/WebFundamentals/blob/'
  gitHubEditUrl += 'master/src/content/'
  gitHubEditUrl += fileLocation.replace(SOURCE_PATH, '')

  gitHubIssueUrl = 'https://github.com/google/WebFundamentals/issues/'
  gitHubIssueUrl += 'new?title=Feedback for: ' + title + ' ['
  gitHubIssueUrl += lang + ']&body='
  gitHubIssueUrl += gitHubEditUrl



  context = {
    'lang': lang,
    'requestPath': requestPath.replace('/index', ''),
    'bodyClass': 'devsite-doc-age',
    'fullWidth': fullWidth,
    'logoRowTitle': logoRowTitle,
    'bookYaml': devsiteHelper.expandBook(bookYaml),
    'lowerTabs': lowerTabs,
    'projectYaml': projectYaml,
    'pageTitle': ' | '.join(pageTitle),
    'headerDescription': headerDescription,
    'headerTitle': headerTitle,
    'footerPromos': footerPromos,
    'footerLinks': footerLinks,
    'content': content,
    'renderedLeftNav': devsiteHelper.getLeftNav(requestPath, bookYaml),
    'renderedTOC': toc,
    'gitHubIssueUrl': gitHubIssueUrl,
    'gitHubEditUrl': gitHubEditUrl
  }

  # Renders the content into the template
  return render('gae/page-article.html', context)
