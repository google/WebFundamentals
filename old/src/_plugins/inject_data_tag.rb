
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
  class InjectDataTag < Liquid::Tag

    def initialize(tag_name, params, tokens)
      super
      @params = params.split(' ')
      @data_name = @params[0]
      @data_filename = @params[1]
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

    def merge(base, path_titles)
      base.each_index do |key|
        if path_titles.has_key?(base[key]["path"])
          base[key]["en_title"] = base[key]["title"]
          base[key]["title"] = path_titles[base[key]["path"]]
        end
        if base[key]["section"]
          #base[key]["section"] =
          merge(base[key]["section"], path_titles)
        end
      end
      base
    end

    def render(context)
      site = context.registers[:site]
      @data_file = File.join(site.source, @data_filename)
      data = YAML.load_file(@data_file)
      # Check if there is a language specific version, and load that.
      lang = context.environments.first["page"].has_key?('langcode') ?
          context.environments.first["page"]['langcode'] :
          site.config["lang"]
      if lang && lang != "en"
        lang_file = File.join(site.source, "_langs", lang, @data_filename)
        if File.exists?(lang_file)
          lang_book = YAML.load_file(lang_file)
          merge(data["toc"], get_path_titles(lang_book["toc"]))
        end
      end
      context.environments.first["page"][@data_name] = data
      nil
    end
  end
end

Liquid::Template.register_tag('injectdata', Jekyll::InjectDataTag)