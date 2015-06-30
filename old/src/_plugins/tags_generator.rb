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

  # Find all tags used in spotlights.

  class TagGenerator < Generator
    priority :low

    def generate(site)
      spotlights = site.data['articles']['spotlight']

      if spotlights.nil?
        return
      end

      tags = []
      tag_spotlights = {}

      spotlights.each do |spotlight|
        spotlight.data['tags'].each do |tag|
          tag_spotlights[tag] ||= []
          tag_spotlights[tag] << spotlight
          tags << tag
        end
      end

      tags.sort!

      tags.each do |tag|
        tag_spotlights[tag].uniq!
        site.pages << TagPage.new(site, site.source, File.join('_langs', site.data['curr_lang'], 'showcase', 'spotlight', 'tags'), tag, tag_spotlights[tag])
      end

      site.data['tags'] = tags
    end
  end

  class TagPage < Page
    attr_accessor :tag

    def initialize(site, base, dir, tag, spotlights)
        @site = site
        @base = base
        @dir  = dir
        @name = "#{tag}.html"
        @tag = tag
        @spotlights = spotlights
        @langcode = site.data['curr_lang']

        self.process(@name)

        self.read_yaml(File.join(base, '_layouts'), 'tag-page.liquid')

        title_text = site.data["localized_strings"][@langcode]["spotlights_tagged"]
        title_text = title_text ? title_text : site.data["localized_strings"]["en"]["spotlights_tagged"]
        description_text = site.data["localized_strings"][@langcode]["list_of_tagged"]
        description_text = description_text ? description_text : site.data["localized_strings"]["en"]["list_of_tagged"]


        self.data['title'] = sprintf title_text, tag
        self.data['description'] = sprintf description_text, tag
        self.data['tag'] = @tag
        self.data['spotlights'] = @spotlights
        self.data['langcode'] = @langcode
        if site.data["language_names"][@langcode].key?('rtl')
          self.data['rtl'] = site.data["language_names"][@langcode]['rtl'];
        end
        self.data['is_localized'] = false
    end

  end

end
