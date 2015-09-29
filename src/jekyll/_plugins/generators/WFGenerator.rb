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

  class WFGenerator < Generator
    priority :low
    def generate(site)

    end

    def getPages(site, sections)
      curr_lang = site.data['curr_lang']
      primary_lang = site.data['primary_lang']

      # Find all the collection pages
      pages = site.data['primes']

      # This gives us access to the data of each page
      pages = site.pages

      # Get a list of published update pages
      sectionPages = pages.map { |page|
        if page.data['published'] == false
          next
        end

        #requiredYamlFields = ['date']
        #if (requiredYamlFields - page.data.keys).empty? == false
        #  puts "No Date found in YAML " + page.name
        #  next
        #end

        #if not (page.data['wf-section'] == sectionName)
        #  next
        #end

        if sections.nil?
          next page
        end

        # This checks whether the relative path
        # is within the current section
        directories = page.relative_path.split(File::SEPARATOR)
        if directories.count < sections.count
          next
        end

        # This is weird because next in the context of sections.each_with_index
        # Isn't the right level to skip this level
        isInSection = true;
        sections.each_with_index { |sectionName, index|
          if directories[index] != sectionName
            isInSection = false
            next
          end
        }
        if not isInSection
          next
        end

        # TODO mattgaunt: is this needed? Copied over from articles_generator
        # no need to loop over translations if this is not a localized build
        next page if curr_lang == primary_lang

        # find localized page or default to prime
        page.data['translations'][curr_lang] || page
      }.compact

      if sectionPages.nil?
        return []
      end

      return sectionPages

      #return sectionPages.sort {|a,b|
      #  b.data['date'] <=> a.data['date']
      #}
    end
  end
end
