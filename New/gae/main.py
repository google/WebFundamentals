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

JekyllOutputFile = "langs"

class HomePage(webapp2.RequestHandler):
    def get(self):
        self.redirect("/web/index", permanent=True)

class DevSitePages(webapp2.RequestHandler):
    def get(self, path):
        lang = self.request.get("hl", "en")

        sourcePath = 'content'

        fileLocation = os.path.join(os.path.dirname(__file__), sourcePath, lang, path + ".md")

        logging.info("Looking for file: " + fileLocation);

        if os.path.isfile(fileLocation):
          fileContent = open(fileLocation, "r").read()
          fileContent = fileContent.decode("utf8")
          fileContent = re.sub(r"{#.+?#}", "", fileContent)
          ext = ["markdown.extensions.attr_list", "markdown.extensions.meta"]
          md = markdown.markdown(fileContent, extensions=ext)
          text = render("devsite.tpl", {"content": md, "lang": path})
        else:
          text = "404 - The requested file (" + path + ") was not found."

        self.response.out.write(text)

# The '/' entry is a redirect to /web/ - just a convenience thing
app = webapp2.WSGIApplication([
    ('/', HomePage),
    ('/web/(.*)', DevSitePages),
    #('/web/showcase/(.+)', DevSitePages),
    #('/web/showcase/(.*)', DevSitePages),
    #('/web/(.+)/', AllPages),
    #('/web/(.*)', AllPages)
], debug=True)
