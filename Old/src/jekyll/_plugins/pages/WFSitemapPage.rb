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

  class WFSitemapPage < LanguagePage

    def initialize(site, pages)
      sitemapLayout = 'shared/sitemap.liquid';
      filename = 'sitemap.xml';

      super(site, '', filename, 'en')

      self.data = self.data ? self.data : {}

      sitemapPages = pages.reject { |page|
        reject = false

        if page.nil?
          reject = true
        else
          if (!page.data['published'].nil?) && (page.data['published']) != true
            reject = true
          end
        end

        reject
      }

      # This value is the default to make pages with no order to pushed to
      # the bottom allowing pages with an order to be at the top
      heavy_weight = 9999

      sitemapPages = sitemapPages.sort do |a, b|
        # TODO: this should be a shared method between here and build-end-generator
        a_order = 0
        b_order = 0

        if !a.nil?
          a_order = a.data['order'] || a.data['published_on'] || heavy_weight
        end
        if !b.nil?
          b_order = b.data['order'] || b.data['published_on'] || heavy_weight
        end

        if a_order.is_a?(Integer) & b_order.is_a?(Integer)
            a_order <=> b_order
        elsif a_order.is_a?(Date) & b_order.is_a?(Date)
            a_order <=> b_order
        else
          0 <=> 0
        end
      end

      self.data['sitemap_pages'] = sitemapPages

      # This will read the liquid file and asign the page the appropriate content
      self.read_yaml(File.join(site.source, '_layouts'), sitemapLayout)
    end

    def autogenerateBetterBook()
      # NOOP - Sitemap doesn't need a menu
    end
  end

end
