# Copyright (c) 2012, the Dart project authors.  Please see the AUTHORS file
# for details. All rights reserved. Use of this source code is governed by a
# BSD-style license that can be found in the LICENSE file.

require 'cgi'

module AddClass

  # Wraps code with tags for Prettify.
  #
  # Example usage:
  # 
  # {% class key-takeaway %}
  # // dart code here
  # {% endclass %}
  #
  # The language name can be ommitted if it is not known.
  class Tag < Liquid::Block

    def initialize(tag_name, type, tokens)
      super
      @type = type
    end

    def render(context)
      out = '<div'
      unless @lang.nil?
        out += ' class="' + @type + '"'
      end
      out += '">'
      
      out += contents + "</div>"
    end

  end
end

Liquid::Template.register_tag('class', Prettify::Tag)
