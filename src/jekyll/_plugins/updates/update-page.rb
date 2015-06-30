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

  class UpdatePage < LanguagePage
    def initialize(site, relativeDir, filename, langcode)
      super(site, relativeDir, filename, langcode)

      self.data['html_head_title'] = 'Web Updates - Google Developers'
      self.data['html_head_description'] = 'Google Developers Web Updates ' +
        'contains the latest news from the Chrome, looking at new features ' +
        'on the open web and in Chrome DevTools.'
      self.data['html_css_file'] = site.config['WFBaseUrl'] + '/styles/updates-index.css';

      self.data['feed_name'] = 'Web Updates - Google Developers'
      self.data['feed_url'] = site.config['WFBaseUrl'] + '/updates/feed.xml'

      loadBetterBook('contentnav', '_betterbook-updates.yaml')
    end
  end
end
