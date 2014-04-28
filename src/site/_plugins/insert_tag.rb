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

  # TODO: support file line ranges
  class InsertTag < Liquid::Tag
    def initialize(tag_name, arguments, tokens)
      super
      args = arguments.split(' ')
      @file = args[0].strip
      if args.length > 1
        @start = args[1].to_i
        @end = args[2].to_i
      end
    end

    def render(context)
      here = File.dirname(context.registers[:page]['path'])
      file_name = File.join(context.registers[:site].source, here, @file)
      if @start
        lines = File.readlines(file_name)
        lines[@start..@end].join("")
      else
        File.read(file_name)
      end
    end
  end

end

Liquid::Template.register_tag('insert', Jekyll::InsertTag)