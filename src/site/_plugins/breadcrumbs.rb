# Copyright 2014 Google Inc. All rights reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at

#    http://www.apache.org/licenses/LICENSE-2.0

# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

module Jekyll

  ##
  # Monkey patch Jekyll's Page class
  class Page

    ##
    # We add a custom method to the page variable, that returns an ordered list of it's
    # parent pages ready for iteration.
    def ancestors
      a = []
      url = self.url
      while url != "/index.html"
        pt = url.split("/")
        if pt[-1] != "index.html"
          # to to directory index
          pt[-1] = "index.html"
          url = pt.join("/")
        else
          # one level up
          url = pt[0..-3].join("/") + "/index.html"
        end
        a << get_page_from_url(url)
      end

      a.pop

      return a.reverse
    end

    ##
    # Make ancestors available in liquid
    alias orig_to_liquid to_liquid
    def to_liquid
      h = orig_to_liquid
      h['ancestors'] = self.ancestors
      return h
    end

    private

    ##
    # Gets Page object that has given url. Very efficient O(n) solution.
    def get_page_from_url(url)
      site.pages.each do |page|
        return page if page.url == url
      end
    end
  end
end
