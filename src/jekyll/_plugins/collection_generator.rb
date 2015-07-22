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

  #  Creates an ordered group of articles built around a collection.

  require File.expand_path('../wf/WFGenerator.rb', __FILE__)

  class CollectionGenerator < WFGenerator
    def generate(site)
      pages = getPages(site, nil)

      collections = pages.map { |page|
        if (['collection'] - page.data.keys).empty? == false
          next
        end

        curr_lang = site.data['curr_lang']
        primary_lang = site.data['primary_lang']

        # no need to loop over translations if this is not a localized build
        if curr_lang == primary_lang
          next page
        end
        # find localized page or default to prime
        page.data['translations'].find { |p| p.langcode == curr_lang } || page
      }.compact

      # aggregate all the article into categories
      pageCollections = collections.inject({}) { |cats, page|
        pageCollection = page.data['collection']
        if pageCollection.nil?
          next cats
        end

        if pageCollection.kind_of?(Array) == false
          next cats
        end

        pageCollection.each { |collectionItem|
          # puts collectionItem
          if collectionItem['name'].nil?
            # puts "collection doesn't have a name attribute"
            next cats
          end

          cats[collectionItem['name']] ||= []
          cats[collectionItem['name']] << page
        }

        cats
      }
      # sort articles by 'order' value from Front Matter
      pageCollections.keys.each do |collectionName|
        # puts "collectionName: " + collectionName

        pageCollections[collectionName] = pageCollections[collectionName].sort do |a, b|
          a_order = a.data['collection'][collectionName]['order'] || 0
          b_order = b.data['collection'][collectionName]['order'] || 0
          a_order <=> b_order
        end

        pageCollections[collectionName].each_with_index { |page, i|
          # puts page.data['collection']
          # puts '======================'
          page.data['collection'].each_with_index { |collectionItem, i|
            page.data['collection'][i]['nextPage'] = pageCollections[collectionName][i+1]
            page.data['collection'][i]['previousPage'] = pageCollections[collectionName][i-1] if i > 0
          }
          #page.data['collection'][collectionName]
          #page.data['collection'][collectionName]['previousPage'] = pageCollections[collectionName][i-1] if i > 0
        }
      end

      #site.data['articles'] = articles

      # Add all the pages per category to each page.
      #site.pages.each do |page|
      #  page.data['articles'] = articles
      #end
      #site.data['primes'].values.each do |page|
      #  page.data['articles'] = articles
      #end if curr_lang != prime_lang
    end
  end

end
