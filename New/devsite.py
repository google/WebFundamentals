import yaml
import logging
import xml.etree.ElementTree as ET
from google.appengine.ext.webapp.template import render

def generateHTMLfromYaml(lang, rawYaml):
  content = ""
  parsedYaml = yaml.load(rawYaml)
  page = parsedYaml['landing_page']
  rows = page['rows']
  for row in rows:
    logging.info(row)
    section = '<section '
    sectionClass = ['devsite-landing-row']
    if 'classname' in row:
      sectionClass.append(row['classname'])
    if 'items' in row:
      numItems = len(row['items'])
      sectionClass.append('devsite-landing-row-' + str(numItems) + '-up')
    section += 'class="' + ' '.join(sectionClass) + '">'
    if 'heading' in row:
      section += '<h2>' + row['heading'] + '</h2>'
    ## TODO: Add stuff to support columns
    if 'items' in row:
      for item in row['items']:
        section += '<div class="devsite-landing-row-item">'
        if 'image_path' in item:
          section += '<img src="' + item['image_path'] + '" '
          section += 'class="devsite-landing-row-item-image">' 
        if 'heading' in item:
          section += '<h3>' + item['heading'] + '</h3>'
        if 'description' in item:
          section += '<div class="devsite-landing-row-item-description">'
          section += item['description']
          if 'buttons' in item:
            section += '<div class="devsite-landing-row-item-buttons">'
            for button in item['buttons']:
              section += '<a href="' + button['path'] + '"'
              if 'classname' in button:
                section += ' class="' + button['classname'] + '"'
              else:
                section += ' class="button button-white"'
              section += '>' + button['label'] + '</a>'
            section += '</div>'
          section += '</div>'
      if 'custom_html' in item:
        section += item['custom_html']
      section += '</div>'
    section += '</section>'

    content += section
    
  text = render("gae/home.tpl", {
                "title": 'Title',
                "leftNav": '',
                "content": content,
                "toc": '',
                "lang": lang}
              )
  return text


