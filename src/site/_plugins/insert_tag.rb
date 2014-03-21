module Jekyll

  # TODO: support file line ranges
  class InsertTag < Liquid::Tag
    def initialize(tag_name, arguments, tokens)
      super
      args = arguments.split(' ')
      @file = args[0].strip
      if args.length > 1
        @start = args[1].to_i
        @end = args[2].to_i
      end
    end

    def render(context)
      here = File.dirname(context.registers[:page]['path'])
      file_name = File.join(context.registers[:site].source, here, @file)
      if @start
        lines = File.readlines(file_name)
        lines[@start..@end].join("")
      else
        File.read(file_name)
      end
    end
  end

end

Liquid::Template.register_tag('insert', Jekyll::InsertTag)