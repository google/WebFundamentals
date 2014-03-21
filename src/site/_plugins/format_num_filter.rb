module FormatNumFilter
  def format_num(input, fmt)
    fmt % input
  end
end

Liquid::Template.register_filter(FormatNumFilter)