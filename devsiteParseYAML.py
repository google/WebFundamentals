import os
import yaml
import logging
import devsitePage
import devsiteHelper
from google.appengine.ext.webapp.template import render

SOURCE_PATH = os.path.join(os.path.dirname(__file__), 'src/content')


def parse(requestPath, fileLocation, rawYaml, lang='en'):
  body = ''
  parsedYaml = yaml.load(rawYaml)
  bookPath = parsedYaml['book_path']
  bookYaml = devsiteHelper.parseBookYaml(bookPath, lang)
  projectPath = parsedYaml['project_path']
  page = parsedYaml['landing_page']
  rows = page['rows']
  title = 'Web'
  if 'title' in parsedYaml:
    title = parsedYaml['title']
  headerTitle = None
  description = 'Description pulled from <code>_project.yaml</code>'
  headerButtons = None
  banner = devsiteHelper.getAnnouncementBanner(projectPath, lang)
  customHeader = None
  customCSS = None
  lowerTabs = devsiteHelper.getLowerTabs(bookYaml)
  if len(lowerTabs) <= 1:
    lowerTabs = None
  if 'custom_css_path' in page:
    customCSS = '<link rel="stylesheet" href="'
    customCSS += page['custom_css_path']
    customCSS += '">'
  if 'header' in page:
    if 'custom_html' in page['header']:
      customHeader = page['header']['custom_html']
    else:
      if 'name' in page['header']:
        headerTitle = page['header']['name']
      if 'description' in page['header']:
        description = page['header']['description']
      if 'buttons' in page['header']:
        headerButtons = []
        for button in page['header']['buttons']:
          headerButton = '<a class="button" href="'
          headerButton += button['path'] + '">' + button['label'] + '</a>'
          headerButtons.append(headerButton)
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
    if 'description' in row:
      section += '<p class="devsite-landing-row-description">'
      section += row['description'] + '</p>'
    if 'items' in row:
      section += '<div class="devsite-landing-row-group">'
      section += parseIndexYamlItems(row['items'])
      section += '</div>'
    if 'columns' in row:
      section += '<div class="devsite-landing-row-group">'
      for column in row['columns']:
        section += '<div class="devsite-landing-row-column">'
        # if 'items' in column:
        section += parseIndexYamlItems([column])
        section += '</div>'
      section += '</div>'
    section += '</section>'
    section = section.replace('[[SECTION_CLASSES]]', ' '.join(sectionClass))
    body += section
    body = devsiteHelper.renderDevSiteContent(body, lang)
  return render('gae/home.tpl', {
                'title': title,
                'headerTitle': title,
                'description': description,
                'headerButtons': headerButtons,
                'announcementBanner': banner,
                'requestPath': requestPath,
                'lowerTabs': lowerTabs,
                'customCSS': customCSS,
                'customHeader': customHeader,
                'content': body,
                'lang': lang,
                'footerPromo': devsiteHelper.getFooterPromo(),
                'footerLinks': devsiteHelper.getFooterLinkBox()
                }
              )


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
    elif 'custom_image' in yamlItem:
      figClasses = 'devsite-landing-row-item-image '
      figClasses += 'devsite-landing-row-item-custom-image '
      figClasses += 'devsite-background '
      figClasses += 'devsite-background-'
      figClasses += yamlItem['custom_image']['background']
      figDivClasses = 'devsite-landing-row-item-custom-image-icon '
      figDivClasses += 'material-icons'
      item += '<figure class="' + figClasses + '">'
      item += link
      item += '<div class="' + figDivClasses + '">'
      item += yamlItem['custom_image']['icon_name']
      item += '</div></a></figure>'
    elif 'image_path' in yamlItem:
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

