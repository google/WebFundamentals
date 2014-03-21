module Jekyll
  class InjectDataTag < Liquid::Tag

    def initialize(tag_name, params, tokens)
      super
      @params = params.split(' ')
      @data_name = @params[0]
      @data_filename = @params[1]
    end

    def render(context)
      @data_file = File.join(context.registers[:site].source, @data_filename)
      data = YAML.load_file(@data_file)
      context.environments.first["page"][@data_name] = data
      nil
    end
  end
end

Liquid::Template.register_tag('injectdata', Jekyll::InjectDataTag)