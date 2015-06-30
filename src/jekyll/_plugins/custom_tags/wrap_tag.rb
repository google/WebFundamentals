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

    def initialize(tag_name, className, tokens)
      super
      @className = className
    end

    def render(context)
      out = '<div class="container">'
      out += '<div'

      # This markdown=1 is hardly documented anywhere but forces the output
      # to be parsed. http://kramdown.gettalong.org/syntax.html#html-blocks
      unless @className.nil?
        out += ' class="' + @className + '" markdown="1">'
      end

      # TODO: (mattgaunt) why is this needed? Could just super + "</div></div>"
      contents = super

      out += contents + "</div></div>"
    end

  end
end

Liquid::Template.register_tag('wrap', AddWrapper::Tag)
