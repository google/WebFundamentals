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
        a.data['_nextPage'] = tree['pages'][i+1]
        if i > 0
          a.data['_previousPage'] = tree['pages'][i-1]
        elsif i == 0
          a.data['_previousPage'] = tree['index']
        end
      }

      if (not tree['index'].nil?) && (tree['pages'].size > 0)
        tree['index'].data['_nextPage'] = tree['pages'][0]
      end

      tree['subdirectories'].each { |value|
        organisePageTree(value)
      }

      tree['subdirectories'] = tree['subdirectories'].sort do |a, b|
        a_order = 0
        b_order = 0

        if !a['index'].nil?
          a_order = a['index'].data['order'] || a['index'].data['date'] || 0
        end
        if !b['index'].nil?
          b_order = b['index'].data['order'] || b['index'].data['date'] || 0
        end

        if a_order.is_a?(Integer) & b_order.is_a?(Integer)
            a_order <=> b_order
        elsif a_order.is_a?(String) & b_order.is_a?(String)
            a_order <=> b_order
        else
          0 <=> 0
        end
      end
    end

  end

end
