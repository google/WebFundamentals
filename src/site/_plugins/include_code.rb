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
  class LinkSampleBlock < Liquid::Block
    def initialize(tag_name, markup, tokens)
      super
      @file = markup
    end

    def render(context)
        page = context.environments.first["page"]
        path = context.registers[:site].source;
        relpath = File.dirname(page["path"]).sub("_en/", "").sub("fundamentals/", "")
        String filepath = File.join(relpath, @file).sub("/_code", "")
        url = File.join(context.registers[:site].baseurl, "/fundamentals/resources/samples", filepath).strip
        out = super(context)
        "<a href=\"#{url}\">#{out}</a>"
    end
  end

  class IncludeCodeTag < Liquid::Tag
    include Liquid::StandardFilters

    # This is the base domain we will link to for samples.
    @@sample_link_base = "https://google-developers.appspot.com/"
    @@comment_formats = {
      "html" => ["<!--", "-->"],
      "css" => ["\\\/\\\*", "\\\*\\\/"],
      "javascript" => ["\\\/\\\*", "\\\*\\\/"],
    }

    def initialize(tag_name, markup, tokens)
      super
      @options = {}
      @file, @section, @lang = markup.strip.split(' ', 3)
      if @lang.nil?
        @lang = "html"
      end
      if @@comment_formats[@lang].nil?
        Jekyll.logger.warn "Include_code doesn't know #{@lang}"
      end
      @character = '/'
    end

    def getmatcher_tag(lang, section, tag)
      startc, endc = @@comment_formats[lang]
      "#{startc} \\/\\/ \\[#{tag} #{section}\\] #{endc}\n?"
    end

    def getmatch(contents, lang, section)
      start = getmatcher_tag(lang, section, "START")
      endt = getmatcher_tag(lang, section, "END")
      contents.match(/#{start}(.*)#{endt}/im)[1]
    end

    def render(context)
        page = context.environments.first["page"]
        path = context.registers[:site].source;
        String filepath = File.join(File.dirname(page["path"]), @file)
        String file = File.join(path, filepath)
        contents = File.read(file)
        snippet = getmatch(contents, @lang, @section)
        @@comment_formats.each do |lang, parms|
            match = getmatcher_tag(lang, "[^\\]]+", "\\w+")
            snippet.gsub!(/#{match}/mi, "")
        end
        render_codehighlighter(context, snippet, filepath)
    end

    def render_codehighlighter(context, code, filepath)
      require 'pygments'

      # TODO(ianbarber): This is a bit of a fudge. We should know the definitive sample
      # path. I think we may want to have a central shared "code sample" object that is
      # knows how to get such paths for this and the sample_builder.
      filepath.sub!("_code/", "")
      offset = false
      snippet = ""
      initial = code.lines.first[/\A */].size

      # Indenter
      # TODO(ianbarber): Look for multiples of original offset rather than absolute spaces.
      # paulk edit: updated logic.  gets first line, works out indent. then uses that as initial offset
      code.each_line {|s|

        #Jekyll.logger.warn " #{initial} #{offset} #{(initial + offset)} #{s.lstrip.rstrip}"
        if s.size >= initial
          snippet += (" " * 4)
          snippet += s.slice(initial..s.size).rstrip
        end
        snippet += "\n"
      }

      @options[:encoding] = 'utf-8'
      highlighted_code = Pygments.highlight(snippet, :lexer => @lang, :options => @options)
      if highlighted_code.nil?
          Jekyll.logger.error "There was an error highlighting your code."
      end

      if @lang == 'css'
        @character = '}'
      end

      relpath = filepath.sub("_en/fundamentals/", "")

      <<-HTML
  </div>
  </div>
  <div class="highlight-module highlight-module--code highlight-module--right">
    <div class="highlight-module__container">
      <code class='html'>#{highlighted_code.strip}</code>
      <a class="highlight-module__cta" href="#{context.registers[:site].baseurl}/fundamentals/resources/samples/#{relpath}">View full sample</a>
    </div>
  </div>
  <div class="container">
    <div class="content" markdown="1">
        HTML
      end
  end
end

Liquid::Template.register_tag('include_code', Jekyll::IncludeCodeTag)
Liquid::Template.register_tag('link_sample', Jekyll::LinkSampleBlock)
