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
    # We want this to run early in the process.
    priority :lowest
    def generate(site)
      @pagesTree = {}

      allPages = getPages(site, nil)

      # Filter the pages to just include the primary language page
      primaryLangPages = allPages.map { |page|
        curr_lang = site.data['curr_lang']
        primary_lang = site.data['primary_lang']

        # no need to loop over translations if this is not a localized build
        if curr_lang == primary_lang
          next page
        end

        # find localized page or default to prime
        page.data['translations'].find { |p| p.langcode == curr_lang } || page
      }.compact

      collections = primaryLangPages.inject({}) { |cumulativeCollections, page|
        collectionName = page.directories[page.directories.length - 1];
        cumulativeCollections[collectionName] ||= {'id' => collectionName}
        cumulativeCollections[collectionName]['pages'] ||= []
        cumulativeCollections[collectionName]['pages'] << page

        if page.directories.length > 1
          # If it's greater than one, then it's a subdirectory
          parentName = page.directories[page.directories.length - 2]
          cumulativeCollections[parentName] ||= {'id' => parentName}
          cumulativeCollections[parentName]['pages'] ||= []
          cumulativeCollections[parentName]['subdirectories'] ||= {}
          cumulativeCollections[parentName]['subdirectories'][collectionName] ||= cumulativeCollections[collectionName]
        end

        cumulativeCollections
      }

      # sort articles by 'order' value from Front Matter
      collections.keys.each do |collectionName|
        collections[collectionName]['pages'] = collections[collectionName]['pages'].sort do |a, b|
          a_order = a.data['order'] || 0
          b_order = b.data['order'] || 0
          a_order <=> b_order
        end

        collections[collectionName]['pages'].each_with_index { |a, i|
          a.data['next'] = collections[collectionName]['pages'][i+1]
          a.data['previous'] = collections[collectionName]['pages'][i-1] if i > 0
        }
      end

      primaryLangPages.each { |page|
        rootFolderName = page.directories[0]

        case rootFolderName
        when 'fundamentals'
          page.data['pages'] = collections[page.directories[page.directories.length - 1]]
        end
      }

    end
  end

end
