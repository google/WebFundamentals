#!/usr/bin/env python
#
# Copyright 2014 Google Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
import cgi
import webapp2
import logging
import markdown
import yaml
import textwrap
from datetime import datetime, timedelta
from urlparse import urljoin
import os
import re
from google.appengine.api import memcache
from google.appengine.ext.webapp.template import render

USE_MEMCACHE = not os.environ['SERVER_SOFTWARE'].startswith('Dev')
DEVENV = os.environ['SERVER_SOFTWARE'].startswith('Dev')

class HomePage(webapp2.RequestHandler):
    def get(self):
        self.redirect("/web/", permanent=True)

class DevSitePages(webapp2.RequestHandler):
    def readFile(self, pathToFile):
      # Reads a file from the file system, first trying the localized, then
      # the English version. If neither exist, it returns None
      originalPathToFile = pathToFile
      pathToFile = re.sub(r'^/?web/', '', pathToFile)
      cwd = os.path.dirname(__file__)
      sourcePath = 'src/content'
      lang = self.request.get('hl', 'en')
      fullPath = os.path.join(cwd, sourcePath, lang, pathToFile)
      if not os.path.isfile(fullPath):
        fullPath = os.path.join(cwd, sourcePath, 'en', pathToFile)
      if os.path.isfile(fullPath):
        try:
          result = open(fullPath, 'r').read()
          result = result.decode('utf8')
          return result
        except Exception as e:
          result = ' - Exception occured trying to read: ' + originalPathToFile
          logging.error(result)
          logging.error(e)
          return None
      else:
        result = ' - ReadFile failed trying to find: ' + originalPathToFile
        logging.error(result)
        return None


    def getInclude(self, pathToInclude):
      # Returns the contents of an include file. If the file is not found,
      # it returns a warning into the doc. Otherwise it returns the file.
      if USE_MEMCACHE:
        result = memcache.get(pathToInclude)
        if result is not None:
          return result
      # Strip the filename down to just the actual path.
      fileName = pathToInclude.replace('{%', '')
      fileName = fileName.replace('%}', '')
      fileName = fileName.replace('include', '')
      fileName = fileName.replace('"', '')
      fileName = fileName.strip()
      result = self.readFile(fileName)
      if result is None:
        return 'Warning: Unable to find include <code>' + fileName + '</code>'
      if USE_MEMCACHE:
        memcache.set(key=pathToInclude, value=result, time=3600)
      return result

    def getIncludeCode(self, includeTag):
      # Returns the contents of an includecode file. If the file is not found,
      # it returns a warning into the doc. Otherwise it returns the file.
      # It also handles start and end regions and can unindent code as requested
      if USE_MEMCACHE:
        result = memcache.get(includeTag)
        if result is not None:
          return result
      # Get the filename, the region and indent adjustment parameters
      fileRegEx = re.search(r"content_path=['\"]?(.+?)['\" ]", includeTag)
      regionRegEx = re.search(r"region_tag=['\"]?(.+?)['\" ]", includeTag)
      dedentRegEx = re.search(r"adjust_indentation=['\"]?(.+?)['\" ]", includeTag)
      if fileRegEx is None:
        msg = 'Warning: No <code>content_path</code> specified for ' + includeTag
        logging.warn(' - ' + msg)
        return msg
      fileName = fileRegEx.group(1)
      result = self.readFile(fileName)
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
      result = cgi.escape(result)
      if USE_MEMCACHE:
        memcache.set(key=includeTag, value=result, time=3600)
      return result


    def buildNav(self, bookYaml):
      # Recursively reads the book.yaml file and generates the navigation tree
      result = ''
      for item in bookYaml:
        if 'include' in item:
          include = self.readFile(item['include'])
          if include:
            try:
              include = yaml.load(include)
              if 'toc' in include and len(include['toc']) == 1:
                item = include['toc'][0]
            except Exception as e:
              msg = ' - Unable to parsing embedded toc file: ' + item['include'] 
              logging.error(msg)
              logging.error(e)
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
          result += self.buildNav(item['section'])
      result += '</ul>\n'
      return result


    def getLeftNav(self, pathToBook):
      # Returns the left nav. If it's already been generated and stored in
      # memcache, return that, otherwise, read the file then recursively 
      # build the tree using buildNav. The results are stored in memcache only
      # when USE_MEMCACHE is True.
      if USE_MEMCACHE:
        result = memcache.get(pathToBook)
        if result is not None:
          return result
      whoops = '<h2>Whoops!</h2>'
      whoops += '<p>An error occured while trying to parse and build the'
      whoops += ' left hand navigation. Check the error logs.'
      whoops += '</p>'
      requestPath = self.request.path
      bookContents = self.readFile(pathToBook)
      if bookContents:
        try:
          yamlNav = yaml.load(bookContents)
          for tab in yamlNav['upper_tabs']:
            if 'path' in tab and requestPath.startswith(tab['path']):
              if 'lower_tabs' in tab:
                result = '<ul class="devsite-nav-list devsite-nav-expandable">\n'
                result += self.buildNav(tab['lower_tabs']['other'][0]['contents'])
                if USE_MEMCACHE:
                  memcache.set(key=pathToBook, value=result, time=3600)
                return result
        except Exception as e:
          msg = ' - Unable to read or parse primary book.yaml: ' + pathToBook
          logging.error(msg)
          logging.error(e)
          whoops += '<p>Exception occured.</p>'
          return whoops
      else:
        whoops += '<p>Not found: ' + pathToBook + '</p>'
        return whoops


    def get(self, path):
        lang = self.request.get('hl', 'en')
        sourcePath = 'src/content'

        searchPath = os.path.join(os.path.dirname(__file__), sourcePath)
        if path == '' or path.endswith('/'):
          fileLocations = [
            os.path.join(searchPath, lang, path, 'index.md'),
            os.path.join(searchPath, 'en', path, 'index.md'),
          ]
        else:
          fileLocations = [
            os.path.join(searchPath, lang, path) + '.md',
            os.path.join(searchPath, 'en', path) + '.md',
          ]

        text = None
        for fileLocation in fileLocations:
          if os.path.isfile(fileLocation):
            # Read the file and pass in the contents - avoids issues if the
            # file contains {%%} <- this breaks pythons templating
            fileContent = open(fileLocation, 'r').read()
            fileContent = fileContent.decode("utf8")

            logging.info("200 " + fileLocation)

            # Remove any comments {# something #} from the markdown
            fileContent = re.sub(r"{#.+?#}", "", fileContent)

            # Show warning for unsupported elements
            badTags = [
              r"{% link_sample_button .+%}",
              r"{% include_code (.+)%}"
            ]
            for tag in badTags:
              if re.search(tag, fileContent) is not None:
                logging.warn(' - Unsupported tag: ' + tag)
                replaceWith = '<aside class="warning">Web<strong>Fundamentals</strong>: '
                replaceWith += '<span>Unsupported tag: <code>' + tag + '</code></span></aside>'
                fileContent = re.sub(tag, replaceWith, fileContent)

            # Injects includecode into the markdown as appropriate
            includes = re.findall(r'{% includecode .+%}', fileContent)
            for include in includes:
              regex = r'^' + include + '(?m)'
              fileContent = re.sub(regex, self.getIncludeCode(include), fileContent)

            # Injects includes into the markdown as appropriate
            includes = re.findall(r'{% include .+%}', fileContent)
            for include in includes:
              regex = r'^' + include + '(?m)'
              fileContent = re.sub(regex, self.getInclude(include), fileContent)

            # Handle Special DevSite Cases
            fileContent = re.sub(r"^Success: (.*?)\n{2}(?ms)", r"<aside class='success' markdown='1'><strong>Success:</strong> <span>\1</span></aside>", fileContent)
            fileContent = re.sub(r"^Dogfood: (.*?)\n{2}(?ms)", r"<aside class='dogfood' markdown='1'><strong>Dogfood:</strong> <span>\1</span></aside>", fileContent)
            fileContent = re.sub(r"^Note: (.*?)\n{2}(?ms)", r"<aside class='note' markdown='1'><strong>Note:</strong> <span>\1</span></aside>", fileContent)
            fileContent = re.sub(r"^Caution: (.*?)\n{2}(?ms)", r"<aside class='caution' markdown='1'><strong>Caution:</strong> <span>\1</span></aside>", fileContent)
            fileContent = re.sub(r"^Warning: (.*?)\n{2}(?ms)", r"<aside class='warning' markdown='1'><strong>Warning:</strong> <span>\1</span></aside>", fileContent)

            # Adds a set of markdown extensions available to us on DevSite
            ext = [
              "markdown.extensions.attr_list", # Adds support for {: #someid }
              "markdown.extensions.meta", # Removes the meta data from the top of the doc
              "markdown.extensions.toc", # Generate the TOC for the right side
              "markdown.extensions.tables", # Support for Markdown Tables
              "markdown.extensions.extra", # Support for markdown="1" in tags
              "markdown.extensions.def_list" # Support for definition lists
            ]
            md = markdown.Markdown(extensions=ext)
            parsedMarkdown = md.convert(fileContent)
            
            # Reads the book.yaml file and generate the lefthand nav
            if 'book_path' in md.Meta and len(md.Meta['book_path']) == 1:
              bookPath = md.Meta['book_path'][0]
              leftNav = self.getLeftNav(bookPath)
            else:
              leftNav = 'No book.yaml specified in markdown'
              logging.warn(' - No book.yaml specified in markdown.')

            # Replaces <pre> tags with prettyprint enabled tags
            parsedMarkdown = re.sub(r"^<pre>(?m)", r"<pre class='prettyprint'>", parsedMarkdown)

            # Get the page title from the markup.
            title = re.search(r"<h1 class=\"page-title\".*?>(.*?)<\/h1>", parsedMarkdown)
            if title:
              title = title.group(1)
            else:
              title = "Web Fundamentals"
              logging.warn(' - Page doesn\'t have a title.')

            # Build the table of contents & transform so it fits within DevSite
            toc = md.toc
            toc = toc.strip()
            toc = re.sub(r"<div class=\"toc\">", "", toc) # remove <div> wrapper
            toc = re.sub(r"</div>", "", toc) # remove <div> wrapper
            toc = re.sub("<ul>", "", toc, 1) # Remove outer <ul></ul>
            toc = toc[:toc.rfind("</ul>")]# Remove outer <ul></ul>
            # Add appropriate classes
            toc = re.sub(r"<ul>", "<ul class=\"devsite-page-nav-list\">", toc)
            toc = re.sub(r"<a href", "<a class=\"devsite-nav-title\" href", toc)
            toc = re.sub(r"<li>", "<li class=\"devsite-nav-item\">", toc)
 
            text = render("gae/article.tpl", {
              "title": title,
              "leftNav": leftNav,
              "content": parsedMarkdown,
              "toc": toc,
              "lang": lang}
            )
            break

        if text is None:
          text = render("gae/404.tpl", {})
          logging.error("404 " + os.path.join(sourcePath, lang, path))
          self.response.set_status(404)

        self.response.out.write(text)

# The '/' entry is a redirect to /web/ - just a convenience thing
app = webapp2.WSGIApplication([
    ('/', HomePage),
    ('/web/(.*)', DevSitePages),
], debug=True)
