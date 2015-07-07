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

  class MainGenerator < Generator
    # We want this to run early in the process.
    priority :high
    def generate(site)
      @contentSource = site.config['WFContentSource']
      if @contentSource.nil?
        Jekyll.logger.info "WFContentSource is not defined in the config yaml"
        raise Exception.new("WFContentSource is not defined in the config yaml")
        return
      end

      @absoluteUrl = site.config['WFAbsoluteUrl']
      if @absoluteUrl.nil?
        Jekyll.logger.info "WFAbsoluteUrl is not defined in the config yaml"
        raise Exception.new("WFAbsoluteUrl is not defined in the config yaml")
        return
      end

      # Because AnyLanuage is priority high and we are
      # setting a global variable - set it here
      contributorsFilepath = File.join(site.config['WFContributors'])
      contributesData = YAML.load_file(contributorsFilepath)
      site.data["contributors"] = contributesData

      site.config['primary_lang'] ||= 'en'

      lang = ENV['TRANS_LANG'] || site.config['primary_lang']
      site.data['curr_lang'] = lang
      generate_multilang(site)
    end

    # Generates with multi language support for a single language specified
    # in site.data['curr_lang'].
    # site.config['primary_lang'] is still used as a primary language as the base
    # for original content.
    # Static assets are processed only when lang == primary_lang.
    def generate_multilang(site)
      currentLang = site.data['curr_lang']
      primary_lang = site.config['primary_lang']
      is_localization = primary_lang != currentLang

      # Hack to skip processing regular content
      # if we're building a translation.
      if is_localization
        site.static_files = []
        site.pages = []
      end

      Jekyll.logger.info "Generating translation in '#{currentLang}'"

      #currentLangDirectory = File.join site.source, contentFilename, currentLang
      #primaryLangDirectory = File.join @contentSource, primary_lang

      # primary language pages map url => page
      site.data['primes'] = {}

      # Outer loop over each page of primary_lang and their translations
      site.data['translations'].each do |relativeFilePath, supportedLocales|
        relativeDirectory, filename = File.split relativeFilePath
        # This seems a little weird - why are we using the primary language only
        # currentLangFilePath = File.join(currentLangDirectory, relativeFilePath)
        # primaryLangFilePath = File.join(primaryLangDirectory, relativeFilePath)

        primaryLangPage = create_page(
          site,
          relativeDirectory,
          filename,
          primary_lang,
          !is_localization)

        # Skip if the page was generated
        if not primaryLangPage
          next
        end

        begin
          # This checks the requested language key with true if it's supported
          # for this file
          # TODO mattgaunt - is this actually used anywhere?
          has_localization = supportedLocales.inject({}) { |loc, hl|
            loc[hl] = true
            loc
          }
          primaryLangPage.data.merge!(
            'is_localized' => !supportedLocales.empty?,
            'is_localization' => false,
            'has_localization' => has_localization)

          if site.data['primes'].key?(primaryLangPage.url)
            raise "Two pages at the same URL #{primaryLangPage.url}"
          end

          site.data['primes'][primaryLangPage.url] = primaryLangPage
          translated_pages = [primaryLangPage]

          # Inner loop over known single page translations from the manifest
          (supportedLocales || []).each do |hl|
            hl_file = File.join site.source, contentFilename, hl, relativeFilePath
            page = create_page(site, hl_file, relativeDirectory, filename, hl, hl == lang)
            page.data.merge!('is_localized' => true, 'is_localization' => true)
            translated_pages << page
          end

          # Map all the translations for a page on to each other
          translated_pages.each do |page|
            page.data["translations"] = translated_pages
          end
        #rescue StandardError => error
        #  fullPath = File.join(
        #    pathToContent,
        #    primary_lang,
        #    relativeDirectory,
        #    filename)
        #  Jekyll.logger.warn "Unable to generate page for " + fullPath
        #  Jekyll.logger.warn "Is the YAML for the file valid?"
        #  Jekyll.logger.warn error
        end
      end
    end

    # Creates a new LanguagePage or a LanguageAsset, and adds it to site.pages
    # unless process is false.
    # Returns only LanguagePage instance, otherwise nil.
    def create_page(site, relative_dir, file_name, langcode, process = true)
      # Don't process underscore files.
      if relative_dir =~ /^_/
        return nil
      end

      case file_name
      when /\.(markdown|md|html)|sitemap\.xml|feed\.xml/
        rootFolderName = relative_dir.split(File::SEPARATOR)[0]

        page = nil
        case rootFolderName
        when 'updates'
          page = UpdatePage.new(site, relative_dir, file_name, langcode)
        when '.'
          puts relative_dir
          puts file_name
          puts '-----------------------'
          page = LanguagePage.new(site, relative_dir, file_name, langcode)
        else
          Jekyll.logger.info "Unsure what Page to use for markdown files in the \"" +
            rootFolderName + "\" directory."
          raise Exception.new("Unsure what Page to use for markdown files in the \"" +
            rootFolderName + "\" directory.")
        end

        if process
          site.pages << page
        end
        page
      when /\.(png|jpg|gif|css|mp4|webm|vtt|svg)/
        # Copy across other assets.
        asset = LanguageAsset.new(site, relative_dir, file_name, langcode)
        site.static_files << asset if process
        nil
      end
    end
  end

end
