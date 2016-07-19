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

    DEFAULT_HEAD_TITLE = 'Web Updates - Google Developers'
    DEFAULT_HEAD_DESCRIPTION = 'Google Developers Web Updates ' +
      'contains the latest news from the Chrome, looking at new features ' +
      'on the open web and in Chrome DevTools.'

    def initialize(site, relativeDir, filename, langcode)
      validKeys = [
        'tags', 'featured_image', 'source_name', 'source_url'
      ]
      super(site, relativeDir, filename, langcode, validKeys)

      self.data['html_css_file'] = site.config['WFBaseUrl'] + '/styles/updates.css';
      self.data['theme_color'] = '#4527A0'

      if @directories.count > 1
        self.data['feed_name'] = 'Web Updates - Google Developers'
        self.data['rss_feed_url'] = File.join(site.config['WFBaseUrl'], @directories[0], 'rss.xml')
        self.data['atom_feed_url'] = File.join(site.config['WFBaseUrl'], @directories[0], 'atom.xml')
      else
        self.data['feed_name'] = 'Web Updates - Google Developers'
      end
    end

  end
end
