module Jekyll
  class NavLinkTag < Liquid::Block

    def initialize(tag_name, params, tokens)
      super
      @params = params.split(' ')
      @url = @params.first
    end

    def render(context)
      page_url = context.environments.first["page"]["url"]
      "<li>" +
      ((@url != page_url) ? "<a href=\"#{@url}\">" : '') +
      super +
      ((@url != page_url) ? "</a>" : "") +
      "</li>"
    end
  end
end

Liquid::Template.register_tag('nav_link', Jekyll::NavLinkTag)