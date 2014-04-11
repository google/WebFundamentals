# Copyright (c) 2012, Google

module AddClass

  # Wraps code with tags for Prettify.
  #
  # Example usage:
  # 
  # {% class key-takeaway %}
  # // dart code here
  # {% endclass %}
  #
  # The language name can be ommitted if it is not known.
  class Tag < Liquid::Block

    def initialize(tag_name, type, tokens)
      super
      @type = type
    end

    def render(context)
      out = '<div markdown="1"' # This markdown=1 is hardly documented anywhere but forces the output to be parsed. http://kramdown.gettalong.org/syntax.html#html-blocks
      unless @type.nil?
        out += ' class="' + @type + '"'
      end
      out += '>'
      
      contents = super
      
      out += contents + "</div>"
    end

  end
end

Liquid::Template.register_tag('class', AddClass::Tag)