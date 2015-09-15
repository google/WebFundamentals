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

  module LocalizeString
    def localize_string(input)

      # Get the page, so we determine which language we're in
      page = @context.registers[:page]

      # Get the site, so we can access the language packs
      site = @context.registers[:site]

      en_strings = site.data["localized_strings"]["en"]
      lo_strings = site.data["localized_strings"][page["langcode"]]

      # Get the language pack for the current language, or if that pack
      # doesn't exist, fallback to the English pack.
      lang_pack = lo_strings ? lo_strings : en_strings

      # Get the localized string in specified language, if it doesn't exist
      # get the english version of the string, if that doesn't exist, return
      # UNKNOWN, then abort the build with a big bad warning.
      result = lang_pack[input] ? lang_pack[input] : en_strings[input]
      result = result ? result : "UNKNOWN"
      if result == "UNKNOWN"
        Jekyll.logger.abort_with "Could not find localized string for: " + input
      end

      return result
    end
  end

  module LanguageName
    def lang_name(input)
      site = @context.registers[:site]
      site.data["language_names"][input]['name']
    end
  end
end

 Liquid::Template.register_filter(Jekyll::LanguageName)
 Liquid::Template.register_filter(Jekyll::LocalizeString)
