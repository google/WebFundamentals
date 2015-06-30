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

      chromeUpdatePages = getPages(site, ['updates', 'web'])
      if chromeUpdatePages.nil?
        return
      end

      # generate main page
      generatePaginationPages(site, chromeUpdatePages)

      # generate feed
      generateFeedPage(site, chromeUpdatePages)
      #site.pages << UpdatesFeedPage.new(site, site.source, File.join(@contentSource, site.data['curr_lang'], 'updates'), updatePages)

      #createTagPages(site, updatePages)




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

    def createTagPages(site, updatePages)
      contentFilename = site.config['WFcontentFoldername']

      tags = []
      tagPageMapping = {}

      # Iterate over every page and create an array of tags
      # and pages which have those tags
      updatePages.each do |updatePage|
        # Check if we have no tags
        if updatePage.data['updates-tags'].nil?
          next
        end

        # TODO mattgaunt Should the tags be made lowercase to give better grouping?
        updatePage.data['updates-tags'].each do |tag|
          tagPageMapping[tag] ||= []
          tagPageMapping[tag] << updatePage
          tags << tag
        end
      end

      tags.sort!
      tags.uniq!

      # Generate the tag pages
      tags.each do |tag|
        tagPageMapping[tag].uniq!

        # TODO mattgaunt - this looks like it's skipping the language support
        site.pages << UpdatesTagPage.new(site, site.source, File.join(contentFilename, site.data['curr_lang'], 'updates', 'tags'), tag, tagPageMapping[tag])
      end
    end

# This is the end of the old untested stuff

    def generatePaginationPages(site, pages)
      pages = pages.sort { |x,y| y["date"] <=> x["date"] }
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
      site.pages << UpdatesFeedPage.new(site, site.data['curr_lang'], pagesToInclude)
    end

  end

  class UpdatesTagPage < Page
    attr_accessor :tag

    def initialize(site, base, dir, tag, updates)
        @site = site
        @base = base
        @dir  = dir
        @name = "#{tag}.html"
        @tag = tag
        @updates = updates
        @langcode = site.data['curr_lang']

        self.process(@name)

        self.read_yaml(File.join(base, '_layouts'), 'updates/updates.liquid')

        title_text = "All updates tagged '%s'"
        description_text = "Tag page for updates tagged %s."

        self.data['title'] = sprintf title_text, tag
        self.data['description'] = sprintf description_text, tag
        self.data['tag'] = @tag
        self.data['updates'] = @updates
        self.data['langcode'] = @langcode
        if site.data["language_names"][@langcode].key?('rtl')
          self.data['rtl'] = site.data["language_names"][@langcode]['rtl'];
        end
        self.data['is_localized'] = false
    end

  end

end
