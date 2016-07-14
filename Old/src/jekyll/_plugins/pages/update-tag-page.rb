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

  require File.expand_path('../WFPage.rb', __FILE__)

  class UpdatesTagPage < UpdatePage
    def initialize(site, path, langcode, tag, updates)
      if path.nil?
        dir = File.join('updates', 'tags')
      else
        dir = File.join('updates', path, 'tags')
      end
      name = "#{tag}.html"
      super(site, dir, name, langcode)

      title_text = "All updates tagged: " + tag
      description_text = "All updates tagged: " + tag

      self.data['html_css_file'] = site.config['WFBaseUrl'] + '/styles/updates.css';
      self.data['title'] = title_text
      self.data['description'] = description_text
      self.data['rss'] = false
      self.data['tag'] = tag
      self.data['updates'] = updates
      self.data['theme_color'] = '#4527A0'

      self.read_yaml(File.join(site.source, '_layouts'), 'updates/tag.liquid')
    end
  end


  class UpdatesTagsPage < UpdatePage
    def initialize(site, path, langcode, tags)
      if path.nil?
        dir = File.join('updates', 'tags')
      else
        dir = File.join('updates', path, 'tags')
      end
      name = "index.html"
      super(site, dir, name, langcode)

      title_text = "Filter by tag"
      description_text = "Filter posts by tag"

      self.data['html_css_file'] = site.config['WFBaseUrl'] + '/styles/updates.css';
      self.data['title'] = title_text
      self.data['description'] = description_text
      self.data['rss'] = false
      self.data['tag_path'] = dir
      self.data['tags'] = tags

      self.read_yaml(File.join(site.source, '_layouts'), 'updates/tags.liquid')
    end
  end

end
