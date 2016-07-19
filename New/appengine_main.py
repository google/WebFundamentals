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
