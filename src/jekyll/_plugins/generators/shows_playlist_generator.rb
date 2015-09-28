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

  #  This generator creates the individual feeds for each show

  require File.expand_path('../WFGenerator.rb', __FILE__)

  class ShowsPlaylistGenerator < WFGenerator
    # We want this to run early in the process.
    priority :lowest

    def generate(site)
      showPages = getPages(site, ['shows'])

      allShows = []

      showsContext = getShowsContext(site)
      if showsContext.nil?
        return
      end

      showsContext['subdirectories'].each { |subdirectory|
        if subdirectory['index'].nil?
          next
        end

        path = File.join(subdirectory['index'].directories)
        showPages = []

        subdirectory['subdirectories'].each { |showSeriesContext|
          showSeriesContext['pages'].each { |showPage|
            showPages << showPage
            allShows << showPage
          }
        }

        # TODO: This is a lot of duplicated Work / Effort - could we condense this down?
        rssFeedPage = ShowsFeedPage.new(site, path, site.data['curr_lang'], showPages, WFFeedPage.FEED_TYPE_RSS)
        atomFeedPage = ShowsFeedPage.new(site, path, site.data['curr_lang'], showPages, WFFeedPage.FEED_TYPE_ATOM)

        site.pages << rssFeedPage
        site.pages << atomFeedPage
      }
    end

    def getShowsContext(site)
      context = site.data['_context'];

      context['subdirectories'].each{ |subdirectory|
        if subdirectory['index'].nil?
          next
        end

        if subdirectory['id'] == 'shows'
          return subdirectory
        end
      }

      return nil
    end

  end

end
