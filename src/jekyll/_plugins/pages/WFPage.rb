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

  require 'sanitize'

  class WFPage < Page

    DEFAULT_HEAD_TITLE = 'Web - Google Developers'
    DEFAULT_HEAD_DESCRIPTION = 'Google Developers - Web Fundamentals';

    alias superdest destination
    alias superpath path

    attr_reader :raw_canonical_url, :canonical_url, :relative_url,
      :directories, :context, :nextPage, :previousPage, :outOfDate

    def initialize(site, relativeDir, filename, addtionalYamlKeys=[])
      @contentSource = site.config['WFContentSource']

      self.data = self.data ? self.data : {}

      # IMPORTANT
      # Be careful when altering the names of these
      # class variables. Jekyll may be relying on the
      # variable for other things.
      @site = site
      @base = File.join Dir.pwd, site.config['WFContentSource']
      @dir  = relativeDir
      @name = filename
      @directories = relativeDir.split(File::SEPARATOR)
      @addtionalYamlKeys = addtionalYamlKeys
      @defaultValidKeys = [
        'layout', 'title', 'description', 'order', 'translation_priority',
        'authors', 'translators', 'comments', 'published_on', 'updated_on',
        'published', 'rss', 'comments', 'key-takeaways', 'notes',
        'related-guides', 'html_head_social_img', 'feedName', 'feedURL',
        'pageGroups'
      ]

      # This is a Jekyll::Page method (See: http://www.rubydoc.info/github/mojombo/jekyll/Jekyll/Page#process-instance_method)
      self.process(filename)

      # Read the yaml from the markdown file if it exists
      # Do this first as it overides the data variable
      fullFilePath = File.join(@base, @langcode, @dir);
      if File.exist?(File.join(fullFilePath, @name))
        self.read_yaml(fullFilePath, @name)
      end

      # Check that all the keys in the YAML data is valid
      validateYamlData()

      if self.data['html_head_title'].nil?
        # There is no html_head_title defined in the YAML
        if self.data['title'].nil?
          self.data['html_head_title'] = self.class::DEFAULT_HEAD_TITLE
        else
          self.data['html_head_title'] = self.data['title'] +
            ' | ' + self.class::DEFAULT_HEAD_TITLE
        end
      end

      if self.data['html_head_description'].nil?
        # There is no html_head_description defined in the YAML
        if self.data['description'].nil?
          self.data['html_head_description'] = self.class::DEFAULT_HEAD_DESCRIPTION
        else
          self.data['html_head_description'] = self.data['description']
        end
      end

      if self.data['html_head_social_img'].nil?
        self.data['html_head_social_img'] =  site.config['WFBaseUrl'] + '/imgs/logo.png'
      end

      # Default we expect to be overriden
      self.data['html_css_file'] = site.config['WFBaseUrl'] + '/styles/fundamentals.css';

      self.data['strippedDescription'] = Sanitize.fragment(self.data['description'])
      self.data['theme_color'] = '#CFD8DC'
      self.data['translations'] = {}

      # The root of /web/ has an rss feed, this if accounts for that
      self.data['feed_name'] = 'Web - Google Developers'
      if @directories.count > 0
        self.data['rss_feed_url'] = File.join(site.config['WFBaseUrl'], @directories[0], 'rss.xml')
        self.data['atom_feed_url'] = File.join(site.config['WFBaseUrl'], @directories[0], 'atom.xml')
      else
        self.data['rss_feed_url'] = File.join(site.config['WFBaseUrl'], 'rss.xml')
        self.data['atom_feed_url'] = File.join(site.config['WFBaseUrl'], 'atom.xml')
      end

    end

    # This is called when the main generator has finished creating pages
    def onBuildComplete()
      autogenerateBetterBook()
    end

    # This method checks for any invalid or disallowed fields in the
    # YAML of a file
    def validateYamlData()
      # If this is a translation, we need to remove fields copied over from
      # english yaml during the jekyll generation
      if @langcode != site.config['primary_lang']
        primaryLangOnlyKeys = [
          'order',
          'layout',
          'authors',
          'published_on'
        ]
        primaryLangOnlyKeys.each { |key|
          if @defaultValidKeys.include?(key)
            @defaultValidKeys.delete(key)
          end
        }
      end

      # Merge keys from constructor
      allowedKeys = @defaultValidKeys + @addtionalYamlKeys

      invalidKeys = []
      self.data.each do |key, value|
        if not allowedKeys.include? key
          invalidKeys << key
        end
      end

      if invalidKeys.length > 0
          handleInvalidKeys(invalidKeys)
      end

      if (not self.data['authors'].nil?) and (self.data['authors'].length > 0)
        self.data['authors'].each { |authorKey|
          if site.data['contributors'][authorKey].nil?
            puts ''
            puts '---------------------------------------------------------------'
            puts ''
            puts "Found invalid author '" + authorKey + "' in " + @langcode + '/' + self.relative_path
            puts 'Please ensure this author is in the contributors.yaml'
            puts ''
            puts '---------------------------------------------------------------'
            puts ''
            Jekyll.logger.error "Error: Invalid Author '" + authorKey + "' found in  " + @langcode + '/' + self.relative_path + ". Please ensure this author is added to src/content/_contributors.yaml."
            puts ''
            puts '---------------------------------------------------------------'
            puts ''

            raise "Invalid author '" + authorKey + "' in YAML in " + @langcode + '/' + self.relative_path
          end
        }
      end
      
      if (not self.data['translators'].nil?) and (self.data['translators'].length > 0)
        self.data['translators'].each { |translatorKey|
          if site.data['contributors'][translatorKey].nil?
            puts ''
            puts '---------------------------------------------------------------'
            puts ''
            puts "Found invalid translator '" + translatorKey + "' in " + @langcode + '/' + self.relative_path
            puts 'Please ensure this translator is in the contributors.yaml'
            puts ''
            puts '---------------------------------------------------------------'
            puts ''
            Jekyll.logger.error "Error: Invalid Translator '" + translatorKey + "' found in  " + @langcode + '/' + self.relative_path + ". Please ensure this translator is added to src/content/_contributors.yaml."
            puts ''
            puts '---------------------------------------------------------------'
            puts ''

            raise "Invalid translator '" + translatorKey + "' in YAML in " + @langcode + '/' + self.relative_path
          end
        }
      end
    end

    # TODO: Change to throwing an error when we get closer to release
    def handleInvalidKeys(invalidKeys)
      invalidKeysString = ''
      invalidKeys.each { |key|
        invalidKeysString += key + ', '
      }

      puts ''
      puts '---------------------------------------------------------------'
      puts ''
      puts "Found " + invalidKeys.length.to_s + " invalid keys in " + @langcode + '/' + self.relative_path
      puts 'Invalid keys: ' + invalidKeysString
      puts ''
      puts '---------------------------------------------------------------'
      puts ''
      Jekyll.logger.error "Error: Invalid Keys found in  " + @langcode + '/' + self.relative_path
      puts ''
      puts '---------------------------------------------------------------'
      puts ''

      raise "Invalid keys in YAML in " + @langcode + '/' + self.relative_path
    end

    # Force generation is used when you are in a section that isn't published
    # i.e. styleguide shouldn't be in the menu for fundamentals, but if you
    # are on /web/styleguide/ the menu should have styleguide at the top level
    def getBetterBookEntry(section, currentLevel, forceGeneration = false, isSelected = false)
      if section.nil?
        return nil
      end

      if section['index'].nil?
        return nil
      end

      indexPage = getAppropriatePage(section['index'])
      if (!forceGeneration) && (indexPage['published'] == false)
        return nil
      end

      entry = {
        "title" => indexPage['title'],
        "path" => indexPage.relative_url,
        "currentPageInThisSection" => false,
        "isSelected" => isSelected
      }

      if (@directories.size > currentLevel) && (section['id'] == @directories[currentLevel])
        if (currentLevel + 1 == @directories.size)
          entry['currentPageInThisSection'] = true;
        end
        entry['section'] = getBetterBookSections(section, (currentLevel + 1))
        entry['hasSubNav'] = entry['section'].size > 0
      end

      entry
    end

    def getBetterBookSections(currentSection, currentLevel)
      sections = []

      # Iterate over each sub section
      currentSection['subdirectories'].each { |subdirectory|
        # Subdirectory entry
        entry = getBetterBookEntry(subdirectory, currentLevel)
        if entry.nil?
          next
        end

        sections << entry
      }

      sections
    end

    # Generate the better book used for menus
    def autogenerateBetterBook()
      context = self.data['_context']
      if context.nil?
        msg = 'self.data[\'_context\'] is nil in (' + relative_path + ')'
        raise Exception.new("Unable to generate better book: " + msg);
        return
      end

      currentLevel = 0;
      rootSection = nil;
      otherSections = []
      topLevelEntries = []

      # Pick out this pages rootSection and split out other sections
      site.data['_context']['subdirectories'].each { |subdirectory|
        if subdirectory['index'].nil?
          next
        end

        # We force generation here since if you in a top level section
        # we want the nav to be generated for that page, regardless of whether
        # it's normally displayed or not
        force = false
        isSelected = false
        if subdirectory['id'] == @directories[currentLevel]
          isSelected = true
          if @directories.count > 0
            force = true
          end
        end
        entry = getBetterBookEntry(subdirectory, currentLevel, force, isSelected)
        if entry.nil?
          next
        end

        topLevelEntries << entry
      }

      self.data['contentnav'] = { "toc" => topLevelEntries }

      #if @directories[currentLevel] == 'updates'
      #  puts "HERE"
      #  puts self.data['contentnav']
      #end
    end

    # This method will try and find the translated version of a page
    # If the translation isn't available, it'll return the english version
    def getAppropriatePage(page)
      if page.nil?
        return nil
      end

      bestPage = page
      if page.langcode != @langcode
        page.data['translations'].each { |langcode, translationPage|
          if translationPage.langcode == @langcode
            bestPage = translationPage
            break
          end
        }
      end

      bestPage
    end

    # This is overridden since Jekyll enforces content
    # to live inside the jekyll directory - we are living
    # outside of it.
    # View source for origin method here:
    # http://www.rubydoc.info/github/mojombo/jekyll/master/Jekyll/Convertible#read_yaml-instance_method
    def read_yaml(base, name, opts = {})
      begin
        self.content = File.read(File.join(base, name),
                             merged_file_read_opts(opts))
        if content =~ /\A(---\s*\n.*?\n?)^((---|\.\.\.)\s*$\n?)/m
          self.content = $POSTMATCH
          self.data = SafeYAML.load($1)
        end
      rescue SyntaxError => e
        Jekyll.logger.warn "YAML Exception reading #{File.join(base, name)}: #{e.message}"
      rescue Exception => e
        Jekyll.logger.warn "Error reading file #{File.join(base, name)}: #{e.message}"
      end

      self.data ||= {}
    end

    # This is a method from the Jekyll::Page class
    # http://www.rubydoc.info/github/mojombo/jekyll/master/Jekyll/Page
    def relative_path
      relativePath = File.join(@dir, @name)
      relativePath
    end

    # This is a method from the Jekyll::Page class
    # http://www.rubydoc.info/github/mojombo/jekyll/master/Jekyll/Page
    # This points the destation to a nested language if appropriate
    def destination(dest)
      original_target = Pathname.new self.superdest("")
      base = Pathname.new dest
      relativePath = original_target.relative_path_from base
      path = File.join(base, @langcode, relativePath)

      path
    end

    def path
      path = File.join(site.config['WFContentSource'], @langcode, @dir, @name)
      if !File.exist?(path)
        return nil
      end
      path
    end

    def getJekyllsRelativeUrl()
      self.url
    end

    # getFilteredUrl() returns a pages URL without the the index.html or html
    # which isn't needed. No lang code returned.
    #
    # Output Example: /web/section/example
    def getFilteredUrl()
      fullUrl = site.config['WFBaseUrl'] + getJekyllsRelativeUrl()
      fullUrl = fullUrl.sub('index.html', '')
      fullUrl = fullUrl.sub('.html', '')

      fullUrl
    end

    # WARNING: This is intended for use in the head of the document only
    # it doesn't include the hl
    #
    # Output Example: https://developers.google.com/web/section/example
    def raw_canonical_url
      site.config['WFAbsoluteUrl'] + getFilteredUrl()
    end

    # WARNING: This should be used with caution. It will force the user to
    # visit the english version regardless of the available translations
    #
    # Output Example: https://developers.google.com/web/section/example?hl=en
    def primary_lang_canonical_url
      fullUrl = raw_canonical_url() + "?hl=" + site.config['primary_lang']
      fullUrl
    end

    # The canonical_url can be used to reference a pages absolute url with the
    # appropriate lang code
    #
    # Output Example: https://developers.google.com/web/section/example?hl=<lang>
    def canonical_url
      fullUrl = raw_canonical_url() + "?hl=" + @langcode || site.config['primary_lang']
      fullUrl
    end

    # The relative_url can be used to reference a pages relative url with the
    # appropriate lang code
    #
    # Output Example: /web/section/example?hl=<lang>
    def relative_url
      relativeUrl = getFilteredUrl() + "?hl=" + @langcode || site.config['primary_lang']
      relativeUrl
    end

    def context
      if self.data['_context'].nil?
        return
      end

      langSpecificContenxt = generateValidVersion(self.data['_context'])
      langSpecificContenxt
    end

    def generateValidPages(pages)
      returnedPages = []
      pages.each { |page|
        bestPage = getAppropriatePage(page)
        if(page.data['published'] != false)
          returnedPages << bestPage
        end
      }
      return returnedPages
    end

    def generateValidSubdirectories(subdirectories)
      validSubdirectories = []
      subdirectories.each { |subdirectory|
        validSubdirectories << generateValidVersion(subdirectory)
      }
      return validSubdirectories
    end

    def generateValidVersion(sectionObj)
      validObj = {
        "id" => sectionObj['id'],
        "index" => nil,
        "pages" => [],
        "subdirectories" => []
      }

      validObj['index'] = getAppropriatePage(sectionObj['index'])
      validObj['pages'] = generateValidPages(sectionObj['pages'])
      validObj['subdirectories'] = generateValidSubdirectories(sectionObj['subdirectories'])
      return validObj
    end

    def nextPage
      getAppropriatePage(self.data['_nextPage'])
    end

    def previousPage
      getAppropriatePage(self.data['_previousPage'])
    end

    def outOfDate
      if self.langcode == site.config['primary_lang']
        # The primary lang should never be out of date
        return false
      end

      if (self.data['translations'][site.config['primary_lang']].data['updated_on'].nil?) || (self.data['updated_on'].nil?)
        if not ((self.data['translations'][site.config['primary_lang']].data['updated_on'].nil?) && (self.data['updated_on'].nil?))
          raise Exception.new("A translation file has an updated_on while the primary language version doesn't have an updated_on field. Please add one.")
        end
        return false
      end

      if self.data['updated_on'] < self.data['translations'][site.config['primary_lang']].data['updated_on']
        return true
      end

      return false
    end

    # Convert this post into a Hash for use in Liquid templates.
  #
  # Returns <Hash>
  def to_liquid(attrs = ATTRIBUTES_FOR_LIQUID)
    super(attrs + %w[ raw_canonical_url ] + %w[ canonical_url ] +
      %w[ relative_url ] + %w[ primary_lang_canonical_url ] +
      %w[ context ] + %w[ nextPage ] +
      %w[ previousPage ] + %w[ outOfDate ])
  end
  end
end
