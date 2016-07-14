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
  require File.expand_path('../LanguagePage.rb', __FILE__)

  class LandingPage < LanguagePage

    DEFAULT_HEAD_TITLE = 'Web Fundamentals - Google Developers'
    DEFAULT_HEAD_DESCRIPTION = 'Google Developers Web Updates ' +
      'contains the latest news from the Chrome, looking at new features ' +
      'on the open web and in Chrome DevTools.'

    def initialize(site, relativeDir, filename, langcode)
      validKeys = ['udacity']
      super(site, relativeDir, filename, langcode, validKeys)

      self.data['html_css_file'] = site.config['WFBaseUrl'] + '/styles/landing.css';
      self.data['theme_color'] = '#3F51B5'
      self.data['feed_name'] = 'Web Fundamentals - Google Developers'
    end
  end
end
