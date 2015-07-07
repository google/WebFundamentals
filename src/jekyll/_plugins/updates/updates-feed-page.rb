# Copyright 2015 Google Inc. All rights reserved.
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

  class UpdatesFeedPage < LanguagePage

    def initialize(site, langcode, pages)
      super(site, File.join('updates'), 'feed.xml', langcode)

      self.data = self.data ? self.data : {}

      self.data['feed_title'] = 'Web Updates - Google Developers'
      self.data['feed_description'] = 'The latest and freshest updates from the Web teams at Google. Chrome, Tooling and more.'
      self.data['feed_icon'] = site.config['WFAbsoluteUrl'] + site.config['WFBaseUrl'] + 'favicon.ico'
      self.data['feed_id'] = site.config['WFAbsoluteUrl'] + site.config['WFBaseUrl'] + '/updates'
      self.data['feed_link'] = site.config['WFAbsoluteUrl'] + site.config['WFBaseUrl'] + '/updates/?utm_source=feed&amp;utm_medium=feed&amp;utm_campaign=updates_feed'
      self.data['feed_update'] = site.time.strftime("%Y-%m-%dT%H:%M:%SZ")

      maxNumberOfResults = 10
      counter = 0;
      feedPages = pages.reject { |page|
        reject = false
        if page.data['published'] == false || page.data['published'] == 'staged'
          reject = true
        elsif counter >= maxNumberOfResults
          reject = true
        else
          counter = counter + 1
        end

        reject
      }

      self.data['feed_pages'] = feedPages

      # The section is used in the UTM_Campaign for tracking
      self.data['section'] = 'updates'

      # This will read the liquid file and asign the page the appropriate content
      self.read_yaml(File.join(site.source, '_layouts'), 'shared/feed.liquid')
    end

  end

end
