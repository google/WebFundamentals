module Jekyll
  class IncludeCodeTag < Liquid::Tag
    include Liquid::StandardFilters

    # This is the base domain we will link to for samples.
    sample_link_base = "https://google-developers.appspot.com/"

    def initialize(tag_name, markup, tokens)
      super
      @options = {}
      @file, @section, @lang = markup.strip.split(' ', 3)
      if @lang.nil?
        @lang = "html"
      end
      @character = '/'
    end

    def render(context)
        page = context.environments.first["page"]
        path = context.registers[:site].source;
        String filepath = File.join(File.dirname(page["path"]), @file)
        String file = File.join(path, filepath)
        contents = File.read(file)
        snippet = contents.match(/<!-- \/\/ \[START #{@section}\] -->\n(.*)<!-- \/\/ \[END #{@section}\] -->/im)[1];
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

      <<-HTML
  <div class="highlight highlight--right">
    <div class="highlight__container" data-character="#{@character}">
      <div class="g-wide--push-1 g-wide--pull-1 g-medium--pull-1">
        <pre><code class='html'>#{highlighted_code.strip}</code></pre>
        <a href="/resources/samples/#{filepath}">View full sample</a>
      </div>
    </div>
  </div>
        HTML
      end
  end
end

Liquid::Template.register_tag('include_code', Jekyll::IncludeCodeTag)
