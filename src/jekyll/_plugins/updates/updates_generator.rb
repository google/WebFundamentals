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

      chromeUpdatePages = getPages(site, ['updates'])
      if chromeUpdatePages.nil?
        puts "No update posts found to generate any updates pagination pages."
        return
      end

      # generate main page
      generatePaginationPages(site, chromeUpdatePages)

      # generate feed
      generateFeedPage(site, chromeUpdatePages)
      #site.pages << UpdatesFeedPage.new(site, site.source, File.join(@contentSource, site.data['curr_lang'], 'updates'), updatePages)

      # generate tag pages
      generateTagPages(site, chromeUpdatePages)

      # Generate category/product pages
      #categories = site.data['updates']['types']
      #products = site.data['updates']['products']

      # generate /category and /product/category
      #categories.each do |category, val1|
      #  generatePaginatedPage(site, site.source, File.join('updates', category), category, "all")
      #  products.each do |product, val2|
      #    generatePaginatedPage(site, site.source, File.join('updates', product, category), category, product)
      #  end
      #end

      # generate /product
      #products.each do |product, val|
      #  generatePaginatedPage(site, site.source, File.join('updates', product), "all", product)
      #end


    end

    def generateTagPages(site, pages)
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
        site.pages << UpdatesTagPage.new(site, site.data['curr_lang'], tag, tagPageMapping[tag])
      end

      site.pages << UpdatesTagsPage.new(site, site.data['curr_lang'], tags)

    end


# This is the end of the old untested stuff

    def generatePaginationPages(site, pages)
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

      (0..(numberOfPages - 1)).each do |pageIndex|

        # Creat indices to include in the page results
        # -1 on endPageIndex accounts for zero indexing
        startPageIndex = pageIndex * @numberOfResultsPerPage
        endPageIndex = startPageIndex + @numberOfResultsPerPage - 1

        pagesToInclude = pages[startPageIndex..endPageIndex]

        site.pages << UpdatesPaginationPage.new(site, site.data['curr_lang'], pagesToInclude, pageIndex, numberOfPages)
      end
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
