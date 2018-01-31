import os
import yaml
import logging
import devsitePage
import devsiteHelper
from google.appengine.ext.webapp.template import render

SOURCE_PATH = os.path.join(os.path.dirname(__file__), 'src/content')


def parse(requestPath, fileLocation, rawYaml, lang='en'):
  context = {
    'lang': lang,
    'requestPath': requestPath.replace('/index', ''),
    'bodyClass': 'devsite-landing-page'
  }

  # Parse the Yaml
  parsedYaml = yaml.load(rawYaml)
  page = parsedYaml['landing_page']

  # Get the project_path and read/parse the project file.
  projectPath = parsedYaml['project_path']
  projectYaml = yaml.load(devsiteHelper.readFile(projectPath, lang))
  context['projectYaml'] = projectYaml

  # Read the parent project.yaml file if applicable
  parentProjectYaml = None
  if 'parent_project_metadata_path' in projectYaml:
    parentprojectPath = projectYaml['parent_project_metadata_path']
    parentProjectYaml = yaml.load(devsiteHelper.readFile(parentprojectPath, lang))

  # Get the book path and read/parse the book file, then add the lower tabs.
  bookPath = parsedYaml['book_path']
  bookYaml = devsiteHelper.parseBookYaml(bookPath, lang)
  context['bookYaml'] = devsiteHelper.expandBook(bookYaml)
  context['lowerTabs'] = devsiteHelper.getLowerTabs(bookYaml)

  # Get the row or column count for each row
  for row in page['rows']:
    if 'items' in row:
      count = len(row['items'])
      row['itemCount'] = count
      for item in row['items']:
        if 'custom_html' in item:
          c = item['custom_html']
          item['custom_html'] = devsiteHelper.renderDevSiteContent(c, lang)
    elif 'columns' in row:
      count = len(row['columns'])
      row['itemCount'] = count
    elif 'custom_html' in row:
      row['itemCount'] = 1
      c = row['custom_html']
      row['custom_html'] = devsiteHelper.renderDevSiteContent(c, lang)
  context['rows'] = page['rows']

  # Get the custom CSS path
  if 'custom_css_path' in page:
    context['customCSSPath'] = page['custom_css_path']

  # Get the logo row (TOP ROW) icon
  context['logoRowIcon'] = projectYaml['icon']['path']

  # Get the logo row (TOP ROW) title
  if 'header' in page and 'name' in page['header']:
    context['logoRowTitle'] = page['header']['name']
  elif parentProjectYaml:
    context['logoRowTitle'] = parentProjectYaml['name']
  else:
    context['logoRowTitle'] = projectYaml['name']

  # Get the custom_html for the header if appropriate
  if 'header' in page and 'custom_html' in page['header']:
    context['customHeader'] = page['header']['custom_html']

  # Get the header title
  if 'parent_project_metadata_path' in projectYaml:
    context['headerTitle'] = projectYaml['name']
  elif 'title' in parsedYaml:
    context['headerTitle'] = parsedYaml['title']
  else:
    context['headerTitle'] = projectYaml['name']

  # Get the header description
  if 'header' in page and 'description' in page['header']:
    context['headerDescription'] = page['header']['description']
  else:
    context['headerDescription'] = projectYaml['description']

  # Get the header buttons
  if 'header' in page and 'buttons' in page['header']:
    context['headerButtons'] = page['header']['buttons']

  # Set the page title
  pageTitle = []
  if 'title' in parsedYaml:
    pageTitle.append(parsedYaml['title'])
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

  return render('gae/page-landing.html', context)



