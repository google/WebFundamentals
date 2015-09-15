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

      # This should run as the end of all generators and will give pages a
      # chance to do any final work needed
      site.pages.each { |page|
        page.onBuildComplete()

        if page.data['translations'].nil?
          next
        end

        page.data['translations'].each { |transationPage|
          page.data.each { |key, value|
            if transationPage.data[key].nil?
              transationPage.data[key] = value
            end
          }

          transationPage.onBuildComplete()
        }
      }
    end

  end

end
