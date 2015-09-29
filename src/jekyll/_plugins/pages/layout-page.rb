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

  class LayoutPage < LanguagePage

    def initialize(site, langcode, relativeDirectory, filename)
      super(site, File.join(site.config['WFStyleguideLocation'], relativeDirectory), filename + '.html', langcode)

      # This will read the liquid file and asign the page the appropriate content
      self.read_yaml(site.config['layouts'], File.join(relativeDirectory, filename + '.liquid'))
    end

  end

end
