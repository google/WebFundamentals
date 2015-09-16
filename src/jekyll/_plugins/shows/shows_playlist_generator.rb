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

  require File.expand_path('../../wf/WFGenerator.rb', __FILE__)

  class ShowsPlaylistGenerator < WFGenerator
    # We want this to run early in the process.
    priority :lowest

    def generate(site)
      showPages = getPages(site, ['shows'])

      # Filter the pages to just include the primary language page
      primaryLangShowPages = showPages.map { |page|
        curr_lang = site.data['curr_lang']
        primary_lang = site.data['primary_lang']

        # no need to loop over translations if this is not a localized build
        if curr_lang == primary_lang
          next page
        end

        # find localized page or default to prime
        page.data['translations'][curr_lang] || page
      }.compact


    end

  end

end
