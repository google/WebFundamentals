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

  class Template
    @@header = nil
    @@header_full = nil
    @@footer = nil

    class_variables.each do |class_var|
      name = class_var.to_s[2..-1].to_sym

      define_singleton_method name do |site|
        if class_variable_get(class_var).nil?
          content = File.read(File.join(site.source,
            "_includes/codesamples/sample_#{name}.html"))
          class_variable_set(class_var,
            Liquid::Template.parse(content).render({
              "baseurl" => site.config["sample_link_base"]}))
        end
        class_variable_get(class_var)
      end
    end
  end

  class SampleHTMLAsset < Jekyll::StaticFile
    def initialize(site, relativeDir, filename, langcode, newpath)
      # IMPORTANT
      # Be careful when altering the names of these
      # class variables. Jekyll may be relying on the
      # variable for other things.
      @site = site
      @base = File.join Dir.pwd, site.config['WFContentSource']
      # We join here since relative_path is a read only attribute on StaticFile
      # http://www.rubydoc.info/github/mojombo/jekyll/master/Jekyll/StaticFile#relative_path-instance_method
      @dir  = File.join(langcode, relativeDir)
      @name = filename
      @newpath = newpath
      @contents = contents()
    end

    def contents()
      filePath = File.join(@base, @dir, @name)
      contents = File.read(filePath).force_encoding('UTF-8')
      contents.gsub!(/<!-- \/\/ \[(?:(?:START)|(?:END)) [^\]]+\] -->\s*\n?/m, "\n")
      contents.gsub!(/\/\* \/\/ \[(?:(?:START)|(?:END)) [^\]]+\] \*\/\s*\n?/m, "\n")
      contents.gsub!(/<!-- \/\/ \[TEMPLATE ([^\]]+)\] -->\s*\n/m) { |matches|
        tag = $1.downcase
        if (tag == "header")
          Template.header(@site)
        elsif (tag == "header_full")
          Template.header(@site) + Template.header_full(@site)
        elsif (tag == "footer")
          Template.footer(@site)
        else
          ""
        end
      }
      Liquid::Template.parse(contents).render(@site.site_payload)
    end

    def destination(dest)
      File.join(dest, @newpath, @name)
    end

    def write(dest)
      if super(dest)
        if (path =~ /\.css/ || path =~ /\.js/ )
          path = destination(dest)
          file = File.new(path, "r")
          contents = file.read()
          file.close
          contents.gsub!(/\/\* \/\/ \[(?:(?:START)|(?:END)) [^\]]+\] \*\/\s*\n?/m, "\n")
          file = File.new(path, "w")
          file.write(contents)
          file.close
        end
        true
      else
        false
      end
    end
  end
end
