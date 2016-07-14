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


  # Create pages for Jekyll to build and handle translations
  class MainGenerator < Generator
    priority :highest
    def generate(site)
      @contentSource = site.config['WFContentSource']
      if @contentSource.nil?
        Jekyll.logger.info "WFContentSource is not defined - no " +
          "translations to map"
        return
      end

      @absoluteUrl = site.config['WFAbsoluteUrl']
      if @absoluteUrl.nil?
        Jekyll.logger.info "WFAbsoluteUrl is not defined in the config yaml"
        raise Exception.new("WFAbsoluteUrl is not defined in the config yaml")
        return
      end

      primaryLang = site.config['primary_lang']
      if primaryLang.nil?
        Jekyll.logger.info "primary_lang is not defined in the config yaml"
        raise Exception.new("primary_lang is not defined in the config yaml")
        return
      end

      @markdownExtensions = [".markdown", ".md", ".html"]

      # Load contributors
      # Because this generator is highest priority,
      # set a global variables here

      lang = ENV['TRANS_LANG'] || site.config['primary_lang']
      site.data["curr_lang"] = lang

      contributorsFilepath = File.join(site.config['WFContributors'])
      contributesData = YAML.load_file(contributorsFilepath)
      contributesData = contributesData.each { |contributerKey, contributorObj|
        # Check if contributor description exists and if so that it has en
        # translation
        if not contributorObj['description'].nil?
          if (not contributorObj['description'].is_a?(Hash)) or (not contributorObj['description'].has_key?(site.config['primary_lang']))
            puts ''
            puts '---------------------------------------------------------------'
            puts ''
            puts "Found invalid author description for '" + contributerKey + "' in " + contributorsFilepath
            puts 'Please ensure this authors description has an ' + site.config['primary_lang'] + ' translation in the contributors.yaml'
            puts ''
            puts '---------------------------------------------------------------'
            puts ''
            Jekyll.logger.error "Error: Invalid author description '" + contributerKey + "' found in " + contributorsFilepath + ". Please ensure there is a translated description for '" + site.config['primary_lang'] + "'"
            puts ''
            puts '---------------------------------------------------------------'
            puts ''

            raise "Invalid author description for '" + contributerKey + "' in YAML in " + contributorsFilepath
          end
        end

        if File.exist?(site.config['WFStaticSource'] + '/imgs/contributors/' + contributerKey + '.jpg')
          contributorObj['imgUrl'] = site.config['WFAbsoluteUrl'] + site.config['WFBaseUrl'] + '/imgs/contributors/' + contributerKey + '.jpg'
        else
          contributorObj['imgUrl'] = site.config['WFAbsoluteUrl'] + site.config['WFBaseUrl'] + '/imgs/contributors/' + 'no-photo.jpg'
        end
      }
      site.data["contributors"] = contributesData

      # Get the contents of _langnames.yaml
      langNamesData = YAML.load_file(site.config['WFLangNames'])

      # Make the language code and matching language name available
      # to all of the site
      site.data["language_names"] = langNamesData
      site.data["primes"] = translations(site)
    end

    # Generate translations manifest.
    def translations(site)
      # Check if langs_available key is defined, if not return no translations
      if not site.config.key? 'langs_available'
        return {}
      end

      primaryLanguage = site.config['primary_lang'] || 'en'
      rootFilepath = [@contentSource, primaryLanguage, ''].join '/'
      filePatternPath = rootFilepath
      buildRelativeDir = '.'
      parentTree = nil
      pagesTree = {"id" => "root", "pages" => [], "subdirectories" => []}
      site.data['_context'] = pagesTree;

      if not ENV['WFSection'].nil?
        filePatternPath = File.join rootFilepath, ENV['WFSection']
        buildRelativeDir = ENV['WFSection']

        newDirectory = {
          "id" => ENV['WFSection'],
          "pages" => [],
          "subdirectories" => []
        }
        pagesTree['subdirectories'] << newDirectory

        parentTree = pagesTree
        pagesTree = newDirectory
      end
      primaryLangFilePattern = File.join filePatternPath, '**', '*.*'

      # Get files in directory
      fileEntries = Dir.entries( filePatternPath )
      site.data['primes'] = []
      allPages = []

      handleFileEntries(allPages, parentTree, pagesTree, site, rootFilepath, buildRelativeDir, fileEntries)

      allPages
    end

    def handleFileEntries(allPages, treeParent, pagesTrees, site, rootPath, relativePath, fileEntries)
      fileEntries.each { |fileEntry|
        if File.directory?(File.join(rootPath, relativePath, fileEntry))
          # We are dealing with a directory
          if fileEntry =~ /^_/
            next
          end
          if fileEntry =~ /\/_(code|assets)/
            next
          end
          if fileEntry == "." || fileEntry == ".."
            next
          end
          # Check if the directory has moved to the DevSite templates
          if fileEntry =~ /(showcase)/
            Jekyll.logger.info "Skipping /#{fileEntry}, moved to DevSite templates."
            next
          end
          newDirectory = {
            "id" => fileEntry,
            "pages" => [],
            "subdirectories" => []
          }
          pagesTrees['subdirectories'] << newDirectory

          if relativePath == '.'
            nextRelativePath = fileEntry
          else
            nextRelativePath= File.join(relativePath, fileEntry)
          end
          handleFileEntries(
            allPages,
            pagesTrees,
            newDirectory,
            site,
            rootPath,
            nextRelativePath,
            Dir.entries( File.join(rootPath, nextRelativePath) )
            )
        else
          # We are dealing with a file
          # If the file is a markdown file, it's a Jekyll Page
          if (@markdownExtensions.include? File.extname(fileEntry)) ||
            (fileEntry == 'sitemap.xml') || (fileEntry == 'feed.xml')

            page = createPage(
                site,
                relativePath,
                fileEntry,
                'en',
                false)

            page.data['_context'] = pagesTrees

            # Check if there are any translations available
            availableLanguages = site.config['langs_available']
            if not ENV['WFLang'].nil?
              availableLanguages = [ENV['WFLang']]
            end
            supportedTranslations = availableLanguages.select { |languageId|
              isPrimaryLang = false
              if languageId == site.config['primary_lang']
                isPrimaryLang = true
              end
              (!isPrimaryLang) && (File.exists? File.join(@contentSource, languageId, relativePath, fileEntry))
            }

            page.data['is_localized'] = supportedTranslations.count > 0

            translated_pages = {'en' => page}
            supportedTranslations.each do |languageId|
              translationFilePath = File.join @contentSource, languageId, relativePath

              translationPage = createPage(
                site,
                relativePath,
                fileEntry,
                languageId,
                true)

              translationPage.data.merge!('is_localized' => true, 'is_localization' => true)

              translationPage.data['_context'] = pagesTrees
              translationPage.data['translations'] = translated_pages

              translated_pages[languageId] = translationPage
              site.pages << translationPage
            end

            page.data["translations"] = translated_pages

            # If published is false, don't include it in the pagesTree
            if (@markdownExtensions.include? File.extname(fileEntry))
              # If it's a markdown file, add to the page tree
              #if !(page['published'] == false)
                if page.name.start_with? ('index')
                  pagesTrees['index'] = page
                else
                  pagesTrees['pages'] << page
                end
              #end
            end

            allPages << page
            site.pages << page
          else
            createAsset(site,
              relativePath,
              fileEntry,
              'en',
              false)
          end
        end
      }

      if pagesTrees['pages'].length == 0 &&
        pagesTrees['subdirectories'].length == 0 &&
        pagesTrees['index'].nil?
        treeParent['subdirectories'].delete(pagesTrees)
      end

    end

    # Creates a new Page which must be a class that inherits from WFPage
    def createPage(site, relative_dir, file_name, langcode, process = true)
      # Don't process underscore files.
      if relative_dir =~ /^_/
        return nil
      end

      directories = relative_dir.split(File::SEPARATOR)
      rootFolderName = directories[0]

      page = nil
      case rootFolderName
      when 'updates'
        page = UpdatePostPage.new(site, relative_dir, file_name, langcode)
      when 'fundamentals'
        page = FundamentalsPage.new(site, relative_dir, file_name, langcode)
      when 'shows'
        page = ShowsPage.new(site, relative_dir, file_name, langcode)
      when 'tools'
        page = ToolsPage.new(site, relative_dir, file_name, langcode)
      when 'styleguide'
        page = LanguagePage.new(site, relative_dir, file_name, langcode)
      when '.'
        page = LandingPage.new(site, relative_dir, file_name, langcode)
      when 'resources'
        page = LanguagePage.new(site, relative_dir, file_name, langcode)
      else
        Jekyll.logger.info "Unsure what Page to use for markdown files in the \"" +
          rootFolderName + "\" directory."
        raise Exception.new("main-generator.rb: Unsure what Page to use for markdown files in the \"" +
          rootFolderName + "\" directory.")
      end

      return page
    end

    # Creates a new Asset
    def createAsset(site, relative_dir, file_name, langcode, process = true)
      # Don't process underscore files.
      if relative_dir =~ /^_/
        return nil
      end

      # Copy across other assets.
      asset = LanguageAsset.new(site, relative_dir, file_name, langcode)
      site.static_files << asset

      return nil
    end
  end

end
