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

  #  Creates an array all videos and adds it
  #  to the site object

  class AllVideosGenerator < Generator
    def generate(site)
      # Current language the build is using
      curr_lang = site.data['curr_lang']

      # English is our primary language
      prime_lang = site.data['prime_lang']

      # Get all the pages for the primary language
      primePages = site.data['primes']

      # Pick either the primes pages from site data
      # Otherwise pick site.pages
      pages = primePages ? primePages.values : site.pages

      # For each page, add to collection if it contains
      # certain keys
      suitablePages = pages.map { |page|
        # Skip is the page isn't published3
        next if page.data['published'] == false

        # Continue if the array of keys, minus the all the page keys is NOT empty
        remainingKeys = ['showYoutubeID'] - page.data.keys;
        next unless (remainingKeys).empty?

        # no need to loop over translations if this is not a localized build
        next page if curr_lang == prime_lang

        # find localized page or default to prime
        page.data['translations'].find { |p| p.langcode == curr_lang } || page
      }.compact

      # aggregate all the video pages into categories
      videoPages = suitablePages.inject([]) { |cumulativeVideoPages, page|

        # Skip, returning cumulativeVideoPages, unless c
        # has a truthy value from page.data
        next cumulativeVideoPages unless c = page.data['collection']

        # Add page to cumulativeVideoPages
        cumulativeVideoPages << page

        # Return categories
        cumulativeVideoPages
      }

      site.data['allVideos'] = videoPages




      # For each page, add to collection if it contains
      # certain keys
      suitablePages = pages.map { |page|
        # Skip is the page isn't published3
        next if page.data['published'] == false

        # Continue if the array of keys, minus the all the page keys is NOT empty
        remainingKeys = ['showid'] - page.data.keys;
        next unless (remainingKeys).empty?

        # no need to loop over translations if this is not a localized build
        next page if curr_lang == prime_lang

        # find localized page or default to prime
        page.data['translations'].find { |p| p.langcode == curr_lang } || page
      }.compact

      # Group videos into series and all videos for a show
      videoGroups = suitablePages.inject({}) { |cumulativeVideoGroups, page|

        # Skip, returning cumulativeVideoPages, unless showid
        # has a truthy value from page.data and we have a showYoutubeId
        next cumulativeVideoGroups unless page.data['showYoutubeID']
        next cumulativeVideoGroups unless showid = page.data['showid']

        # Make sure the video is added to the root page
        cumulativeVideoGroups[showid] ||= []
        cumulativeVideoGroups[showid] << page

        # Skip, returning cumulativeVideoPages, unless id
        # and show id aren't the same and we have and ID
        next cumulativeVideoGroups unless page.data['id'] != page.data['showid']
        next cumulativeVideoGroups unless collection = page.data['collection']

        # Make sure the video is added to the collection
        cumulativeVideoGroups[collection] ||= []
        cumulativeVideoGroups[collection] << page

        # Return categories
        cumulativeVideoGroups
      }

      site.data['videoGroups'] = videoGroups

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
