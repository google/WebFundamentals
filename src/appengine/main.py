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



class AllPages(webapp2.RequestHandler):
    def get(self, path):
        lang = self.request.get("hl", "en")
        
        if path[-5:0] != ".html":
            # App engine strips out trailing '/' for directories
            path = os.path.join(path, "index.html")

        root_path = os.path.join(os.path.dirname(__file__), "build", "static", "_langs", "en", path)
        lang_path = os.path.join(os.path.dirname(__file__), "build", "static", "_langs", lang, path)
        
        try:
            text = render(lang_path, {})
        except:
            text = render(root_path, {})

        # TODO
        # Access-Control-Allow-Origin: https://developers.google.com
        # expiration:  1h   
        self.response.out.write(text)

app = webapp2.WSGIApplication([
    ('/web/(.+)/', AllPages),
    ('/web/(.*)', AllPages)
], debug=True)
