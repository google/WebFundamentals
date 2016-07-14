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

  class WFFeedPage < LanguagePage
    @@FEED_TYPE_RSS = 0
    @@FEED_TYPE_ATOM = 1

    def initialize(site, relative_dir, langcode, pages, feedType)
      feedLayout = 'shared/rss.liquid';
      feedFilename = 'rss.xml';
      if feedType == @@FEED_TYPE_ATOM
        feedLayout = 'shared/atom.liquid';
        feedFilename = 'atom.xml';
      end

      super(site, relative_dir, feedFilename, langcode)

      # This will read the liquid file and asign the page the appropriate content
      self.read_yaml(File.join(site.source, '_layouts'), feedLayout)

      self.data = self.data ? self.data : {}
      self.data['feed_icon'] = site.config['WFAbsoluteUrl'] + site.config['WFBaseUrl'] + 'favicon.ico'
      maxNumberOfResults = 25
      feedPages = pages.reject { |page|
        reject = false

        if page.nil?
          reject = true
        else
          if (!page.data['published'].nil?) && (page.data['published']) != true
            reject = true
          elsif page.data['published_on'].nil?
            reject = true
          end
        end

        reject
      }

      feedPages = feedPages.sort do |a, b|
        a_order = a.data['published_on']
        b_order = b.data['published_on']

        b_order <=> a_order
      end

      if feedPages.count > 0
        self.data['feed_update'] = feedPages[0].data['updated_on'].strftime("%Y-%m-%dT%H:%M:%SZ")
      else
        self.data['feed_update'] = site.time.strftime("%Y-%m-%dT%H:%M:%SZ")
      end

      feedPages = feedPages[0..maxNumberOfResults]

      self.data['feed_pages'] = feedPages

      # This should be overriden
      self.data['feed_title'] = 'Web - Google Developers'
      self.data['feed_description'] = 'The latest changes to developers.google.com/web/fundamentals.'
      self.data['feed_id'] = site.config['WFAbsoluteUrl'] + site.config['WFBaseUrl'] + '/fundamentals'
      self.data['feed_link'] = site.config['WFAbsoluteUrl'] + site.config['WFBaseUrl'] + '/fundamentals/?utm_source=feed&amp;utm_medium=feed&amp;utm_campaign=fundamentals_feed'

      # The section is used in the UTM_Campaign for tracking
      self.data['feed_section'] = 'fundamentals'
    end

    def WFFeedPage.FEED_TYPE_RSS
        return @@FEED_TYPE_RSS
    end

    def WFFeedPage.FEED_TYPE_ATOM
        return @@FEED_TYPE_ATOM
    end

    def autogenerateBetterBook()
      # NOOP - For a feed we need no menu
    end
  end

end
