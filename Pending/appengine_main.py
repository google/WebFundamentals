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
import traceback
import devsitePage
import devsiteIndex
import devsiteHelper
from google.appengine.api import memcache
from google.appengine.ext.webapp.template import render

USE_MEMCACHE = not os.environ['SERVER_SOFTWARE'].startswith('Dev')
DEVENV = os.environ['SERVER_SOFTWARE'].startswith('Dev')

class HomePage(webapp2.RequestHandler):
    def get(self):
        self.redirect('/web/', permanent=True)

class Framebox(webapp2.RequestHandler):
    def get(self, path):
        response = None
        memcacheKey = '/framebox/' + path
        content = memcache.get(memcacheKey)
        logging.info('GET ' + memcacheKey)

        if content is None:
          response = render('gae/404.tpl', {})
          logging.error('404 ' + memcacheKey)
          self.response.set_status(404)        
        else:
          response = render('gae/framebox.tpl', {'content': content})
          logging.info('200 ' + memcacheKey)
        self.response.out.write(response)      

class DevSitePages(webapp2.RequestHandler):
    def get(self, path):
        response = None
        lang = self.request.get('hl', 'en')
        fullPath = self.request.path
        memcacheKey = fullPath + '?hl=' + lang
        logging.info('GET ' + memcacheKey)

        if USE_MEMCACHE:
          response = memcache.get(memcacheKey)
          if response:
            logging.info('304 ' + fullPath)

        if response is None:
          try:
            if path.endswith('/'):
              response = devsiteIndex.getPage(path, lang)
            else:
              response = devsitePage.getPage(path, lang)
          
            if response is None:
              response = render('gae/404.tpl', {})
              logging.error('404 ' + fullPath)
              self.response.set_status(404)
            else:
              logging.info('200 ' + fullPath)
              if USE_MEMCACHE:
                memcache.set(memcacheKey, response)
          except Exception as e:
            response = 'ERROR'
            logging.error('500 ' + fullPath)
            logging.error(e)
            logging.error(traceback.format_exc())
            self.response.set_status(500)

        self.response.out.write(response)


# The '/' entry is a redirect to /web/ - just a convenience thing
app = webapp2.WSGIApplication([
    ('/', HomePage),
    ('/web/(.*)', DevSitePages),
    ('/framebox/(.*)', Framebox)
], debug=True)
