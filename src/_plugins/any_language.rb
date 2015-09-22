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

  # Extract language code to name mappings.
  class LanguageNameGenerator < Generator
    priority :highest
    def generate(site)
      data_file = File.join(site.source, "_langnames.yaml")
      data = YAML.load_file(data_file)
      site.data["language_names"] = data
      site.data["translations"] = translations(site)
    end

    # Generate translations manifest.
    def translations(site)
      return {} unless site.config.key? 'langs_available'

      lang = site.config['prime_lang'] || 'en'
      prefix = [site.source, "_langs", lang, ''].join '/'
      allfiles = File.join prefix, '**', '*.*'

      Dir.glob(allfiles).inject({}) { |trans, filepath|
        reldir = File.dirname filepath.sub(prefix, '')
        # skip underscore dirs, _code and _assets
        next trans if reldir =~ /^_/
        next trans if reldir =~ /\/_(code|assets)/

        filename = File.basename filepath
        relpath = File.join reldir, filename

        trans[relpath] = site.config['langs_available'].select { |hl|
          File.exists? File.join(site.source, "_langs", hl, reldir, filename)
        }
        trans
      }
    end
  end

  # Go through the English version of the site, and generate a page for every
  # article. If the language code is not english, then we need to check for a
  # matching file. The language code should be defined in the config.
  class LanguagePage < Page
    attr_accessor :langcode
    alias superdest destination
    def initialize(site, base, dir, name, langcode, includelang)
        @site = site
        @base = base
        @dir  = dir
        @name = name
        @langcode = langcode
        @includelang = includelang

        self.process(name)

        #Jekyll.logger.info "Reading " + File.join(base, "_langs", langcode, dir, name)
        self.read_yaml(File.join(base, "_langs", langcode, dir), name)
        langcode = langcode ? langcode : "en"
        self.data['langcode'] = langcode
        if site.data["language_names"][langcode].key?('rtl')
          self.data['rtl'] = site.data["language_names"][langcode]['rtl'];
        end
        self.data['is_localized'] = false
    end

    def relative_path
      File.join("_langs", @langcode, @dir, @name)
    end

    def destination(dest)
      original_target = Pathname.new self.superdest("")
      base = Pathname.new dest
      relative = original_target.relative_path_from base
      path = ""
      if @includelang
        path = File.join("_langs", @langcode)
      end
      path = File.join(base, path, relative)
      path
    end
  end

  class LanguageAsset < Jekyll::StaticFile
    def initialize(site, dest, path, file, langcode, includelang)
      super(site, dest, File.join("_langs", langcode, path), file)
      @newpath = includelang ? File.join("_langs", langcode, path) : path;
      @file = file
      @langcode = langcode
      @includelang = includelang
    end

    def destination(dest)
      File.join(dest, @newpath, @file)
    end
  end

  class AnyLanguage < Generator
    # We want this to run early in the process.
    priority :high
    def generate(site)
      site.config['prime_lang'] ||= 'en'
      return generate_simple(site) unless site.config.key? 'langs_available'

      lang = ENV['TRANS_LANG'] || site.config['prime_lang']
      site.data['curr_lang'] = lang
      generate_multilang(site)
    end

    # Generate pages w/o multi language support.
    def generate_simple(site)
      lang = site.config['prime_lang'] || site.config['lang'] || 'en'
      Jekyll.logger.info "Generating w/o multilang support for '#{lang}'"

      prefix = [site.source, "_langs", lang, ''].join '/'
      allfiles = File.join prefix, '**', '*.*'

      Dir.glob(allfiles) do |source_file|
        file_name = File.basename source_file
        relative_dir = File.dirname source_file.sub(prefix, '')
        create_page(site, source_file, relative_dir, file_name, lang)
      end
    end

    # Generates with multi language support for a single language specified
    # in site.data['curr_lang'].
    # site.config['prime_lang'] is still used as a primary language as the base
    # for original content.
    # Static assets are processed only when lang == prime_lang.
    def generate_multilang(site)
      lang = site.data['curr_lang']
      prime_lang = site.config['prime_lang']
      is_localization = prime_lang != lang

      Jekyll.logger.info "Generating translation in '#{lang}'"

      prefix_lang = File.join site.source, "_langs", lang
      prefix_prime = File.join site.source, "_langs", prime_lang

      # Hack to skip processing regular content
      # if we're building a translation.
      if is_localization
        site.static_files = []
        site.pages = []
      end

      # prime language pages map url => page
      site.data['primes'] = {}
      # Outer loop over each page of prime_lang and their translations
      site.data['translations'].each do |relpath, locales|
        reldir, name = File.split relpath
        prime_file = File.join(prefix_prime, relpath)
        lang_file = File.join(prefix_lang, relpath)

        prime = create_page(site, prime_file, reldir, name, prime_lang, true, !is_localization)
        next unless prime

        has_localization = locales.inject({}) { |loc, hl| loc[hl] = true; loc }
        prime.data.merge!(
          'is_localized' => !locales.empty?,
          'is_localization' => false,
          'has_localization' => has_localization)

        raise "Two pages at the same URL #{prime.url}" if site.data['primes'].key? prime.url

        site.data['primes'][prime.url] = prime
        translated_pages = [prime]

        # Inner loop over known single page translations from the manifest
        (locales || []).each do |hl|
          hl_file = File.join site.source, "_langs", hl, relpath
          page = create_page(site, hl_file, reldir, name, hl, true, hl == lang)
          page.data.merge!('is_localized' => true, 'is_localization' => true)
          translated_pages << page
        end

        # Map all the translations for a page on to each other
        translated_pages.each do |page|
          page.data["translations"] = translated_pages
        end
      end
    end

    # Creates a new LanguagePage or a LanguageAsset, and adds it to site.pages unless process is false.
    # Returns only LanguagePage instance, otherwise nil.
    def create_page(site, source_file, relative_dir, file_name, langcode, includelang = false, process = true)
      # Don't process underscore files.
      return if relative_dir =~ /^_/

      case source_file
      when /\.(markdown|html)|sitemap\.xml|feed\.xml/
        # Markdown is our main content language, create a page.
        page = LanguagePage.new(site, site.source, relative_dir, file_name, langcode, includelang)
        site.pages << page if process
        page
      when /\.(png|jpg|gif|css|mp4|webm|vtt|svg|mp3)/
        # Copy across other assets.
        asset = LanguageAsset.new(site, site.source, relative_dir, file_name, langcode, includelang)
        site.static_files << asset if process
        nil
      end
    end
  end

  module LocalizeLink
    def localize_link(input, page)
      input = input + "?hl=" + page["langcode"] || site.config['prime_lang']
      return input
    end
  end

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

 Liquid::Template.register_filter(Jekyll::LocalizeLink)
 Liquid::Template.register_filter(Jekyll::LanguageName)
 Liquid::Template.register_filter(Jekyll::LocalizeString)
