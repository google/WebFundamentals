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

  class UpdatesPaginationPage < UpdatePage

    def initialize(site, path, langcode, pages, paginationIndex, totalPaginationPages, title = nil)
      if path.nil?
        dir = 'updates'
        title = 'Updates'
      else
        dir = File.join('updates', path)
        if title.nil?
          title = path
        end
      end
      name = 'index.html'

      if paginationIndex != 0
        dir  = File.join(dir, 'pages')
        name = (paginationIndex + 1).to_s + ".html"
      end

      super(site, dir, name, langcode)

      self.data['html_css_file'] = site.config['WFBaseUrl'] + '/styles/updates.css';

      if paginationIndex == 0
        self.data['title'] = title
      else
        self.data['title'] = 'Updates Page ' + (paginationIndex + 1).to_s
      end
      self.data['rss'] = false
      self.data['updates'] = pages.sort {|a,b| b.data['date'] <=> a.data['date'] }
      self.data['pagination_total'] = totalPaginationPages
      self.data['pagination_current'] = paginationIndex
      self.data['theme_color'] = '#4527A0'

      #baseUrl = site.config['WFBaseUrl']
      #if paginationIndex > 0
      #  prevIndex = paginationIndex - 1;
      #  if prevIndex == 0
      #    self.data['previousPage'] = [baseUrl, 'updates'].join('/')
      #  else
      #    # Because we are zero indexed and the first result is offset by original_target
      #    # we add 1 to the index
      #    self.data['previousPage'] = [baseUrl, 'updates', 'pages', prevIndex + 1].join('/')
      #  end
      #end

      #if paginationIndex < (totalPaginationPages - 1)
      #  # Because we are zero indexed and the first result is offset by original_target
      #  # we add 2 to the indexs
      #  self.data['nextPage'] = [baseUrl, 'updates', 'pages', (paginationIndex + 2)].join('/')
      #end

      # We do this so that pages content includes the supploed layout file
      self.read_yaml(File.join(site.source, '_layouts'), 'updates/index.liquid')
    end

  end

end
