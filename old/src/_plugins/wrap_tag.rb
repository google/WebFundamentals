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

module AddWrapper

  # Wraps content with specific tags.
  #
  # Example usage:
  #
  # {% wrap key-takeaway %}
  # // markdown or code here
  # {% endwrap %}
  class Tag < Liquid::Block

    def initialize(tag_name, type, tokens)
      super
      @type = type
    end

    def render(context)
      out = '<div class="container">'
      out += '<div'
      unless @type.nil?
        out += ' class="' + @type + '" markdown="1">'
      end
      # This markdown=1 is hardly documented anywhere but forces the output to be parsed. http://kramdown.gettalong.org/syntax.html#html-blocks

      contents = super

      out += contents + "</div></div>"
    end

  end
end

Liquid::Template.register_tag('wrap', AddWrapper::Tag)
