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
        
        #Jekyll.logger.info "Reading " + File.join(base, "_" + langcode, dir, name)
        self.read_yaml(File.join(base, "_" + langcode, dir), name)
        self.data['langcode'] = langcode ? langcode : "en"
    end

    def relative_path
      File.join("_" + @langcode, @dir, @name)
    end

    def destination(dest)
      path = self.superdest("")
      if @includelang        
        path = File.join("_langs", @langcode, path)
      end
      path = File.join(dest, path)
    end
  end

  class LanguageAsset < Jekyll::StaticFile
    def initialize(site, dest, path, file, langcode, includelang)
      super(site, dest, File.join("_" + langcode, path), file)
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
    def generate(site)
      lang = site.config["lang"]
      lang = lang ? lang : "en"
      Jekyll.logger.info "Generating For Lang " + lang
      if site.config.has_key?("langs_available")
        generate_all_langs(site)
      else
        generate_one_lang(site, lang)
      end
    end

    def generate_one_lang(site, lang)
      Dir.glob(site.source + "/_en/**/*.*") do |source_file| 
        file_name = File.basename(source_file);
        relative_dir = File.dirname(source_file.sub(site.source + "/_en/", ""));
        langcode = lang
        # If the file doesn't exist in the translated language, back off to "en".
        if langcode != "en" && !File.exists?(File.join(site.source, "_" + langcode, relative_dir, file_name))
          langcode = "en"
        end
        create_page(site, source_file, relative_dir, file_name, langcode)
      end
    end

    def generate_all_langs(site)
      lang_code_list = site.config["langs_available"];
      Dir.glob(site.source + "/_en/**/*.*") do |source_file| 
        # Go through English language version and generate 
        file_name = File.basename(source_file);
        relative_dir = File.dirname(source_file.sub(site.source + "/_en/", ""));
        root_page = create_page(site, source_file, relative_dir, file_name, "en", true)
        translated_page_list = []
        if root_page != nil
          root_page.data['is_localized'] = false
          translated_page_list << root_page
        end

        # For any file, generate the localised variant if available.
        lang_code_list.each do |langcode|
          #Jekyll.logger.info "Logging code " + File.join(site.source, "_" + langcode, relative_dir, file_name)
          if File.exists?(File.join(site.source, "_" + langcode, relative_dir, file_name))
            
            #Jekyll.logger.info "Logging file " + file_name
            page = create_page(site, source_file, relative_dir, file_name, langcode, true)
            # If we know we have a page add it to a list of translations
            if page != nil
              if root_page != nil
                root_page.data['is_localized'] = true
              end
              translated_page_list << page
            end
          end
        end
        # Map all the translations for a page on to each other
        translated_page_list.each do |translated_page|
          translated_page.data["translations"] = translated_page_list
        end
      end
    end

    def create_page(site, source_file, relative_dir, file_name, langcode, includelang=false)
      if relative_dir =~ /_.*/ 
        # Don't process underscore files.
      elsif source_file =~ /\.(markdown|html)|sitemap\.xml/ 
        # Markdown is our main content language, create a page.
        page = LanguagePage.new(site, site.source, relative_dir, file_name, langcode, includelang)
        site.pages << page
        return page
      elsif source_file =~ /\.(png|jpg|gif|css|mp4|webm|vtt|svg)/
        # Copy across other assets.
        #Jekyll.logger.info relative_dir + " vs " + File.join(langcode, relative_dir)
        site.static_files << LanguageAsset.new(
          site,
          site.source,
          relative_dir,
          file_name,
          langcode,
          includelang) 
      end

      return nil
    end
  end
  
end