import yaml
from google.appengine.ext.webapp.template import render

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
      if link:
        item += '</a>' 
    if 'image_path' in yamlItem:
      item += '<img src="' + yamlItem['image_path'] + '" '
      item += 'class="devsite-landing-row-item-image">' 
    else:
      itemClasses.append('devsite-landing-row-item-no-image')
    if 'description' in yamlItem:
      item += '<div class="[[DESCRIPTION_CLASSES]]">'
      if 'heading' in yamlItem:
        if link:
          item += link
        item += '<h3>' + yamlItem['heading'] + '</h3>'
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
    if 'youtube_id' in yamlItem:
      result += '<div class="devsite-landing-row-item-youtube">'
      result += '<iframe class="devsite-embedded-youtube-video" '
      result += 'frameborder="0" allowfullscreen '
      result += 'src="//www.youtube.com/embed/' + yamlItem['youtube_id']
      result += '?autohide=1&showinfo=0&enablejsapi=1">'
      result += '</iframe>'
      result += '</div>'
    if 'custom_html' in yamlItem:
      item += yamlItem['custom_html']
    item += '</div>'
    item = item.replace('[[ITEM_CLASSES]]', ' '.join(itemClasses))
    item = item.replace('[[DESCRIPTION_CLASSES]]', ' '.join(descriptionClasses))
    result += item
  return result

def generateYaml(lang, rawYaml):
  content = ''
  parsedYaml = yaml.load(rawYaml)
  page = parsedYaml['landing_page']
  rows = page['rows']
  header = 'Generic Page Header Here'
  customCss = ''
  if 'custom_css_path' in page:
    customCss = '<link rel="stylesheet" href="'
    customCss += page['custom_css_path']
    customCSS += '">'
  if 'header' in page:
    if 'description' in page['header']:
      header = page['header']['description']
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
      section += '<h2>' + row['heading'] + '</h2>'
    if 'items' in row:
      section += parseIndexYamlItems(row['items'])
    if 'columns' in row:
      for column in row['columns']:
        section += '<div class="devsite-landing-row-column">'
        if 'items' in column:
          section += parseIndexYamlItems(column['items'])
        section += '</div>'
    section += '</section>'
    section = section.replace('[[SECTION_CLASSES]]', ' '.join(sectionClass))
    content += section
  text = render('gae/home.tpl', {
                'title': 'Web',
                'customcss': customCss,
                'header': header,
                'content': content,
                'lang': lang}
              )
  return text


