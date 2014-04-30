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

module AddClass

  # Wraps code with tags for Prettify.
  #
  # Example usage:
  # 
  # {% class key-takeaway %}
  # // code here
  # {% endclass %}
  #
  # The language name can be ommitted if it is not known.
  class Tag < Liquid::Block

    def initialize(tag_name, type, tokens)
      super
      @type = type
    end

    def render(context)
      out = '<div markdown="1"' # This markdown=1 is hardly documented anywhere but forces the output to be parsed. http://kramdown.gettalong.org/syntax.html#html-blocks
      unless @type.nil?
        out += ' class="' + @type + '"'
      end
      out += '>'
      
      contents = super
      
      out += contents + "</div>"
    end

  end
end

Liquid::Template.register_tag('class', AddClass::Tag)