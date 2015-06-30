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

  # This generator will find all the files in the
  # directory where all the markdown is stored
  # and create the site.data["translations"] map
  # which is used to track translations of a Page
  #
  # Define the source of the markdown by Setting
  # 'WFContentSource' in the config.yaml


  # Extract language code to name mappings.
  class LanguageNameGenerator < Generator
    priority :highest
    def generate(site)
      contentSource = site.config['WFContentSource']
      if contentSource.nil?
        Jekyll.logger.info "WFContentSource is not defined - no " +
          "translations to map"
        return
      end

      # Get the contents of _langnames.yaml
      langNamesData = YAML.load_file(site.config['WFLangNames'])

      # Make the language code and matching language name available
      # to all of the site
      site.data["language_names"] = langNamesData
      site.data["translations"] = translations(site)
    end

    # Generate translations manifest.
    def translations(site)
      # Check if langs_available key is defined, if not return no translations
      if not site.config.key? 'langs_available'
        return {}
      end

      # Get the name where the markdown files live
      # This is defined as contentFoldername in one of the
      # config yaml files.
      contentSource = site.config['WFContentSource']

      primaryLanguage = site.config['primary_lang'] || 'en'
      primaryLangFilepath = [contentSource, primaryLanguage, ''].join '/'
      primaryLangFilePattern = File.join primaryLangFilepath, '**', '*.*'

      # This maps all the files in the primary language directory
      # to any of the available translations files
      Dir.glob(primaryLangFilePattern).inject({}) { |result, fullFilepath|
        # Get the relative directory the file lives in (i.e. where in a
        # language it would live)
        relativeDirectory = File.dirname fullFilepath.sub(primaryLangFilepath, '')

        # skip underscore directories, _code and _assets
        next result if relativeDirectory =~ /^_/
        next result if relativeDirectory =~ /\/_(code|assets)/

        # Get just the filename of the file
        filename = File.basename fullFilepath
        # Get the relative directory and filename for the file
        relativePath = File.join relativeDirectory, filename

        # This method looks for the equivalent translation file for a file
        # by looping over the langs_available array from config
        result[relativePath] = site.config['langs_available'].select { |hl|
          File.exists? File.join(contentSource, hl, relativeDirectory, filename)
        }

        result
      }
    end
  end

end
