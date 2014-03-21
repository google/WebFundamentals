module Jekyll

  class RenderTag < Liquid::Tag
    def initialize(tag_name, file, tokens)
      super
      @file = file.strip
    end

    def render(context)
      includes_dir = File.join(context.registers[:site].source, '_includes')

      if File.symlink?(includes_dir)
        return "Includes directory '#{includes_dir}' cannot be a symlink"
      end

      if @file !~ /^[a-zA-Z0-9_\/\.-]+$/ || @file =~ /\.\// || @file =~ /\/\./
        return "Include file '#{@file}' contains invalid characters or sequences"
      end

      Dir.chdir(includes_dir) do
        choices = Dir['**/*'].reject { |x| File.symlink?(x) }
        if choices.include?(@file)
          source = File.read(@file)
          partial = Liquid::Template.parse(source)
          context.stack do
            contents = partial.render(context)
            site = context.registers[:site]
            ext = File.extname(@file)

            converter = site.converters.find { |c| c.matches(ext) }
            contents = converter.convert(contents) unless converter.nil?
            
            contents
          end
        else
          "Included file '#{@file}' not found in _includes directory"
        end
      end
    end
  end

end

Liquid::Template.register_tag('render', Jekyll::RenderTag)