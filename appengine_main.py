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

import os
import webapp2
import logging
import traceback
import devsitePage
import devsiteIndex
import devsiteHelper
from google.appengine.api import memcache
from google.appengine.ext.webapp.template import render

DEFAULT_LANG = 'en'
DEVENV = os.environ['SERVER_SOFTWARE'].startswith('Dev')
USE_MEMCACHE = not DEVENV

class FlushMemCache(webapp2.RequestHandler):
    def get(self):
        memcache.flush_all()
        self.response.out.write('Flushed')

class HomePage(webapp2.RequestHandler):
    def get(self):
        self.redirect('/web/', permanent=True)

class DevSiteRedirect(webapp2.RequestHandler):
    def get(self, path):
        self.redirect('https://developers.google.com/' + path, permanent=True)

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
        langQS = self.request.get('hl', None)
        langCookie = self.request.cookies.get('hl')
        if langQS:
          lang = langQS
        elif langCookie:
          lang = langCookie
        else:
          lang = DEFAULT_LANG
        self.response.set_cookie('hl', lang, max_age=3600, path='/')

        fullPath = self.request.path
        memcacheKey = fullPath + '?hl=' + lang
        logging.info('GET ' + memcacheKey)

        if USE_MEMCACHE:
          response = memcache.get(memcacheKey)
          if response:
            logging.info('304 ' + fullPath)

        if response is None:
          try:
            if path.endswith('/') or path == '':
              response = devsiteIndex.getPage(path, lang)
            else:
              response = devsitePage.getPage(path, lang)
          
            if response is None:
              # No file found, check for redirect
              redirectTo = devsiteHelper.checkForRedirect(fullPath, lang, USE_MEMCACHE)
              if redirectTo:
                logging.info('301 ' + redirectTo)
                self.redirect(redirectTo, permanent=True)
                return

              # No redirect found, send the 404 page.
              response = render('gae/404.tpl', {'requestPath': fullPath})
              logging.error('404 ' + fullPath)
              self.response.set_status(404)
            else:
              logging.info('200 ' + fullPath)
              if USE_MEMCACHE:
                memcache.set(memcacheKey, response)
          except Exception as ex:
            context = {'content': ex, 'requestPath': fullPath}
            response = render('gae/500.tpl', context)
            logging.exception('500 ' + fullPath)
            self.response.set_status(500)

        self.response.out.write(response)


# The '/' entry is a redirect to /web/ - just a convenience thing
app = webapp2.WSGIApplication([
    ('/flushMemCache', FlushMemCache),
    ('/', HomePage),
    ('/web/(.*)', DevSitePages),
    ('/framebox/(.*)', Framebox),
    ('/(.*)', DevSiteRedirect)
], debug=DEVENV)
