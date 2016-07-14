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
from datetime import datetime, timedelta
from urlparse import urljoin
import os
import re


from google.appengine.ext.webapp.template import render

class HomePage(webapp2.RequestHandler):
    def get(self):
        self.redirect("/web/index", permanent=True)

class DevSitePages(webapp2.RequestHandler):
    def get(self, path):
        lang = self.request.get("hl", "en")

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

            # TODO: Pete what is this for? Please add comments
            fileContent = re.sub(r"{#.+?#}", "", fileContent)
            # TODO: Pete what is this extension array for?
            ext = ["markdown.extensions.attr_list", "markdown.extensions.meta"]
            parsedMarkdown = markdown.markdown(fileContent, extensions=ext)

            # TODO: Pete why is lang set to path?
            text = render("gae/devsite.tpl", {"content": parsedMarkdown, "lang": path})
            break

        if text is None:
          text = "404 - Requested file not found."
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
