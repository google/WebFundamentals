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
      updates = site.data['articles']['updates']

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
      categories = ["news", "tip"]
      products = ["tools", "chrome", "chrome-devtools"]

      # generate /category and /product/category
      categories.each do |category|
        site.pages << UpdatesSubPage.new(site, site.source, File.join('_langs', site.data['curr_lang'], 'updates'), category, "all")
        products.each do |product|
          site.pages << UpdatesSubPage.new(site, site.source, File.join('_langs', site.data['curr_lang'], 'updates', product), category, product)
        end
      end

      # generate /product
      products.each do |product|
        site.pages << UpdatesSubPage.new(site, site.source, File.join('_langs', site.data['curr_lang'], 'updates'), "all", product)
      end

      site.data['tags_updates'] = tags
    end
  end

  class UpdatesSubPage < Page
    attr_accessor :tag

    def initialize(site, base, dir, category, product)
        @site = site
        @base = base
        @dir  = dir
        @name = category == "all" ? "#{product}.html" : "#{category}.html"
        @langcode = site.data['curr_lang']

        self.process(@name)

        self.read_yaml(File.join(base, '_layouts'), 'updates-sub.liquid')

        self.data['category'] = category
        self.data['product'] = product
        self.data['updates'] = site.data['articles']['updates']

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

        self.read_yaml(File.join(base, '_layouts'), 'updates-sub.liquid')

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
