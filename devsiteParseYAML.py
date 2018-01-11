import os
import yaml
import logging
import devsitePage
import devsiteHelper
from google.appengine.ext.webapp.template import render

SOURCE_PATH = os.path.join(os.path.dirname(__file__), 'src/content')


def parse(requestPath, fileLocation, rawYaml, lang='en'):
  parsedYaml = yaml.load(rawYaml)
  page = parsedYaml['landing_page']

  # Get the project_path and read/parse the project file.
  projectPath = parsedYaml['project_path']
  parentProjectYaml = None
  projectYaml = yaml.load(devsiteHelper.readFile(projectPath, lang))
  if 'parent_project_metadata_path' in projectYaml:
    parentprojectPath = projectYaml['parent_project_metadata_path']
    parentProjectYaml = yaml.load(devsiteHelper.readFile(parentprojectPath, lang))

  # Get the book path and read/parse the book file.
  bookPath = parsedYaml['book_path']
  bookYaml = devsiteHelper.parseBookYaml(bookPath, lang)
  # parse the book file to get the lower tabs.
  lowerTabs = devsiteHelper.getLowerTabs(bookYaml)

  # Get the row or column count for each row
  for row in page['rows']:
    if 'items' in row:
      count = len(row['items'])
      row['itemCount'] = count
    elif 'columns' in row:
      count = len(row['columns'])
      row['itemCount'] = count

  # Get the logo row (TOP ROW) title
  logoRowTitle = projectYaml['name']
  if parentProjectYaml:
    logoRowTitle = parentProjectYaml['name']

  # Get the custom CSS path
  customCSSPath = None
  if 'custom_css_path' in page:
    customCSSPath = page['custom_css_path']

  # Get the header title & page title
  pageTitle = []
  headerTitle = None
  if 'title' in parsedYaml:
    headerTitle = parsedYaml['title']
    pageTitle.append(parsedYaml['title'])
  if 'parent_project_metadata_path' in projectYaml:
    headerTitle = projectYaml['name']
  # Get the header description
  headerDescription = None
  if 'header' in page and 'description' in page['header']:
    headerDescription = page['header']['description']
  else:
    headerDescription = projectYaml['description']
  # Get the header buttons
  headerButtons = None
  if 'header' in page and 'buttons' in page['header']:
    headerButtons = page['header']['buttons']
  pageTitle.append(projectYaml['name'])
  pageTitle.append('Google Developers')

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

  context = {
    'lang': lang,
    'requestPath': requestPath,
    'bodyClass': 'devsite-landing-page',
    'logoRowTitle': logoRowTitle,
    'bookYaml': devsiteHelper.expandBook(bookYaml),
    'lowerTabs': lowerTabs,
    'customCSSPath': customCSSPath,
    'projectYaml': projectYaml,
    'pageTitle': ' | '.join(pageTitle),
    'headerButtons': headerButtons,
    'headerDescription': headerDescription,
    'headerTitle': headerTitle,
    'rows': page['rows'],
    'footerPromos': footerPromos,
    'footerLinks': footerLinks
  }
  return render('gae/page-landing.html', context)



