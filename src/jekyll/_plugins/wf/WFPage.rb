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

    alias superdest destination
    alias superpath path

    attr_reader :raw_canonical_url, :canonical_url, :relative_url,
      :directories, :context, :main_author, :nextPage, :previousPage

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
        'authors', 'translators', 'comments', 'written_on', 'updated_on',
        'published', 'rss', 'comments', 'key-takeaways', 'notes',
        'related-guides'
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

      # This could be given a better name - Used in navigation liquid
      # displayed on mobile screens
      self.data['drawerTitleText'] = self.data['title']

      self.data['html_head_title'] = 'Web - Google Developers'
      self.data['html_head_description'] = 'Google Developers - Web Fundamentals'
      self.data['html_head_social_img'] = site.config['WFBaseUrl'] + '/imgs/logo.png'
      self.data['strippedDescription'] = Sanitize.fragment(self.data['description'])
      self.data['theme_color'] = '#4285f4'
      self.data['feed_name'] = 'Web - Google Developers'
      self.data['feed_url'] = site.config['WFBaseUrl'] + '/fundamentals/feed.xml'
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
          'written_on'
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
    end

    # TODO: Change to throwing an error when we get closer to release
    def handleInvalidKeys(invalidKeys)
      puts "Found " + invalidKeys.length.to_s + " invalid keys in " + @langcode + '/' + self.relative_path

      invalidKeysString = ''
      invalidKeys.each { |key|
        invalidKeysString += key + ', '
      }

      puts 'Invalid keys: ' + invalidKeysString
      puts '---------------------------------------------------------------'
      puts ''
    end

    def getBetterBookEntry(section, currentLevel)
      entry = nil
      if (not section.nil?) && (not section['index'].nil?)
        indexPage = getAppropriatePage(section['index'])
        entry = { "title" => indexPage['title'], "path" => indexPage.relative_url}

        if (@directories.size > currentLevel) && (section['id'] == @directories[currentLevel])
          entry['section'] = getBetterBookSections(section, (currentLevel + 1))
          entry['hasSubNav'] = entry['section'].size > 0
        end
      end

      entry
    end

    def getBetterBookSections(currentSection, currentLevel)
      sections = []

      # Iterate over each sub section
      currentSection['subdirectories'].each { |subdirectory|
        # Subdirectory entry
        sections << getBetterBookEntry(subdirectory, currentLevel)
      }

      sections
    end

    # Generate the better book used for menus
    def autogenerateBetterBook()
      context = self.data['_context']
      if context.nil?
        return
      end

      currentLevel = 0;
      rootSection = nil;
      otherSections = []

      # Pick out this pages rootSection and split out other sections
      site.data['_context']['subdirectories'].each { |subdirectory|
        if subdirectory['id'] == @directories[currentLevel]
          rootSection = subdirectory
        else
          otherSections << subdirectory
        end
      }

      entry = getBetterBookEntry(rootSection, currentLevel)

      topLevelEntries = [entry]

      otherSections.each { |section|
        if section['index'].nil?
          next
        end

        topLevelEntries << getBetterBookEntry(section, currentLevel)
      }

      self.data['contentnav'] = { "toc" => topLevelEntries }
    end

    # This method will try and find the translated version of a page
    # If the translation isn't available, it'll return the english version
    def getAppropriatePage(page)
      if page.nil?
        return nil
      end

      bestPage = page
      if page.langcode != @langcode
        page.data['translations'].each { |translationPage|
          if translationPage.langcode == @langcode
            bestPage = translationPage
            break
          end
        }
      end

      bestPage
    end

    # This method just gets the first author of authors and assigns
    # them as the main author
    def getMainAuthor()
      author = {}
      if not self.data['authors'].nil?
        firstAuthor = self.data['authors'][0]
        author = site.data['contributors'][firstAuthor]

        # Check if the author is actually in the contributors list
        if author.nil?
          puts "WFPage.rb: Author '" + firstAuthor + "' isn't in the contributors list."
          puts "WFPage.rb: Defined in: " + self.relative_path
          puts ""
        else
          author['id'] = firstAuthor
          author['imgUrl'] = site.config['WFBaseUrl'] + '/imgs/contributors/' + firstAuthor + '.jpg';
        end
      end

      if defined? author['twitter']
        author['twitter'] = '@chromiumdev'
      end

      return author
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

    def getFilteredUrl()
      fullUrl = site.config['WFBaseUrl'] + self.url
      fullUrl = fullUrl.sub('index.html', '')
      fullUrl = fullUrl.sub('.html', '')

      fullUrl
    end

    # WARNING: This is intended for use in the head of the document only
    # it doesn't include the hl
    def raw_canonical_url
      site.config['WFAbsoluteUrl'] + getFilteredUrl()
    end

    def canonical_url
      if @langcode == site.config['primary_lang']
        fullUrl = raw_canonical_url()
      else
        fullUrl = raw_canonical_url() + "?hl=" + @langcode || site.config['primary_lang']
      end

      fullUrl
    end

    def relative_url
      if @langcode == site.config['primary_lang']
        relativeUrl = getFilteredUrl()
      else
        relativeUrl = getFilteredUrl() + "?hl=" + @langcode || site.config['primary_lang']
      end

      relativeUrl
    end

    def context
      if self.data['_context'].nil?
        return
      end

      langSpecificContenxt = {
        "id" => self.data['_context']['id'],
        "pages" => [],
        "subdirectories" => []
      }

      self.data['_context']['pages'].each { |page|
        langSpecificContenxt['pages'] << getAppropriatePage(page)
      }

      langSpecificContenxt['subdirectories'] = self.data['_context']['subdirectories']

      langSpecificContenxt
    end

    def main_author
      getMainAuthor()
    end

    def nextPage
      getAppropriatePage(self.data['_nextPage'])
    end

    def previousPage
      getAppropriatePage(self.data['_previousPage'])
    end

    # Convert this post into a Hash for use in Liquid templates.
  #
  # Returns <Hash>
  def to_liquid(attrs = ATTRIBUTES_FOR_LIQUID)
    super(attrs + %w[ raw_canonical_url ] + %w[ canonical_url ] +
      %w[ relative_url ] + %w[ context ] + %w[ main_author ] + %w[ nextPage ] +
      %w[ previousPage ])
  end
  end
end
