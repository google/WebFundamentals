import re
import os
import cgi
import yaml
import hashlib
import logging
import textwrap
import urllib2

from datetime import date, datetime
from google.appengine.api import memcache
from google.appengine.ext.webapp.template import render

SOURCE_PATH = os.path.join(os.path.dirname(__file__), 'src/content/')
DEVENV = os.environ['SERVER_SOFTWARE'].startswith('Dev')
USE_MEMCACHE = not DEVENV


def slugify(str):
  # Very simply slugify
  slug = str.encode('ascii', 'ignore').lower()
  slug = re.sub(r'[^a-z0-9]+', '-', slug).strip('-')
  slug = re.sub(r'[-]+', '-', slug)
  return slug


def getFromMemCache(memcacheKey):
  try:
    result = memcache.get(memcacheKey)
  except Exception as e:
    result = None
  return result


def setMemCache(memcacheKey, value, length=3600):
  try:
    if USE_MEMCACHE:
      memcache.set(memcacheKey, value, length)
  except Exception as e:
    logging.exception('Unable to cache to MemCache')


def checkForRedirect(requestedPath, lang, useMemcache):
  # Reads the redirect files from the current directory and up the directory
  # tree then checks to see if a redirect exists for the current URL.
  redirects = []
  requestDir = requestedPath
  requestDir = re.sub(r'^/?web/', '', requestDir)

  # Check if the requested path is actually a directory
  if not requestDir.endswith('/'):
    if os.path.isdir(os.path.join(SOURCE_PATH, lang, requestDir)):
      return '/web/' + requestDir + '/'

  # Get the directory the file was requested from
  if not requestDir.endswith('/'):
    requestDir = requestDir[:requestDir.rindex('/') + 1]
  requestDir = os.path.join(SOURCE_PATH, lang, requestDir)

  while requestDir.startswith(SOURCE_PATH):
    try:
      redirectFile = os.path.join(requestDir, '_redirects.yaml')
      if os.path.isfile(redirectFile):
        memcacheKey = 'redirectFile-' + redirectFile
        parsed = getFromMemCache(memcacheKey)
        if parsed is None:
          raw = open(redirectFile, 'r').read().decode('utf8')
          parsed = yaml.load(raw)
          if useMemcache:
            setMemCache(memcacheKey, parsed)
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


def fetchGithubFile(path):
  """Fetchs a file in a repository hosted on github.com.

  Retrieves rows pertaining to the given keys from the Table instance
  represented by big_table.  Silly things may happen if
  other_silly_variable is not None.

  Args:
      path: The path to a file on Github in the form
          github-user/repository/path/to/file.

  Returns:
      A string from the HTTP response.
  """
  path = path.replace('/blob', '')
  url = 'https://raw.githubusercontent.com/%s' % path
  try:
    response = urllib2.urlopen(url)
    content = response.read()
  except urllib2.HTTPError as e:
    logging.error('Unable to fetch Github file: %s' % e.code)
    return None
  return content


def parseBookYaml(pathToBook, lang='en'):
  """Read and parse a book.yaml file.

  Args:
      pathToBook: the string path to the location of the book
      lang: Which language to use, defaults to 'en'

  Returns:
      A dictionary with the parsed book.
  """
  memcacheKey = 'bookYAML-' + pathToBook
  result = getFromMemCache(memcacheKey)
  if result:
    return result
  try:
    result = {}
    upperTabs = []
    result['upper_tabs'] = upperTabs
    bookYaml = yaml.load(readFile(pathToBook, lang))
    for upperTab in bookYaml['upper_tabs']:
      upperTabs.append(expandBook(upperTab))
    setMemCache(memcacheKey, result, 60)
    return result
  except Exception as e:
    logging.exception('Error in parseBookYaml')
  return None


def expandBook(book, lang='en'):
  """Iterate and expand includes in a book.yaml file.

  Args:
      book: the parsed book.yaml file
      lang: Which language to use, defaults to 'en'

  Returns:
      A dictionary with the parsed & expanded book.
  """
  if isinstance(book, dict):
    result = {}
    for k, v in book.iteritems():
      result[k] = expandBook(v, lang)
    return result
  if isinstance(book, list):
    results = []
    for item in book:
      if 'include' in item:
        newItems = yaml.load(readFile(item['include'], lang))
        results = results + expandBook(newItems['toc'], lang)
      else:
        results.append(expandBook(item, lang))
    return results
  return book


def getLowerTabs(bookYaml):
  """Gets the lower tabs from a parsed book.yaml dictionary.

  Args:
      bookYaml: the parsed book.yaml file

  Returns:
      An array of objects with the lower tabs
  """
  result = []
  try:
    for tab in bookYaml['upper_tabs']:
      if 'lower_tabs' in tab and 'other' in tab['lower_tabs']:
        for lowerTab in tab['lower_tabs']['other']:
          lt = {}
          lt['name'] = lowerTab['name']
          if 'contents' in lowerTab and 'path' in lowerTab['contents'][0]:
            lt['path'] = lowerTab['contents'][0]['path']
            result.append(lt)
  except Exception as e:
    logging.exception('Unable to read/parse the lower tabs')
  return result


def getLeftNav(requestPath, bookYaml, lang='en'):
  # Returns the left nav. If it's already been generated and stored in
  # memcache, return that, otherwise, read the file then recursively
  # build the tree using buildLeftNav.
  memcacheKey = 'leftNav-' + requestPath
  result = getFromMemCache(memcacheKey)
  if result:
    return result
  whoops = '<h2>Whoops!</h2>'
  whoops += '<p>An error occured while trying to parse and build the'
  whoops += ' left hand navigation. Check the error logs.'
  whoops += '</p>'
  requestPath = os.path.join('/web/', requestPath)
  try:
    result = '<h2>No Matches Found</h2>'
    for upperTab in bookYaml['upper_tabs']:
      if 'path' in upperTab and requestPath.startswith(upperTab['path']):
        for lowerTab in upperTab['lower_tabs']['other']:
          if ('path' not in lowerTab['contents'][0] or
            requestPath.startswith(lowerTab['contents'][0]['path'])):
              result = '<ul class="devsite-nav-list devsite-nav-expandable">\n'
              result += buildLeftNav(lowerTab['contents'])
              result += '</ul>\n'
    setMemCache(memcacheKey, result)
    return result
  except Exception as e:
    msg = ' - Unable to read or parse primary book.yaml: ' + pathToBook
    logging.exception(msg)
    whoops += '<p>Exception occured.</p>'
    return whoops


def buildLeftNav(bookYaml, lang='en'):
  # Recursively reads the book.yaml file and generates the navigation tree
  result = ''
  for item in bookYaml:
    if 'include' in item:
      ## TODO(petele): Remove this
      ## leaving this in for a few weeks while I ensure it doesn't break
      ## anything.
      logging.error('***** INCLUDE - this should NOT happen.')
      # try:
      #   include = readFile(item['include'], lang)
      #   include = yaml.load(include)
      #   result += buildLeftNav(include['toc'])
      # except Exception as e:
      #   msg = ' - Unable to parsing embedded toc file: ' + item['include']
      #   logging.exception(msg)
    if 'path' in item:
      result += '<li class="devsite-nav-item">\n'
      result += '<a href="' + item['path'] + '" class="devsite-nav-title">\n'
      result += '<span>' + cgi.escape(item['title']) + '</span>\n'
      result += '</a>\n'
      result += '</li>\n'
    elif 'section' in item:
      # Sub-section
      result += '<li class="devsite-nav-item devsite-nav-item-section-expandable">\n'
      result += '<span class="devsite-nav-title devsite-nav-title-no-path" '
      result += 'track-type="leftNav" track-name="expandNavSectionNoLink" '
      result += 'track-metadata-position="0">\n'
      result += '<span>' + cgi.escape(item['title']) + '</span>\n'
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
  includes = re.findall(r'{%[ ]?includecode .+%}(?m)', content)
  for include in includes:
    content = content.replace(include, getIncludeCode(include, lang))

  # Injects includes into the markdown as appropriate
  includes = re.findall(r'{%[ ]?include .+%}(?m)', content)
  for include in includes:
    content = content.replace(include, getInclude(include, lang))

  # Replace any videoIds used in src/content/ilt/pwa
  videos = re.findall(r'{% setvar videoId .+%}(?m)', content)
  for video in videos:
    videoId = re.search(r'{% setvar videoId "(.*?)"', video).group(1)
    content = content.replace(r'{{ videoId }}', videoId)
    content = content.replace(video, '')

  # Replace any slidesIds used in src/content/ilt/pwa
  slides = re.findall(r'{% setvar slidesId .+%}(?m)', content)
  for slide in slides:
    slidesId = re.search(r'{% setvar slidesId "(.*?)"', slide).group(1)
    content = content.replace(r'{{ slidesId }}', slidesId)
    content = content.replace(slide, '')

  # Replaces frameboxes with the iframe it needs
  frameboxes = re.findall(r'{%[ ]?framebox.+?%}.*?{%[ ]?endframebox[ ]?%}(?ms)', content)
  for framebox in frameboxes:
    fbContent = re.search(r'({%[ ]?framebox.+?%})(.*?){%[ ]?endframebox[ ]?%}(?ms)', framebox)
    fbOpenTag = fbContent.group(1)
    fbHeight = re.search(r'height="(.*?)"', fbContent.group(1))
    fbClass = re.search(r'class="(.*?)"', fbContent.group(1))
    fbContent = fbContent.group(2)
    fbMemcacheKey = '/framebox/' + hashlib.md5(fbContent.encode('utf-8')).hexdigest()
    replaceWith = '<iframe class="framebox inherit-locale'
    if fbClass:
     replaceWith += ' ' + fbClass.group(1)
    replaceWith += '" '
    replaceWith += 'style="width: 100%;'
    if fbHeight:
      replaceWith += 'height:' + fbHeight.group(1) + ';'
    else:
      replaceWith += 'height: 100px;'
    replaceWith += '" '
    # The sandbox attr will emulate being on a different origin
    replaceWith += 'sandbox="allow-forms allow-orientation-lock allow-pointer-lock allow-popups allow-presentation allow-scripts allow-top-navigation" '
    replaceWith += 'src="' + fbMemcacheKey + '"></iframe>'
    content = content.replace(framebox, replaceWith)
    setMemCache(fbMemcacheKey, fbContent)

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
  result = None
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
  elif fileName.startswith('web/'):
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


def getIncludeCode(include_tag, lang='en'):
  # Returns the contents of an includecode file. If the file is not found,
  # it returns a warning into the doc. Otherwise it returns the file.
  # It also handles start and end regions and can unindent code as requested
  file_regex = re.search(r"content_path=\"(.+?)\"", include_tag)
  region_regex = re.search(r"region_tag=\"(.+?)\"", include_tag)
  dedent_regex = re.search(r"adjust_indentation=\"(.+?)\"", include_tag)
  github_regex = re.search(r"github_path=\"(.+?)\"", include_tag)

  # TODO: support these arguments
  as_downloadable_regex = re.search(r"as_downloadable=\"(.+?)\"", include_tag)
  github_link_regex = re.search(r"github_link=\"(.+?)\"", include_tag)
  git_revision_regex = re.search(r"git_revision=\"(.+?)\"", include_tag)
  if as_downloadable_regex or github_link_regex or git_revision_regex:
    msg = 'Error: as_downloadable, github_link, and git_revision args are not supported'
    logging.error(' - ' + msg)
    return msg

  if not file_regex and not github_regex:
    msg = 'Error: No <code>content_path</code> specified for ' + include_tag
    logging.error(' - ' + msg)
    return msg

  result = None
  if file_regex:
    file_name = file_regex.group(1)
    result = readFile(file_name, lang)
    if result is None:
      return 'Warning: Unable to find includecode <code>%s</code>' % file_name
  elif github_regex:

    file_url = github_regex.group(1)
    result = fetchGithubFile(file_url)
    if result is None:
      return 'Warning: Unable to includecode from github_path="<code>%s</code>"' % file_url

  if region_regex:
    region_name = region_regex.group(1)
    start_at = result.find('[START %s]' % region_name)
    if start_at >= 0:
      start_at = result.find('\n', start_at) + 1
      end_at = result.find('[END %s]' % region_name)
      end_at = result.rfind('\n', start_at, end_at)
      result = result[start_at:end_at]

  if dedent_regex and dedent_regex.group(1) == 'auto':
    result = textwrap.dedent(result)

  return cgi.escape(result)


def getAnnouncementBanner(pathToProject, lang='en'):
  memcacheKey = 'projectYAML-' + pathToProject
  result = getFromMemCache(memcacheKey)
  if result:
    return result
  try:
    project = yaml.load(readFile(pathToProject, lang))
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
      setMemCache(memcacheKey, result, 60)
  except Exception as e:
    logging.exception('Unable to get announcement from project.yaml')
    return ''
  return result


def getFooterPromo(lang='en'):
  """Gets the promo footer.

  Args:
      lang: The language to pick from.

  Returns:
      An HTML string with the appropriate footer.
  """
  memcacheKey = 'footerLinkPromo-' + lang
  result = getFromMemCache(memcacheKey)
  if result is None:
    result = ''
    footer = yaml.load(readFile('_footer.yaml', lang))
    if 'promos' in footer['footer'][0]:
      for promo in footer['footer'][0]['promos']:
        result += '<li class="devsite-footer-promo">'
        result += '<a href="' + promo['path']
        result += '" class="devsite-footer-promo-title">'
        if 'icon' in promo:
          result += '<img class="devsite-footer-promo-icon" '
          result += 'src="' + promo['icon'] + '">'
        if 'icon_name' in promo:
          result +='<div class="devsite-footer-promo-icon material-icons">'
          result += promo['icon_name'] + '</div>'
        result += promo['label']
        result += '</a><div class="devsite-footer-promo-description">'
        result += promo['description']
        result += '</div></li>\n'
      setMemCache(memcacheKey, result)
  return result


def getFooterLinkBox(lang='en'):
  """Gets the promo boxes.

  Args:
      lang: The language to pick from.

  Returns:
      An HTML string with the appropriate footer.
  """
  memcacheKey = 'footerLinkBoxes-' + lang
  result = getFromMemCache(memcacheKey)
  if result is None:
    result = ''
    footer = yaml.load(readFile('_footer.yaml', lang))
    if 'linkboxes' in footer['footer'][1]:
      for linkBox in footer['footer'][1]['linkboxes']:
        result += '<li class="devsite-footer-linkbox">'
        result += '<h3 class="devsite-footer-linkbox-heading">'
        result += linkBox['name'] + '</h3>'
        result += '<ul class="devsite-footer-linkbox-list">'
        for linkItem in linkBox['contents']:
          result += '<li class="devsite-footer-linkbox-item">'
          result += '<a href="' + linkItem['path'] + '">'
          result += linkItem['label'] + '</a></li>'
        result += '</ul>'
        result += '</li>'
      setMemCache(memcacheKey, result)
  return result
