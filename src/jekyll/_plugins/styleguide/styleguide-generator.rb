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

  class StyleguideGenerator < Generator
    # We want this to run early in the process.
    priority :low
    def generate(site)
      primaryLang = site.config['primary_lang']
      if primaryLang.nil?
        Jekyll.logger.info "primary_lang is not defined in the config yaml"
        raise Exception.new("primary_lang is not defined in the config yaml")
        return
      end

      generate_layouts(site)
    end

    def generate_layouts(site)
      siteLayoutsPath = site.config['layouts'] + '/'
      siteLayoutsPattern = File.join(siteLayoutsPath, '**', '*.*')

      Dir.glob(siteLayoutsPattern).inject([]) { |result, fullFilepath|
        # Get just the filename of the file
        filename = File.basename(fullFilepath, ".*")
        relativeDirectory = File.dirname fullFilepath.sub(siteLayoutsPath, '')

        # site.pages << LayoutPage.new(site, site.data['curr_lang'], relativeDirectory, filename)
      }
    end

  end
end
