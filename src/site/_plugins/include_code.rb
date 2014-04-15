module Jekyll
  class IncludeCodeTag < Liquid::Tag
    include Liquid::StandardFilters

    # This is the base domain we will link to for samples.
    sample_link_base = "https://google-developers.appspot.com/"

    def initialize(tag_name, markup, tokens)
      super
      @options = {}
      @lang = 'html'
      @file, @section = markup.strip.split(' ', 2)
    end

    def render(context)
        page = context.environments.first["page"]
        path = context.registers[:site].source;
        String filepath = File.join(File.dirname(page["path"]), @file)
        String file = File.join(path, filepath)
        contents = File.read(file)
        snippet = contents.match(/<!-- \/\/ \[START #{@section}\] -->(.*)<!-- \/\/ \[END #{@section}\] -->/im)[1];
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
      # Indenter
      # TODO(ianbarber): Look for multiples of original offset rather than absolute spaces.
      code.each_line {|s|
        initial = s[/\A */].size
        if initial == s.size 
          return
        end
        if (offset == false)
          offset = 2 - initial
        end
        if (offset == 0)
          break
        end
        #Jekyll.logger.warn " #{initial} #{offset} #{(initial + offset)} #{s.lstrip.rstrip}"
        snippet += (" " * (initial + offset))
        snippet += s.lstrip.rstrip
        snippet += "\n"
      }

      @options[:encoding] = 'utf-8'
      highlighted_code = Pygments.highlight(snippet, :lexer => @lang, :options => @options)
      if highlighted_code.nil?
          Jekyll.logger.error "There was an error highlighting your code."
      end        
      <<-HTML
  <div>
    <pre><code class='html'>#{highlighted_code.strip}</code></pre>
    <a href="/resources/samples/#{filepath}">View full sample</a>
  </div>
        HTML
      end
  end
end

Liquid::Template.register_tag('include_code', Jekyll::IncludeCodeTag)
