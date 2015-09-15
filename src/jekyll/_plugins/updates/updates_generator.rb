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

  class UpdatesTagPaginator < WFGenerator
    priority :low

    def generate(site)
      @contentSource = site.config['WFContentSource']
      @numberOfResultsPerPage = 10
      if @contentSource.nil?
        Jekyll.logger.info "WFContentSource is not defined - no language " +
          "pages to generate"
        return
      end

      updateSection = {'id' => 'updates', "pages" => [], "subdirectories" => []}
      site.data['_context']['subdirectories'] << updateSection

      chromeUpdatePages = getPages(site, ['updates'])
      if chromeUpdatePages.nil?
        puts "No update posts found to generate any updates pagination pages."
        return
      end

      # generate main page
      generatePaginationPages(site, updateSection, chromeUpdatePages)

      # generate feed
      generateFeedPage(site, chromeUpdatePages)

      # generate tag pages
      generateTagPages(site, updateSection, chromeUpdatePages)
    end

    def generateTagPages(site, updateSection, pages)
      dir = File.join(site.data['curr_lang'], 'updates', 'tags')
      tags = []
      tagPageMapping = {}

      # Iterate over every page and create an array of tags + pages that
      # have those tags.
      pages.each do |page|

        # If there are no tags, skip this page
        if page.data['tags'].nil?
          next
        end

        page.data['tags'].each do |tag|
          # Clean up the tag, strip whitespace and lower case it
          tag = tag.downcase.strip

          # Error on reserved words or if there is a space in the tag
          if tag === 'index' || tag === 'index.html'
            msg = 'Reserved tag name index[.html] (' + page.name + ')'
            throw new PluginError("Create Tag Pages", msg);
          end
          if tag.index(' ') != nil
            msg = 'Spaces not permitted in tags: ' + tag + ' (' + page.name + ')'
            throw new PluginError("Create Tag Pages", msg);
          end

          tagPageMapping[tag] ||= []
          tagPageMapping[tag] << page
          tags << tag
        end
      end

      tags.sort!
      tags.uniq!

      tags.each do |tag|
        tagPageMapping[tag].uniq!
        tagPage = UpdatesTagPage.new(site, site.data['curr_lang'], tag, tagPageMapping[tag])
        tagPage.data['_context'] = updateSection
        site.pages << tagPage
      end

      tagPage = UpdatesTagsPage.new(site, site.data['curr_lang'], tags)
      tagPage.data['_context'] = updateSection
      site.pages << tagPage

    end


# This is the end of the old untested stuff

    def generatePaginationPages(site, updateSection, pages)
      # Filter out pages with dates only
      pages = pages.map { |page|
        requiredYamlFields = ['written_on']
        if (requiredYamlFields - page.data.keys).empty? == false
          puts "Found an update page without a date - this is surely wrong?"
          throw new PluginError(PLUGIN_NAME, 'Update page found without a date field. ' +
            page.name);
          next
        end

        page
      }

      pages = pages.sort { |x,y| y["written_on"] <=> x["written_on"] }
      numberOfPages = calculatePages(pages, @numberOfResultsPerPage)

      (0..(numberOfPages - 1)).each { |pageIndex|

        # Creat indices to include in the page results
        # -1 on endPageIndex accounts for zero indexing
        startPageIndex = pageIndex * @numberOfResultsPerPage
        endPageIndex = startPageIndex + @numberOfResultsPerPage - 1

        pagesToInclude = pages[startPageIndex..endPageIndex]

        updatePage = UpdatesPaginationPage.new(site, site.data['curr_lang'], pagesToInclude, pageIndex, numberOfPages)
        updatePage.data['_context'] = updateSection

        site.pages << updatePage
        if pageIndex == 0
          updateSection['index'] = updatePage
        else
          updateSection['pages'] << updatePage
        end
      }
    end

    def calculatePages(pages, numberOfResultsPerPage)
      (pages.size.to_f / numberOfResultsPerPage).ceil
    end

    def generateFeedPage(site, pages)
      pagesToInclude = pages

      site.pages << UpdatesFeedPage.new(site, site.data['curr_lang'], pagesToInclude, WFFeedPage.FEED_TYPE_RSS)
      site.pages << UpdatesFeedPage.new(site, site.data['curr_lang'], pagesToInclude, WFFeedPage.FEED_TYPE_ATOM)
    end

  end

end
