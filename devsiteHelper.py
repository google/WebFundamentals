import re
import os
import cgi
import yaml
import hashlib
import logging
import textwrap
from datetime import date, datetime
from google.appengine.api import memcache
from google.appengine.ext.webapp.template import render

SOURCE_PATH = os.path.join(os.path.dirname(__file__), 'src/content/')

def slugify(str):
  # Very simply slugify
  slug = str.encode('ascii', 'ignore').lower()
  slug = re.sub(r'[^a-z0-9]+', '-', slug).strip('-')
  slug = re.sub(r'[-]+', '-', slug)
  return slug


def checkForRedirect(requestedPath, lang, useMemcache):
  # Reads the redirect files from the current directory and up the directory
  # tree then checks to see if a redirect exists for the current URL.
  redirects = []
  requestDir = requestedPath
  if not requestDir.endswith('/'):
    requestDir = requestDir[:requestDir.rindex('/') + 1]
  requestDir = re.sub(r'^/?web/', '', requestDir)
  requestDir = os.path.join(SOURCE_PATH, lang, requestDir)

  while requestDir.startswith(SOURCE_PATH):
    try:
      redirectFile = os.path.join(requestDir, '_redirects.yaml')
      if os.path.isfile(redirectFile):
        memcacheKey = 'redirectFile-' + redirectFile
        parsed = memcache.get(memcacheKey)
        if parsed is None:
          raw = open(redirectFile, 'r').read().decode('utf8')
          parsed = yaml.load(raw)
          if useMemcache:
            memcache.set(memcacheKey, parsed)
        if 'redirects' in parsed:
          redirects += parsed['redirects']
        else:
          logging.warning('Didn\'t find redirects key in ' + redirectFile)
      requestDir = os.path.join(requestDir, '..')
      requestDir = os.path.normpath(requestDir)
    except Exception as e:
      logging.exception('checkForRedirect Failed')

  for redirect in redirects:
    redirectTo = None
    if requestedPath == redirect['from']:
      return redirect['to']
    if redirect['from'].endswith('/...'):
      redirectFrom = redirect['from'].replace('...', '')
      if requestedPath.startswith(redirectFrom):
        redirectTo = redirect['to']
        if redirectTo.endswith('/...'):
          redirectTo = redirect['to'].replace('...', '')
          redirectTo = requestedPath.replace(redirectFrom, redirectTo)
        return redirectTo
  return None


def readFile(requestedFile, lang='en'):
  # Reads a file from the file system, first trying the localized, then
  # the English version. If neither exist, it returns None
  #originalPathToFile = pathToFile
  requestedFile = re.sub(r'^/?web/', '', requestedFile)
  workingFile = os.path.join(SOURCE_PATH, lang, requestedFile)
  if not os.path.isfile(workingFile):
    workingFile = os.path.join(SOURCE_PATH, 'en', requestedFile)
  if os.path.isfile(workingFile):
    try:
      result = open(workingFile, 'r').read()
      result = result.decode('utf8')
      return result
    except Exception as e:
      result = ' - Exception occured trying to read: ' + requestedFile
      logging.exception(result)
      return None
  else:
    result = ' - ReadFile failed trying to find: ' + requestedFile
    logging.error(result)
    return None


def getLeftNav(requestPath, pathToBook, lang='en'):
  # Returns the left nav. If it's already been generated and stored in
  # memcache, return that, otherwise, read the file then recursively 
  # build the tree using buildLeftNav. 
  whoops = '<h2>Whoops!</h2>'
  whoops += '<p>An error occured while trying to parse and build the'
  whoops += ' left hand navigation. Check the error logs.'
  whoops += '</p>'
  requestPath = os.path.join('/web/', requestPath)
  bookContents = readFile(pathToBook, lang)
  if bookContents:
    try:
      yamlNav = yaml.load(bookContents)
      for tab in yamlNav['upper_tabs']:
        if 'path' in tab and requestPath.startswith(tab['path']):
          if 'lower_tabs' in tab:
            result = '<ul class="devsite-nav-list devsite-nav-expandable">\n'
            result += buildLeftNav(tab['lower_tabs']['other'][0]['contents'])
            return result
    except Exception as e:
      msg = ' - Unable to read or parse primary book.yaml: ' + pathToBook
      logging.exception(msg)
      whoops += '<p>Exception occured.</p>'
      return whoops
  else:
    whoops += '<p>Not found: ' + pathToBook + '</p>'
    return whoops


def buildLeftNav(bookYaml, lang='en'):
  # Recursively reads the book.yaml file and generates the navigation tree
  result = ''
  for item in bookYaml:
    if 'include' in item:
      include = readFile(item['include'], lang)
      if include:
        try:
          include = yaml.load(include)
          if 'toc' in include and len(include['toc']) == 1:
            item = include['toc'][0]
        except Exception as e:
          msg = ' - Unable to parsing embedded toc file: ' + item['include'] 
          logging.exception(msg)
    if 'path' in item:
      result += '<li class="devsite-nav-item">\n'
      result += '<a href="' + item['path'] + '" class="devsite-nav-title">\n'
      result += '<span>' + item['title'] + '</span>\n'
      result += '</a>\n'
      result += '</li>\n'
    elif 'section' in item:
      # Sub-section
      result += '<li class="devsite-nav-item devsite-nav-item-section-expandable">\n'
      result += '<span class="devsite-nav-title devsite-nav-title-no-path" '
      result += 'track-type="leftNav" track-name="expandNavSectionNoLink" '
      result += 'track-metadata-position="0">\n'
      result += '<span>' + item['title'] + '</span>\n'
      result += '</span>'
      result += '<a '
      result += 'class="devsite-nav-toggle devsite-nav-toggle-collapsed material-icons" '
      result += 'track-type="leftNav" track-name="expandNavSectionArrow" '
      result += 'track-metadata-position="0">\n'
      result += '</a>'
      result += '<ul class="devsite-nav-section devsite-nav-section-collapsed">\n'
      result += buildLeftNav(item['section'])
  result += '</ul>\n'
  return result


def renderDevSiteContent(content, lang='en'):
  # Injects includecode into the markdown as appropriate
  includes = re.findall(r'^{%[ ]?includecode .+%}(?m)', content)
  for include in includes:
    content = content.replace(include, getIncludeCode(include, lang))

  # Injects includes into the markdown as appropriate
  includes = re.findall(r'^{%[ ]?include .+%}(?m)', content)
  for include in includes:
    content = content.replace(include, getInclude(include, lang))

  # Replaces frameboxes with the iframe it needs
  frameboxes = re.findall(r'{%[ ]?framebox.+%}.*?{%[ ]?endframebox[ ]?%}(?ms)', content)
  for framebox in frameboxes:
    fbContent = re.search(r'({%[ ]?framebox.+%})(.*?){%[ ]?endframebox[ ]?%}(?ms)', framebox)
    fbOpenTag = fbContent.group(1)
    fbHeight = re.search(r'height="(.*?)"', fbContent.group(1))
    fbContent = fbContent.group(2)
    fbMemcacheKey = '/framebox/' + hashlib.md5(fbContent).hexdigest()
    replaceWith = '<iframe class="framebox inherit-locale" '
    replaceWith += 'style="width: 100%;'
    if fbHeight:
      replaceWith += 'height:' + fbHeight.group(1) + ';'
    replaceWith += '" '
    replaceWith += 'src="' + fbMemcacheKey + '"></iframe>'
    content = content.replace(framebox, replaceWith)
    memcache.set(fbMemcacheKey, fbContent)

  # Escapes content between {% htmlescape %} tags
  htmlescapes = re.findall(r'{%[ ]?htmlescape[ ]?%}(.*?){%[ ]?endhtmlescape[ ]?%}(?ms)', content)
  for escapeMe in htmlescapes:
    escaped = cgi.escape(escapeMe)
    content = content.replace(escapeMe, escaped)
  if htmlescapes:
    content = re.sub(r'{%[ ]?htmlescape[ ]?%}', '', content)
    content = re.sub(r'{%[ ]?endhtmlescape[ ]?%}', '', content)
  return content


def getInclude(includeTag, lang='en'):
  # Returns the contents of an include file. If the file is not found,
  # it returns a warning into the doc. Otherwise it returns the file.
  fileName = includeTag.replace('{%', '')
  fileName = fileName.replace('%}', '')
  fileName = fileName.replace('include', '')
  fileName = fileName.replace('"', '')
  fileName = fileName.replace('\'', '')
  fileName = fileName.strip()
  if fileName == 'comment-widget.html':
    result = '<style>'
    result += '#gplus-comment-container { border: 1px solid #c5c5c5; }'
    result += '#gplus-comment-container > div { padding: 24px; }'
    result += '#gplus-title { background-color: #f5f5f5; }'
    result += '</style>'
    result += '<div id="gplus-comment-container">'
    result += '<div id="gplus-title">No comments yet</div>'
    result += '<div id="gplus-comments">'
    result += 'Comments aren\'t supported in the development or staging environment, sorry.'
    result += '</div></div>'
  else:
    result = readFile(fileName, lang)
  if result is None:
    return 'Warning: Unable to find include <code>' + fileName + '</code>'
  return result

def getIncludeMD(includeTag, lang='en'):
  # Returns the contents of a markdown include file. If the file is not found,
  # it returns a warning into the doc. Otherwise it returns the file.
  fileName = includeTag.replace('<<', '')
  fileName = fileName.replace('>>', '')
  result = readFile(fileName, lang)
  if result is None:
    result = 'Warning: Unable to find markdown file: ' + fileName
  return result


def getIncludeCode(includeTag, lang='en'):
  # Returns the contents of an includecode file. If the file is not found,
  # it returns a warning into the doc. Otherwise it returns the file.
  # It also handles start and end regions and can unindent code as requested
  fileRegEx = re.search(r"content_path=\"(.+?)\"", includeTag)
  regionRegEx = re.search(r"region_tag=\"(.+?)\"", includeTag)
  dedentRegEx = re.search(r"adjust_indentation=\"(.+?)\"", includeTag)
  if fileRegEx is None:
    msg = 'Error: No <code>content_path</code> specified for ' + includeTag
    logging.error(' - ' + msg)
    return msg
  fileName = fileRegEx.group(1)
  result = readFile(fileName, lang)
  if result is None:
    return 'Warning: Unable to find includecode <code>' + fileName + '</code>'
  if regionRegEx is not None:
    regionName = regionRegEx.group(1)
    startAt = result.find('[START ' + regionName + ']')
    if startAt >= 0:
      startAt = result.find('\n', startAt) + 1
      endAt = result.find('[END ' + regionName + ']')
      endAt = result.rfind('\n', startAt, endAt)
      result = result[startAt:endAt]
  if dedentRegEx and dedentRegEx.group(1) == 'auto':
    result = textwrap.dedent(result)
  return cgi.escape(result)


def getAnnouncementBanner(lang='en'):
  # Returns the announcement banner
  result = ''
  projectFile = os.path.join(SOURCE_PATH, lang, '_project.yaml')
  if not os.path.isfile(projectFile):
    projectFile = os.path.join(SOURCE_PATH, 'en', '_project.yaml')
  raw = open(projectFile, 'r').read().decode('utf8')
  project = yaml.load(raw)
  if 'announcement' in project:
    startBanner = project['announcement']['start']
    startBanner = datetime.strptime(startBanner, '%Y-%m-%dT%H:%M:%SZ')
    endBanner = project['announcement']['end']
    endBanner = datetime.strptime(endBanner, '%Y-%m-%dT%H:%M:%SZ')
    if startBanner < datetime.now() < endBanner:
      result = '<div class="devsite-banner devsite-banner-announcement">\n'
      result += '<div class="devsite-banner-inner">\n'
      result += project['announcement']['description']
      result += '\n</div>\n'
      result += '</div>'
    else:
      logging.warn('Announcement in _project.yaml expired: not shown')
  return result


