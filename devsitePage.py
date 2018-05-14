import os
import logging
import devsiteParseMD
import devsiteParseHTML

SOURCE_PATH = os.path.join(os.path.dirname(__file__), 'src/content/')

def getPage(requestPath, lang):
  fileLocations = [
    os.path.join(SOURCE_PATH, lang, requestPath) + '.md',
    os.path.join(SOURCE_PATH, lang, requestPath) + '.html',
    os.path.join(SOURCE_PATH, lang, requestPath) + '.jshtml',
    os.path.join(SOURCE_PATH, 'en', requestPath) + '.md',
    os.path.join(SOURCE_PATH, 'en', requestPath) + '.html',
    os.path.join(SOURCE_PATH, 'en', requestPath) + '.jshtml',
  ]
  for fileLocation in fileLocations:
    if os.path.isfile(fileLocation):
      content = open(fileLocation, 'r').read()
      content = content.decode('utf8')
      if fileLocation.endswith('.jshtml'):
        return content
      if fileLocation.endswith('.md'):
        return devsiteParseMD.parse(requestPath, fileLocation, content, lang)
      if fileLocation.endswith('.html'):
        return devsiteParseHTML.parse(requestPath, fileLocation, content, lang)
  return None
