module Jekyll
  class IncludeCodeTag < Liquid::Tag
    include Liquid::StandardFilters

    # This is the base domain we will link to for samples.
    sample_link_base = "https://google-developers.appspot.com/"

    def initialize(tag_name, markup, tokens)
      super
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
      # TODO(ianbarber): Auto indent
      # TODO(ianbarber): Syntax highlighting goes here.
      # TODO(ianbarber): Include sample link base once testing.
        <<-HTML
  <div>
    <pre><code class='html'>#{h(code).strip}</code></pre>
    <a href="/_samples/#{filepath}">View full sample</a>
  </div>
        HTML
      end
  end
end

Liquid::Template.register_tag('include_code', Jekyll::IncludeCodeTag)