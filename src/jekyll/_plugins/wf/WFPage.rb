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

    attr_reader :canonical_url

    def initialize(site, relativeDir, filename)
      @contentSource = site.config['WFContentSource']
      if @contentSource.nil?
        Jekyll.logger.info "WFContentSource is not defined in the config yaml"
        raise Exception.new("WFContentSource is not defined in the config yaml")
        return
      end

      self.data = self.data ? self.data : {}

      # IMPORTANT
      # Be careful when altering the names of these
      # class variables. Jekyll may be relying on the
      # variable for other things.
      @site = site
      @base = File.join Dir.pwd, site.config['WFContentSource']
      @dir  = relativeDir
      @name = filename

      self.process(filename)

      # Read the yaml from the markdown file if it exists
      # Do this first as it overides the data variable
      fullFilePath = File.join(@base, @langcode, @dir);
      if File.exist?(File.join(fullFilePath, @name))
        self.read_yaml(fullFilePath, @name)
      end

      # This is the default better book
      loadBetterBook('rootnav', '_betterbook-root.yaml')

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

      # Assign Main Author
      self.data['main_author'] = getMainAuthor()
    end

    def loadBetterBook(betterBookDataName, betterBookFilename)
      if betterBookFilename.nil?
        return
      end

      # site.source is the source directory being used by Jekyll
      # File.join gives us a full path to the yaml file
      yamlFilePath = File.join(@contentSource,
        site.config['primary_lang'], betterBookFilename)
      yamlData = YAML.load_file(yamlFilePath)

      # Check if there is a language specific version, and load that.
      if @langcode && @langcode != "en"
        lang_file = File.join(@contentSource, @langcode, betterBookFilename)
        if File.exists?(lang_file)
          lang_book = YAML.load_file(lang_file)
          merge(yamlData["toc"], get_path_titles(lang_book["toc"]))
        end
      end

      # Remove any items we aren't going to display
      yamlData['toc'].delete_if do |tocItem|
        if tocItem['in_header'] == false
          # Returning true removes element from toc
          true
        end
      end

      yamlData['toc'] = yamlData['toc'].each { |tocItem|
        sanitizeTocItem(tocItem)
      }

      self.data[betterBookDataName] = yamlData
      #context.environments.first["page"][betterBookFilename] = yamlData
      nil
    end

    def get_path_titles(layer)
      path_titles = Hash.new
      layer.each_index do |key|
        if (layer[key].has_key?("path"))
          path_titles[layer[key]["path"]] = layer[key]["title"]
        end
        if layer[key]["section"]
          path_titles.merge!(get_path_titles(layer[key]["section"]))
        end
      end
      path_titles
    end

    def sanitizeTocItem(tocItem)
      tocItem['strippedTitle'] = Sanitize.fragment(tocItem['title'])
      if tocItem['external'].nil? || tocItem['external'] == false
        tocItem['isInCurrentSection'] = self.url.include? tocItem['path']
      else
        tocItem['isInCurrentSection'] = false
      end

      tocItem['path'] = site.config['WFBaseUrl'] + tocItem['path'] + '?hl=' + @langcode

      if not tocItem['section'].nil?
        tocItem['section'] = tocItem['section'].each { |subsectionItem|
          sanitizeTocItem(subsectionItem)
        }
      end
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
          puts "WFPage.rb: Defined in: " + self.name
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

    def canonical_url
      fullUrl = site.config['WFAbsoluteUrl'] + site.config['WFBaseUrl'] + @url
      fullUrl = fullUrl.sub('index.html', '')
      fullUrl = fullUrl.sub('.html', '')
      fullUrl
    end

    # Convert this post into a Hash for use in Liquid templates.
  #
  # Returns <Hash>
  def to_liquid(attrs = ATTRIBUTES_FOR_LIQUID)
    super(attrs + %w[
      canonical_url
    ])
  end
  end
end
