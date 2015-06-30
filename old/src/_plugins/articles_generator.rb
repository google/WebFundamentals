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

  class CollectionGenerator < Generator
    def generate(site)
      curr_lang = site.data['curr_lang']
      prime_lang = site.data['prime_lang']

      # Find all the collection pages
      pages = site.data['primes']
      pages = pages ? pages.values : site.pages
      collections = pages.map { |page|
        next if page.data['published'] == false
        next unless (['collection', 'article'] - page.data.keys).empty?
        # no need to loop over translations if this is not a localized build
        next page if curr_lang == prime_lang
        # find localized page or default to prime
        page.data['translations'].find { |p| p.langcode == curr_lang } || page
      }.compact

      # aggregate all the article into categories
      articles = collections.inject({}) { |cats, page|
        next cats unless c = page.data['collection']
        cats[c] ||= []
        cats[c] << page
        cats
      }

      # sort articles by 'order' value from Front Matter
      articles.keys.each do |cat|
        articles[cat] = articles[cat].sort do |a, b|
          a_order = a.data['article']['order'] || 0
          b_order = b.data['article']['order'] || 0
          a_order <=> b_order
        end

        articles[cat].each_with_index { |a, i|
          a.data['article']['next'] = articles[cat][i+1]
          a.data['article']['previous'] = articles[cat][i-1] if i > 0
        }
      end

      site.data['articles'] = articles

      # Add all the pages per category to each page.
      site.pages.each do |page|
        page.data['articles'] = articles
      end
      site.data['primes'].values.each do |page|
        page.data['articles'] = articles
      end if curr_lang != prime_lang
    end
  end

end
