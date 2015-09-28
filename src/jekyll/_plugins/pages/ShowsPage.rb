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

  require 'sanitize'
  require File.expand_path('../LanguagePage.rb', __FILE__)

  class ShowsPage < LanguagePage
    DEFAULT_HEAD_TITLE = 'Web Shows - Google Developers'
    DEFAULT_HEAD_DESCRIPTION = 'Google Developer web shows are ' +
      'a set of video series that help web developers learn about the ' +
      'latest news and technologies on the web platform.'

    def initialize(site, relativeDir, filename, langcode)
      # TODO Optimize valid yaml keys and remove date
      # see https://github.com/google/WebFundamentals/issues/1651
      validKeys = [
        'youtubeID', 'key_img', 'subtitle', 'udacity'
      ]
      super(site, relativeDir, filename, langcode, validKeys)

      self.data['drawerTitleText'] = 'Shows'
      self.data['theme_color'] = '#212121'

      self.data['html_css_file'] = site.config['WFBaseUrl'] + '/styles/shows.css';

      if @directories.count < 2
        self.data['feed_name'] = "Web Shows - Google Developers";
        self.data['rss_feed_url'] = File.join(site.config['WFBaseUrl'], @directories[0], 'rss.xml')
        self.data['atom_feed_url'] = File.join(site.config['WFBaseUrl'], @directories[0], 'atom.xml')
      elsif
        #puts "@directories[0]: " + @directories[0]
        #puts "@directories[1]: " + @directories[1]
        self.data['rss_feed_url'] = File.join(site.config['WFBaseUrl'], @directories[0], @directories[1], 'rss.xml')
        self.data['atom_feed_url'] = File.join(site.config['WFBaseUrl'], @directories[0], @directories[1], 'atom.xml')
      end

      #self.data['feedUrl'] = 'feedUrl.html'
      #self.data['feedName'] = 'Totally Tooling Tips'
    end
  end
end
