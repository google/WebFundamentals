import os
import logging
import devsiteHelper
import devsiteParseMD
import devsiteParseHTML
import devsiteParseYAML

SOURCE_PATH = os.path.join(os.path.dirname(__file__), 'src/content')

def getPage(requestPath, lang):
  fileLocations = [
    os.path.join(SOURCE_PATH, lang, requestPath, '_index.yaml'),
    os.path.join(SOURCE_PATH, 'en', requestPath, '_index.yaml'),
    os.path.join(SOURCE_PATH, lang, requestPath, 'index.md'),
    os.path.join(SOURCE_PATH, 'en', requestPath, 'index.md'),
    os.path.join(SOURCE_PATH, 'lang', requestPath, 'index.html'),
    os.path.join(SOURCE_PATH, 'en', requestPath, 'index.html')
  ]
  for fileLocation in fileLocations:
    if os.path.isfile(fileLocation):
      content = open(fileLocation, 'r').read()
      content = content.decode('utf8')
      if fileLocation.endswith('_index.yaml'):
        return devsiteParseYAML.parse(requestPath, fileLocation, content, lang)
      if fileLocation.endswith('index.md'):
        return devsiteParseMD.parse(requestPath, fileLocation, content, lang)
      if fileLocation.endswith('index.html'):
        return devsiteParseHTML.parse(requestPath, fileLocation, content, lang)
  return None


def getDirIndex(requestPath):
  result = None
  if os.environ['SERVER_SOFTWARE'].startswith('Dev'):
    result = ''
    result += '<h1>Generated Listing Page</h1>\n'
    result += '<aside class="warning" markdown="1"><strong>Oops</strong> '
    result += '<span>Looks like you forgot to build the index files. Try '
    result += 'running <code>gulp build</code> from the command line.'
    result += '</span></aside>'
    fileList = os.listdir(os.path.join(SOURCE_PATH, 'en', requestPath))
    for f in fileList:
      if not f.startswith('_'):
        link = os.path.join('/web', requestPath, os.path.splitext(f)[0])
        result += '<li><a href="' + link + '">' + link + '</a></li>'
  return result
