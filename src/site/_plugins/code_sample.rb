# Copyright (c) 2012, the Dart project authors.  Please see the AUTHORS file
# for details. All rights reserved. Use of this source code is governed by a
# BSD-style license that can be found in the LICENSE file.

module CodeSample

  $src_prefix = ''
  $iframe_prefix = ''

  # We allow to pass urls with surrounding backquotes ` ` so that markdown
  # syntax highlighers don't break if you have special markdown chars on your
  # url (e.g.  underscores). This function removes the optional brackets.
  def CodeSample.remove_angle_brackets(url)
    if url[0] == "`" && url[-1] == "`"
      url[1..-2].strip
    else
      url
    end
  end

  # Configure a common prefix for all URLs in the actual CodeSample tags.
  class Setup < Liquid::Block

    def initialize(tag_name, params, tokens)
      super
    end

    def render(context)
      super
    end

    def unknown_tag(tag, params, tokens)
      case tag
        when 'srcprefix'
          $src_prefix = CodeSample.remove_angle_brackets(params.strip)
        when 'iframeprefix'
          $iframe_prefix = CodeSample.remove_angle_brackets(params.strip)
        else
          super
      end
    end
  end

  # Renders a table with code and a running example side by side.
  class Tag < Liquid::Block

    def initialize(tag_name, params, tokens)
      super
      @percent = params.strip
    end

    def render(context)
      link = ""
      if @src_url
        link = "(<a href='#{$src_prefix + @src_url}'>see full source</a>)"
      end

      ("\n\n<table sytle='border:0px'><thead>" +
        "<tr><td><strong>Source code #{link}</strong>" +
        "</td><td>" +
        "</td><td><strong>Try it out...</strong></td></tr>" +
        "</thead><tbody><tr>" +
        "<td style='width:#{@percent}%;vertical-align:top;'>" + super.strip +
        "</td><td style='width:100%;'>" +
        "</td><td style='vertical-align:top;'>" +
        "<iframe style='border:none;height:#{@height};width:#{@width};'" +
        " src='#{$iframe_prefix + @iframe_url}'></iframe>" +
        "</td></tr></tbody></table>\n\n")
    end

    def unknown_tag(tag, params, tokens)
      case tag
        when 'iframe'
          @width, @height, @iframe_url = params.split(' ')
          @iframe_url = CodeSample.remove_angle_brackets(@iframe_url.strip)
        when 'source'
          @src_url = CodeSample.remove_angle_brackets(params.strip)
        else
          super
      end
    end

  end
end

Liquid::Template.register_tag('codesampleSetup', CodeSample::Setup)
Liquid::Template.register_tag('codesample', CodeSample::Tag)
