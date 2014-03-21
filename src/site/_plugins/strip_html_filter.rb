module StripHtmlFilter
  def self.strip_html(input)
    input.to_s.gsub(/<\/?[^>]*>/,"")
  end
end

Liquid::Template.register_filter(StripHtmlFilter)