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

  require File.expand_path('../WFFeedPage.rb', __FILE__)

  class RootFeedPage < WFFeedPage

    def initialize(site, langcode, pages, feedType)
      super(site, File.join('.'), langcode, pages, feedType)

      self.data = self.data ? self.data : {}

      self.data['feed_title'] = 'Web - Google Developers'
      self.data['feed_description'] = 'All articles, tutorials, shows and case studies. Best practices for modern web development.'
      self.data['feed_id'] = site.config['WFAbsoluteUrl'] + site.config['WFBaseUrl'] + '/'
      self.data['feed_link'] = site.config['WFAbsoluteUrl'] + site.config['WFBaseUrl'] + '/?utm_source=feed&amp;utm_medium=feed&amp;utm_campaign=web_feed'

      # The section is used in the UTM_Campaign for tracking
      self.data['feed_section'] = 'web'
    end

  end

end
