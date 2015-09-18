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

  require 'sanitize'
  require File.expand_path('../../languages/language_page.rb', __FILE__)

  class FundamentalsPage < LanguagePage
    def initialize(site, relativeDir, filename, langcode)
      validKeys = ['udacity']
      super(site, relativeDir, filename, langcode, validKeys)

      self.data['drawerTitleText'] = 'Web Fundamentals'
      if self.data['title'].nil?
        self.data['html_head_title'] = 'Web Fundamentals - Google Developers'
      else
        self.data['html_head_title'] = self.data['title'] + 
          ' | Web Fundamentals - Google Developers'
      end
      if self.data['description'].nil?
        self.data['html_head_description'] = 'Google Developers Web Updates ' +
          'contains the latest news from the Chrome, looking at new features ' +
          'on the open web and in Chrome DevTools.'
      else
        self.data['html_head_description'] = self.data['description']
      end
      self.data['html_css_file'] = site.config['WFBaseUrl'] + '/styles/root.css';

      self.data['feed_name'] = 'Web Fundamentals - Google Developers'
      self.data['feed_url'] = site.config['WFBaseUrl'] + '/fundmentals/feed.xml'
    end
  end
end
