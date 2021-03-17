import os
import re
import yaml
import logging
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

  ## Get the HTML tag
  htmlTag = re.search(r'<html.*?>', content)
  if htmlTag is None:
    logging.warning('Does not contain <html> root element')
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

  # Remove any comments {# something #}
  body = re.sub(r'{#.+?#}', '', body)
  body = re.sub(r'{% comment %}.*?{% endcomment %}(?ms)', '', body)

  # Render any DevSite specific tags
  body = devsiteHelper.renderDevSiteContent(body, lang)

  # Read the project.yaml file
  projectPath = re.search('name=\"project_path\" value=\"(.*?)\"', head)
  projectPath = projectPath.group(1)
  projectYaml = yaml.load(devsiteHelper.readFile(projectPath, lang))
  context['projectYaml'] = projectYaml

  # Read the parent project.yaml file if applicable
  parentProjectYaml = None
  if 'parent_project_metadata_path' in projectYaml:
    parentprojectPath = projectYaml['parent_project_metadata_path']
    parentProjectYaml = yaml.load(devsiteHelper.readFile(parentprojectPath, lang))

  # Read the book.yaml file and generate the left hand nav
  bookPath = re.search('name=\"book_path\" value=\"(.*?)\"', head)
  bookPath = bookPath.group(1)
  bookYaml = devsiteHelper.parseBookYaml(bookPath, lang)
  context['bookYaml'] = devsiteHelper.expandBook(bookYaml)
  context['lowerTabs'] = devsiteHelper.getLowerTabs(bookYaml)
  context['renderedLeftNav'] = devsiteHelper.getLeftNav(requestPath, bookYaml)

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

  # Read the page title
  pageTitle = []
  titleRO = re.search('<title>(.*?)</title>', head)
  if titleRO:
    title = titleRO.group(1)
    pageTitle.append(title)
    if body.find('<h1>') == -1:
      body = '<h1 class="page-title">' + title + '</h1>\n\n' + body
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

  # Replaces <pre> tags with prettyprint enabled tags
  body = re.sub(r'^<pre>(?m)', r'<pre class="prettyprint devsite-code-highlight">', body)
  # Adds code highlighting support, which requires devsite-code-highlight
  body = re.sub(r'^<pre class="prettyprint">(?m)', r'<pre class="prettyprint devsite-code-highlight">', body)

  context['content'] = body

  # Checks if the page should be displayed in full width mode
  fullWidth = re.search('name=\"full_width\" value=\"true\"', head)
  if fullWidth:
    context['fullWidth'] = True

  # # Build the table of contents & transform so it fits within DevSite
  context['renderedTOC'] = '<b>TOC Not Implemented</b> for DevSite HTML Pages'

  gitHubEditUrl = 'https://github.com/google/WebFundamentals/blob/'
  gitHubEditUrl += 'main/src/content/'
  gitHubEditUrl += fileLocation.replace(SOURCE_PATH, '')
  context['gitHubEditUrl'] = gitHubEditUrl

  gitHubIssueUrl = 'https://github.com/google/WebFundamentals/issues/'
  gitHubIssueUrl += 'new?title=Feedback for: ' + context['pageTitle'] + ' ['
  gitHubIssueUrl += lang + ']&body='
  gitHubIssueUrl += gitHubEditUrl
  context['gitHubIssueUrl'] = gitHubIssueUrl

  # Renders the content into the template
  return render('gae/page-article.html', context)
