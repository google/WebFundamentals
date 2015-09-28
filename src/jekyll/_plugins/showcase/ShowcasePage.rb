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

  class ShowcasePage < LanguagePage

    DEFAULT_HEAD_TITLE = 'Google Web Showcase - Google Developers'
    DEFAULT_HEAD_DESCRIPTION = 'Google Web Showcase - Google Developers'

    def initialize(site, relativeDir, filename, langcode)
      validKeys = ['tags', 'showcase', 'subtitle', 'featured_image']
      super(site, relativeDir, filename, langcode, validKeys)

      self.data['drawerTitleText'] = 'Web Showcase'
      self.data['html_css_file'] = site.config['WFBaseUrl'] + '/styles/showcases.css';

      self.data['feed_name'] = 'Google Web Showcase - Google Developers'
      self.data['feed_url'] = site.config['WFBaseUrl'] + '/showcase/feed.xml'
    end
  end
end
