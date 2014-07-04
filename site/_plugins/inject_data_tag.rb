
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

    def render(context)
      @data_file = File.join(context.registers[:site].source, @data_filename)
      data = YAML.load_file(@data_file)
      context.environments.first["page"][@data_name] = data
      nil
    end
  end
end

Liquid::Template.register_tag('injectdata', Jekyll::InjectDataTag)