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

  require File.expand_path('../WFPage.rb', __FILE__)

  # Go through the English version of the site, and generate a page for every
  # article. If the language code is not english, then we need to check for a
  # matching file. The language code should be defined in the config.
  class LanguagePage < WFPage
    attr_accessor :langcode

    def initialize(site, relativeDir, filename, langcode, validKeys=[])
      @langcode = langcode ? langcode : "en"
      # This allows WFPage to perform any required work
      super(site, relativeDir, filename, validKeys)

      # TODO mattgaunt is this needed since it's a member variable?
      self.data['langcode'] = @langcode

      # Give the page data so it knows the text direction
      self.data['rtl'] = false
      if site.data["language_names"][@langcode].key?('rtl')
        self.data['rtl'] = site.data["language_names"][@langcode]['rtl'];
      end

      # TODO mattgaunt is this is alway false - why have it?
      self.data['is_localized'] = false
    end
  end

end
