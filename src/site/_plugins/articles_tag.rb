require 'time'

module Jekyll

  class Page
    attr_accessor :name

    def full_path
      self.url.sub(/index\.html$/, '')
    end
  end

  class ArticlesTag < Liquid::Tag
    def initialize(tag_name, section_name, tokens)
      super
      @section_name = section_name.strip
    end

    def load_authors(ctx)
      ctx.registers[:site].pages.select{|p| p.data["author"]}.map do |page|
        page.data["author"]
      end.inject({}) do |map, author|
        map[author['key']] = author
        map
      end
    end

    def render(context)

      @authors = load_authors(context)

      @articles = context.registers[:site].pages.select{|p| p.data["article"]}
      @articles_for_section = @articles.select do |a|
        a.data["article"]["collection"] == @section_name
      end.sort do |a, b|
        a_up = a.data['article']['updated_on'] || a.data['article']['written_on']
        b_up = b.data['article']['updated_on'] || b.data['article']['written_on']
        a_pub = a.data['article']['written_on']
        b_pub = b.data['article']['written_on']

        "#{a_up}-#{a_pub}" <=> "#{b_up}-#{b_pub}"
      end.reverse

      @articles_for_section.map{|article| render_article(article)}.join("\n")

    end

    def render_article(article)
      author_names = fmt_author_name(article)

      written_on = article.data["article"]["written_on"]
      updated_on = article.data["article"]["updated_on"]
      date = fmt_date(written_on)
      if updated_on
        date += " (updated #{fmt_date(updated_on)})"
      end

      <<-END
      <p>
        <a href="#{article.full_path}"><strong>#{article.data['title']}</strong></a><br>
        <span class="text-muted">#{author_names}, #{date}</span><br>
        #{article.data['description']}
      </p>
      END
    end

    def fmt_date(date)
      return 'unknown' unless date
      date.strftime("%B %Y")
    end

    def fmt_author_name(article)
      return 'The Dart Team' unless article.data['rel'] and article.data['rel']['author']
      [article.data['rel']['author']].flatten.map do |a|
        @authors[a] ? "#{@authors[a]['fname']} #{@authors[a]['lname']}" : 'UNKNOWN'
      end.join(', ')
    end

  end

end

Liquid::Template.register_tag('articles', Jekyll::ArticlesTag)
