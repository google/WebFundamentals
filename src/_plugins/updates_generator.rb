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

  # Generate pagination for update pages

  class UpdatesTagPaginator < Generator
    priority :low

    def generate(site)
      # don't generate updates in other languages than english
      if site.data['curr_lang'] != 'en'
        return
      end

      updates = getUpdates(site)

      if updates.nil?
        return
      end

      tags = []
      tag_updates = {}

      updates.each do |update|
        next if update.data['tags'].nil?
        update.data['tags'].each do |tag|
          tag_updates[tag] ||= []
          tag_updates[tag] << update
          tags << tag
        end
      end

      tags.sort!
      tags.uniq!

      # Generate the tag pages
      tags.each do |tag|
        tag_updates[tag].uniq!
        site.pages << UpdatesTagPage.new(site, site.source, File.join('_langs', site.data['curr_lang'], 'updates', 'tags'), tag, tag_updates[tag])
      end

      # Generate category/product pages
      categories = site.data['updates']['types']
      products = site.data['updates']['products']

      # generate /category and /product/category
      categories.each do |category, val1|
        generatePaginatedPage(site, site.source, File.join('updates', category), category, "all")
        products.each do |product, val2|
          generatePaginatedPage(site, site.source, File.join('updates', product, category), category, product)
        end
      end

      # generate /product
      products.each do |product, val|
        generatePaginatedPage(site, site.source, File.join('updates', product), "all", product)
      end

      # generate main page
      generatePaginatedPage(site, site.source, File.join('updates'), "all", "all", true)

      # generate feed from a cleaned list of updates
      cur_dir = File.join('_langs', site.data['curr_lang'], 'updates')
      posts = []
      updates.each do |post|
        if post['published'] == false || post['rss'] == false
          # NoOp - ignore these posts
        else
          posts.push(post)
        end
      end
      # Generate the ATOM feed
      site.pages << UpdatesFeedPage.new(site, site.source, cur_dir, 'atom.liquid', 'atom.xml', posts)

      # Generate the RSS feed
      site.pages << UpdatesFeedPage.new(site, site.source, cur_dir, 'rss.liquid', 'rss.xml', posts)

      # Generate the old feed for backwards compatibility
      site.pages << UpdatesFeedPage.new(site, site.source, cur_dir, 'feed.liquid', 'feed.xml', posts)


      site.data['tags_updates'] = tags
    end

    def getUpdates(site)
      if site.data['articles']['updates'].nil?
        return nil
      else
        return site.data['articles']['updates'] + site.data['articles']['spotlight'] + site.data['articles']['case-study']
      end
    end

    def generatePaginatedPage(site, base, dir, category, product, notips=nil)

      pag_root = dir
      dir = File.join('_langs', site.data['curr_lang'], dir)
      per_page = 10

      # filter array so it only contains what we need
      updates = getUpdates(site)
      updates = updates.select do |update|
        (category == "all" || update["type"] == category) \
        && (product == "all" || update["product"] == product || update["category"] == product) \
        && (notips.nil? || update['type'] != 'tip')
      end
      updates = updates.sort { |x,y| y["date"] <=> x["date"] }

      page_count = updates.count <= per_page ? 1 : calculatePages(updates, per_page)
      (1..page_count).each do |num_page|
        # generate first page
        site.pages << UpdatesSubPage.new(site, base, dir, category, product, updates[0..per_page-1], page_count, 1, pag_root)
        if num_page > 1
          # generate all other paginated pages
          start = (num_page - 1) * per_page
          num = (start + per_page - 1) >= updates.size ? updates.size : (start + per_page - 1)
          site.pages << UpdatesSubPage.new(site, base, File.join(dir, num_page.to_s), category, product, updates[start..num], page_count, num_page, pag_root)
        end
      end
      
    end

    def calculatePages(updates, per_page)
      (updates.size.to_f / per_page.to_i).ceil
    end

  end

  class UpdatesSubPage < Page
    attr_accessor :tag

    def initialize(site, base, dir, category, product, updates, pag_total, pag_current, pag_root)
        @site = site
        @base = base
        @dir  = dir
        @name = "index.html"
        @langcode = site.data['curr_lang']

        self.process(@name)

        self.read_yaml(File.join(base, '_layouts'), 'updates.liquid')

        self.data['category'] = category
        self.data['product'] = product
        self.data['updates'] = updates
        self.data['pagination_total'] = pag_total
        self.data['pagination_current'] = pag_current
        self.data['pagination_root'] = pag_root

        self.data['langcode'] = @langcode
        if site.data["language_names"][@langcode].key?('rtl')
          self.data['rtl'] = site.data["language_names"][@langcode]['rtl'];
        end
        self.data['is_localized'] = false
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

        self.read_yaml(File.join(base, '_layouts'), 'updates.liquid')

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

  class UpdatesFeedPage < Page
    attr_accessor :tag

    def initialize(site, base, dir, template, fname, updates)
        @site = site
        @base = base
        @dir  = dir
        @name = fname
        @template = template
        @tag = tag
        @updates = updates
        @langcode = site.data['curr_lang']

        self.process(@name)

        self.read_yaml(File.join(base, '_layouts'), @template)

        self.data['title'] = 'Web Updates'
        self.data['description'] = 'The latest and freshest updates from the Web teams at Google. Chrome, Tooling and more.'
        self.data['section'] = 'updates'
        self.data['items'] = @updates
        self.data['langcode'] = @langcode
        if site.data["language_names"][@langcode].key?('rtl')
          self.data['rtl'] = site.data["language_names"][@langcode]['rtl'];
        end
        self.data['is_localized'] = false
    end

  end

end
