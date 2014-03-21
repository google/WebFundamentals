# Copyright (c) 2012, the Dart project authors.  Please see the AUTHORS file
# for details. All rights reserved. Use of this source code is governed by a
# BSD-style license that can be found in the LICENSE file.

require 'cgi'

module Prettify

  # Wraps code with tags for Prettify.
  #
  # Example usage:
  # 
  # {% prettify dart %}
  # // dart code here
  # {% endprettify %}
  #
  # The language name can be ommitted if it is not known.
  class Tag < Liquid::Block

    Syntax = /\s*(\w+)\s*/o

    def initialize(tag_name, markup, tokens)
      super
      if markup =~ Syntax
        @lang = $1
      end
    end

    def render(context)
      # out = '<pre class="prettyprint linenums'
      out = '<pre class="prettyprint'
      unless @lang.nil?
        out += ' lang-' + @lang
      end
      out += '">'

      contents = super.strip
      contents = CGI::escapeHTML(contents)

      contents.gsub!('[[strike]]', '<code class="nocode strike">')
      contents.gsub!('[[/strike]]', '</code>')

      contents.gsub!('[[highlight]]', '<code class="nocode highlight">')
      contents.gsub!('[[/highlight]]', '</code>')

      out += contents + "</pre>"
    end

  end
end

Liquid::Template.register_tag('prettify', Prettify::Tag)
