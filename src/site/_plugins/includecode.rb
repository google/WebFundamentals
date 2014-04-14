module Jekyll
  class IncludeCodeTag < Liquid::Tag

    def initialize(tag_name, markup, tokens)
      super
      @file, @section = markup.strip.split(' ', 2)
    end

    def render(context)
    	# TODO(ianbarber): Prettify
    	# TODO(ianbarber): Auto indent
      	print Dir.pwd
      	page = context.environments.first["page"]
      	path = context.registers[:site].source;
      	contents = File.read(File.join(path, File.dirname(page["path"]), @file))
      	snippet = contents.match(/<!-- \/\/ \[START #{@section}\] -->(.*)<!-- \/\/ \[END #{@section}\] -->/im)[1];
      	output = ""
      	snippet.each_line {|s| output += "    " + s}
      	output
    end
  end
end

Liquid::Template.register_tag('include_code', Jekyll::IncludeCodeTag)