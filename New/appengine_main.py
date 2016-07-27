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
import webapp2
import logging
import markdown
import yaml
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
        self.redirect("/web/index", permanent=True)

class DevSitePages(webapp2.RequestHandler):
    def buildNav(self, bookYaml):
      # Recursively reads the book.yaml file and generates the navigation tree
      result = ''
      for item in bookYaml:
        if 'include' in item:
          includePath = self.getBookPath(item['include'])
          try:
            include = yaml.load(open(includePath, 'r').read())
            if 'toc' in include and len(include['toc']) == 1:
              item = include['toc'][0]
          except Exception as e:
            logging.error('Unable to process include file: ' + includePath)
        if 'path' in item:
          # Single link item
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

    def getLeftNav(self, yamlBookPath):
      # Returns the left nav. If it's already been generated and stored in
      # memcache, return that, otherwise, read the file then recursively 
      # build the tree using buildNav. The results are stored in memcache only
      # when USE_MEMCACHE is True.
      if USE_MEMCACHE:
        result = memcache.get(yamlBookPath)
        if result is not None:
          return result
      requestPath = self.request.path
      try:
        yamlNav = yaml.load(open(yamlBookPath, 'r').read())
        for tab in yamlNav['upper_tabs']:
          if 'path' in tab and requestPath.startswith(tab['path']):
            if 'lower_tabs' in tab:
              result = '<ul class="devsite-nav-list devsite-nav-expandable">\n'
              result += self.buildNav(tab['lower_tabs']['other'][0]['contents'])
              if USE_MEMCACHE:
                memcache.set(key=yamlBookPath, value=result, time=3600)
              return result
      except Exception as e:
        logging.error(e)
        whoops = "<h2>Whoops!</h2>"
        whoops += "<p>An error occured while trying to parse and build the"
        whoops += " left hand navigation. Check the error logs."
        whoops += "</p><p>Sorry!</p>"
        return whoops

    def getBookPath(self, pathToBook):
        bookPath = pathToBook
        cwd = os.path.dirname(__file__)
        sourcePath = 'src/content'
        lang = self.request.get('hl', 'en')
        bookPath = re.sub('/web/', '', bookPath);
        bookPath = os.path.join(cwd, sourcePath, lang, bookPath)
        if os.path.isfile(bookPath):
          return bookPath
        else:
          bookPath = os.path.join(cwd, sourcePath, 'en', bookPath)
          if os.path.isfile(bookPath):
            return bookPath
          else:
            logging.error('Unable to find book.yaml: ' + pathToBook)
            return None

    def get(self, path):
        lang = self.request.get('hl', 'en')
        sourcePath = 'src/content'

        fileLocations = [
          os.path.join(os.path.dirname(__file__), sourcePath, lang, path),
          os.path.join(os.path.dirname(__file__), sourcePath, lang, path) + ".md",
          os.path.join(os.path.dirname(__file__), sourcePath, lang, path, "index.md"),
          os.path.join(os.path.dirname(__file__), sourcePath, "en", path),
          os.path.join(os.path.dirname(__file__), sourcePath, "en", path) + ".md",
          os.path.join(os.path.dirname(__file__), sourcePath, "en", path, "index.md")
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

            # Handle Special DevSite Cases
            fileContent = re.sub(r"^Success: (.*)(?m)", r"<aside class='success'><strong>Success:</strong> <span>\1</span></aside>", fileContent)
            fileContent = re.sub(r"^Dogfood: (.*)(?m)", r"<aside class='dogfood'><strong>Dogfood:</strong> <span>\1</span></aside>", fileContent)
            fileContent = re.sub(r"^Note: (.*)(?m)", r"<aside class='note'><note>Success:</strong> <span>\1</span></aside>", fileContent)
            fileContent = re.sub(r"^Caution: (.*)(?m)", r"<aside class='caution'><strong>Caution:</strong> <span>\1</span></aside>", fileContent)
            fileContent = re.sub(r"^Warning: (.*)(?m)", r"<aside class='warning'><strong>Warning:</strong> <span>\1</span></aside>", fileContent)

            # Adds a set of markdown extensions available to us on DevSite
            ext = [
              "markdown.extensions.attr_list", # Adds support for {: #someid }
              "markdown.extensions.meta", # Removes the meta data from the top of the doc
              "markdown.extensions.toc" # Generate the TOC for the right side
            ]
            md = markdown.Markdown(extensions=ext)
            parsedMarkdown = md.convert(fileContent)
            
            # Reads the book.yaml file and generate the lefthand nav
            if 'book_path' in md.Meta and len(md.Meta['book_path']) == 1:
              bookPath = md.Meta['book_path'][0]
              bookPath = self.getBookPath(bookPath)
              if bookPath is not None:
                leftNav = self.getLeftNav(bookPath)
              else:
                leftNav = 'Could not find book.yaml'
            else:
              leftNav = 'No book.yaml specified in markdown'

            # Replaces <pre> tags with prettyprint enabled tags
            parsedMarkdown = re.sub(r"^<pre>(?m)", r"<pre class='prettyprint'>", parsedMarkdown)

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
 
            text = render("gae/devsite.tpl", {
              "leftNav": leftNav,
              "content": parsedMarkdown,
              "toc": toc,
              "lang": lang}
            )
            break

        if text is None:
          text = "404 " + os.path.join(sourcePath, lang, path)
          logging.error(text)
          self.response.set_status(404)

        self.response.out.write(text)

# The '/' entry is a redirect to /web/ - just a convenience thing
app = webapp2.WSGIApplication([
    ('/', HomePage),
    ('/web/(.*)/', DevSitePages),
    ('/web/(.*)', DevSitePages),
    #('/web/showcase/(.+)', DevSitePages),
    #('/web/showcase/(.*)', DevSitePages),
    #('/web/(.+)/', AllPages),
    #('/web/(.*)', AllPages)
], debug=True)
