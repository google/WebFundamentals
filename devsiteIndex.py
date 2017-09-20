import os
import yaml
import logging
import devsitePage
import devsiteHelper
from google.appengine.ext.webapp.template import render

SOURCE_PATH = os.path.join(os.path.dirname(__file__), 'src/content')

def getPage(requestPath, lang):
  response = None
  fileLocations = [
    os.path.join(SOURCE_PATH, lang, requestPath, '_index.yaml'),
    os.path.join(SOURCE_PATH, 'en', requestPath, '_index.yaml'),
    os.path.join(SOURCE_PATH, lang, requestPath, 'index.md'),
    os.path.join(SOURCE_PATH, 'en', requestPath, 'index.md')
  ]
  for fileLocation in fileLocations:
    if os.path.isfile(fileLocation):
      fileContent = open(fileLocation, 'r').read()
      fileContent = fileContent.decode('utf8')

      if fileLocation.endswith('_index.yaml'):
        response = generateYaml(lang, requestPath, fileContent)
        break

      if fileLocation.endswith('index.md'):
        # index.md are treated like other devsite pages, so just use the
        # devsitePage rendering template.
        requestPath = os.path.join(requestPath, 'index')
        response = devsitePage.getPage(requestPath, lang)
        break

  if response is None and os.environ['SERVER_SOFTWARE'].startswith('Dev'):
    if (requestPath.startswith('showcase/') or
        requestPath.startswith('shows/') or requestPath.startswith('updates/')):
      content = ''
      content += '<h1>Generated Listing Page</h1>\n'
      content += '<aside class="warning" markdown="1"><strong>Oops</strong> '
      content += '<span>Looks like you forgot to build the index files. Try '
      content += 'running <code>gulp build</code> from the command line.'
      content += '</span></aside>'
      fileList = os.listdir(os.path.join(SOURCE_PATH, 'en', requestPath))
      for f in fileList:
        if not f.startswith('_'):
          p = '/web/' + requestPath + f.replace('.md', '')
          line = '<li>'
          line += '<a href="' + p + '">' + p + '</a>'
          line += '</li>'
          content += line

      response = render('gae/article.tpl', {
        'title': 'Whoops! Missing index page!',
        'requestPath': requestPath,
        'leftNav': '',
        'content': content,
        'toc': '',
        'dateUpdated': 'now',
        'lang': 'en'}
      )
  return response


def parseIndexYamlItems(yamlItems):
  result = ''
  for yamlItem in yamlItems:
    item = '<div class="[[ITEM_CLASSES]]">'
    itemClasses = ['devsite-landing-row-item']
    descriptionClasses = ['devsite-landing-row-item-description']
    link = None

    if 'path' in yamlItem:
      link = '<a href="' + yamlItem['path'] + '">'

    if 'icon' in yamlItem:
      if link:
        item += link
      if 'icon_name' in yamlItem['icon']:
        item += '<div class="devsite-landing-row-item-icon material-icons">'
        item += yamlItem['icon']['icon_name']
        item += '</div>'
        descriptionClasses.append('devsite-landing-row-item-icon-description')
      if 'path' in yamlItem['icon']:
        item += '<img class="devsite-landing-row-item-icon" src="'
        item += yamlItem['icon']['path']
        item += '">'
        descriptionClasses.append('devsite-landing-row-item-icon-description')
      if link:
        item += '</a>'

    if 'image_path' in yamlItem:
      imgClass = 'devsite-landing-row-item-image'
      if 'image_left' in yamlItem:
        imgClass += ' devsite-landing-row-item-image-left'
      item += '<img src="' + yamlItem['image_path'] + '" '
      item += 'class="' + imgClass + '">'
    elif not 'youtube_id' in yamlItem:
      itemClasses.append('devsite-landing-row-item-no-image')

    if 'description' in yamlItem:
      item += '<div class="[[DESCRIPTION_CLASSES]]">'
      if 'heading' in yamlItem:
        if link:
          item += link
        item += '<h3 id="' + devsiteHelper.slugify(yamlItem['heading']) +'">'
        item += yamlItem['heading'] + '</h3>'
        # item += '<h3>' + yamlItem['heading'] + '</h3>'
        if link:
          item += '</a>'
      item += yamlItem['description']
      if 'buttons' in yamlItem:
        item += '<div class="devsite-landing-row-item-buttons">'
        for button in yamlItem['buttons']:
          item += '<a href="' + button['path'] + '"'
          if 'classname' in button:
            item += ' class="' + button['classname'] + '"'
          else:
            item += ' class="button button-white"'
          item += '>' + button['label'] + '</a>'
        item += '</div>'
      item += '</div>'

    if 'custom_html' in yamlItem:
      item += devsiteHelper.renderDevSiteContent(yamlItem['custom_html'])

    if 'youtube_id' in yamlItem:
      item += '<div class="devsite-landing-row-item-youtube">'
      item += '<iframe class="devsite-embedded-youtube-video" '
      item += 'frameborder="0" allowfullscreen '
      item += 'src="//www.youtube.com/embed/' + yamlItem['youtube_id']
      item += '?autohide=1&showinfo=0&enablejsapi=1">'
      item += '</iframe>'
      item += '</div>'

    item += '</div>'
    item = item.replace('[[ITEM_CLASSES]]', ' '.join(itemClasses))
    item = item.replace('[[DESCRIPTION_CLASSES]]', ' '.join(descriptionClasses))

    result += item

  return result

def generateYaml(lang, requestPath, rawYaml):
  content = ''
  parsedYaml = yaml.load(rawYaml)
  bookPath = parsedYaml['book_path']
  bookYaml = devsiteHelper.parseBookYaml(bookPath, lang)
  projectPath = parsedYaml['project_path']
  page = parsedYaml['landing_page']
  rows = page['rows']
  title = 'Web'
  banner = devsiteHelper.getAnnouncementBanner(projectPath, lang)
  header = 'Generic Page Header Here'
  customCss = ''
  lowerTabs = devsiteHelper.getLowerTabs(bookYaml)
  if 'custom_css_path' in page:
    customCss = '<link rel="stylesheet" href="'
    customCss += page['custom_css_path']
    customCss += '">'
  if 'header' in page:
    header = '<div class="devsite-collapsible-section">'
    header += '<div class="devsite-header-background devsite-full-site-width">'
    header += '<div class="devsite-product-id-row devsite-full-site-width">'
    
    if 'description' in page['header']:
      header += '<div class="devsite-product-description-row">'
      header += '<div class="devsite-product-description">'
      header += page['header']['description']
      header += '</div></div>'
    if 'buttons' in page['header']:
      header += '<div class="devsite-product-button-row">'
      for button in page['header']['buttons']:
        header += '<a class="button" href="'
        header += button['path'] + '">' + button['label'] + '</a>'
      header += '</div>'
    header += '</div></div></div>'
    if 'name' in page['header']:
      title = page['header']['name']
  for row in rows:
    sectionClass = ['devsite-landing-row']
    section = '<section class="[[SECTION_CLASSES]]">'
    if 'classname' in row:
      sectionClass.append(row['classname'])
    numItems = None
    if 'columns' in row:
      numItems = len(row['columns'])
    elif 'items' in row:
      numItems = len(row['items'])
    if numItems:
      sectionClass.append('devsite-landing-row-' + str(numItems) + '-up')
    if 'heading' in row:
      section += '<h2 id="' + devsiteHelper.slugify(row['heading']) +'">'
      section += row['heading'] + '</h2>'
    if 'items' in row:
      section += '<div class="devsite-landing-row-group">'
      section += parseIndexYamlItems(row['items'])
      section += '</div>'
    if 'columns' in row:
      for column in row['columns']:
        section += '<div class="devsite-landing-row-column">'
        if 'items' in column:
          section += parseIndexYamlItems(column['items'])
        section += '</div>'
    section += '</section>'
    section = section.replace('[[SECTION_CLASSES]]', ' '.join(sectionClass))
    content += section
    content = devsiteHelper.renderDevSiteContent(content, lang)
  text = render('gae/home.tpl', {
                'title': title,
                'announcementBanner': banner,
                'requestPath': requestPath,
                'lowerTabs': lowerTabs,
                'customcss': customCss,
                'header': header,
                'content': content,
                'lang': lang,
                'footerPromo': devsiteHelper.getFooterPromo(),
                'footerLinks': devsiteHelper.getFooterLinkBox()
                }
              )
  return text
