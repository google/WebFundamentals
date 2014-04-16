# Copyright (c) 2012, Google

module AddWrapper

  # Wraps content with specific tags.
  #
  # Example usage:
  #
  # {% wrap key-takeaway %}
  # // markdown or code here
  # {% endwrap %}
  class Tag < Liquid::Block

    def initialize(tag_name, type, tokens)
      super
      @type = type
    end

    def render(context)
      out = '<div'
      unless @type.nil?
        out += ' class="' + @type + '"'
      end
      out += '><div class="container" markdown="1">'
      # This markdown=1 is hardly documented anywhere but forces the output to be parsed. http://kramdown.gettalong.org/syntax.html#html-blocks

      contents = super

      out += contents + "</div></div>"
    end

  end
end

Liquid::Template.register_tag('wrap', AddWrapper::Tag)
