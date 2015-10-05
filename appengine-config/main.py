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
import json
import logging
from datetime import datetime, timedelta
from urlparse import urljoin
import os
import re


from google.appengine.ext.webapp.template import render

JekyllOutputFile = "langs"

class HomePage(webapp2.RequestHandler):
    def get(self):
        self.redirect("/web/", permanent=True)

class AllPages(webapp2.RequestHandler):
    def get(self, path):
        lang = self.request.get("hl", "en")

        fileLocations = [
          os.path.join(os.path.dirname(__file__), JekyllOutputFile, lang, path),
          os.path.join(os.path.dirname(__file__), JekyllOutputFile, lang, path) + ".html",
          os.path.join(os.path.dirname(__file__), JekyllOutputFile, lang, path, "index.html"),
          os.path.join(os.path.dirname(__file__), JekyllOutputFile, "en", path),
          os.path.join(os.path.dirname(__file__), JekyllOutputFile, "en", path) + ".html",
          os.path.join(os.path.dirname(__file__), JekyllOutputFile, "en", path, "index.html")
        ]
        text = None
        for fileLocation in fileLocations:
          if os.path.isfile(fileLocation):
            # Read the file and pass in the contents - avoids issues if the
            # file contains {%%} <- this breaks pythons templating
            fileContents = open(fileLocation, 'r').read()
            text = render("wrapper.tpl", {"content": fileContents, "lang": lang})
            break

        if text is None:
          text = "404 - Requested file not found."
          self.response.set_status(404)

        self.response.out.write(text)

# The '/' entry is a redirect to /web/ - just a convenience thing
app = webapp2.WSGIApplication([
    ('/', HomePage),
    ('/web', HomePage),
    ('/web/(.+)/', AllPages),
    ('/web/(.*)', AllPages)
], debug=True)
