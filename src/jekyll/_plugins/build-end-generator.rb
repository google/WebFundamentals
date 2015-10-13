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

  # This generator should be used for final pieces of work once
  # ALL pages and added to site.pages and to the site.data['_context']
  # tree data structure.


  # Create pages for Jekyll to build and handle translations
  class BuildEndGenerator < Generator
    priority :lowest
    def generate(site)
      organisePageTree(site.data['_context'])

      generateFeeds(site)

      # This should run as the end of all generators and will give pages a
      # chance to do any final work needed
      site.pages.each { |page|
        page.onBuildComplete()

        page.data['translations'].each { |langCode, translationPage|
          page.data.each { |key, value|
            if translationPage.data[key].nil?
              translationPage.data[key] = value
            end
          }

          translationPage.onBuildComplete()
        }
      }
    end

    def organisePageTree(tree)
      tree['pages'] = tree['pages'].sort do |a, b|
        a_order = a.data['order'] || a.data['published_on'] || 0
        b_order = b.data['order'] || b.data['published_on'] || 0
        a_order <=> b_order
      end

      tree['pages'].each_with_index { |a, i|
        for j in (i+1).upto(tree['pages'].size - 1)
          if tree['pages'][j]['published'] != false
            a.data['_nextPage'] = tree['pages'][j]
            break
          end
        end
        if i > 0
          for j in (i-1).downto(0)
            if tree['pages'][j]['published'] != false
              a.data['_previousPage'] = tree['pages'][j]
              break
            end
          end
        elsif i == 0
          if not tree['index'].nil?
            if tree['index']['published'] != 'false'
              a.data['_previousPage'] = tree['index']
            else
              a.data['_previousPage'] = nil
            end
          else
            a.data['_previousPage'] = nil
          end
        else
          a.data['_previousPage'] = nil
        end
      }

      if (not tree['index'].nil?) && (tree['pages'].size > 0)
        for j in (0).upto(tree['pages'].size - 1)
          if tree['pages'][j]['published'] != false
            tree['index'].data['_nextPage'] = tree['pages'][j]
            break
          end
        end
      end

      tree['subdirectories'].each { |value|
        organisePageTree(value)
      }

      # This value is the default to make pages with no order to pushed to
      # the bottom allowing pages with an order to be at the top
      heavy_weight = 9999

      tree['subdirectories'] = tree['subdirectories'].sort do |a, b|
        a_order = 0
        b_order = 0

        if !a['index'].nil?
          a_order = a['index'].data['order'] || a['index'].data['published_on'] || heavy_weight
        end
        if !b['index'].nil?
          b_order = b['index'].data['order'] || b['index'].data['published_on'] || heavy_weight
        end

        if a_order.is_a?(Integer) & b_order.is_a?(Integer)
            a_order <=> b_order
        elsif a_order.is_a?(Date) & b_order.is_a?(Date)
            a_order <=> b_order
        else
          0 <=> 0
        end
      end
    end

    def generateFeeds(site)
      rootContext = site.data['_context']
      sitemapPages = []

      rootContext['subdirectories'].each { |subdirectory|
        id = subdirectory['id']
        pagesToInclude = getPages(subdirectory)

        sitemapPages = sitemapPages + pagesToInclude

        site.pages << WFFeedPage.new(site, id, site.data['curr_lang'], pagesToInclude, WFFeedPage.FEED_TYPE_RSS)
        site.pages << WFFeedPage.new(site, id, site.data['curr_lang'], pagesToInclude, WFFeedPage.FEED_TYPE_ATOM)
      }

      site.pages << WFFeedPage.new(site, '', site.data['curr_lang'], sitemapPages, WFFeedPage.FEED_TYPE_RSS)
      site.pages << WFFeedPage.new(site, '', site.data['curr_lang'], sitemapPages, WFFeedPage.FEED_TYPE_ATOM)

      site.pages << WFSitemapPage.new(site, sitemapPages)
    end

    def getPages(subdirectory)
      array = []
      array << subdirectory['index']
      subdirectory['pages'].each { |page|
        array << page
      }

      subdirectory['subdirectories'].each { |subdirectory|
        array = array + getPages(subdirectory)
      }

      return array
    end

  end

end
