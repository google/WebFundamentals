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

  class UpdatesFeedPage < WFFeedPage

    def initialize(site, dir, langcode, pages, feedType)
      super(site, dir, langcode, pages, feedType)

      self.data['feed_title'] = 'Web Updates - Google Developers'
      self.data['feed_description'] = 'The latest and freshest updates from the Web teams at Google. Chrome, Tooling and more.'
      self.data['feed_id'] = site.config['WFAbsoluteUrl'] + site.config['WFBaseUrl'] + '/updates'
      self.data['feed_link'] = site.config['WFAbsoluteUrl'] + site.config['WFBaseUrl'] + '/updates/?utm_source=feed&amp;utm_medium=feed&amp;utm_campaign=updates_feed'

      # The section is used in the UTM_Campaign for tracking
      self.data['feed_section'] = 'updates'
    end
  end

end
