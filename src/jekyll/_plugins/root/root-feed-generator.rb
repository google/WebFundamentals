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

  require File.expand_path('../../wf/WFGenerator.rb', __FILE__)

  # Generate pagination for update pages

  class RootFeedGenerator < WFGenerator
    priority :low

    def generate(site)
      @contentSource = site.config['WFContentSource']
      @numberOfResultsPerPage = 100

      if site.pages.nil?
        return
      end
      # generate feed
      generateFeedPage(site, site.pages)
    end

    def generateFeedPage(site, pages)
      site.pages << RootFeedPage.new(site, site.data['curr_lang'], pages)
    end
  end

end
