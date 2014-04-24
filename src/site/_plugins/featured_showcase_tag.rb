require 'time'

module Jekyll


  class FeaturedShowcaseTag < Liquid::Tag
    def initialize(tag_name, markup, tokens)
      super

      section_name, item_count = markup.strip.split(' ', 2)
      @section_name = section_name.strip
      if item_count == nil
        @item_count = 1
      else
        @item_count = item_count.to_i
      end
      
    end

    def render(context)

      articles = context.registers[:site].pages.select{|p| p.data["showcase"]}

      featured = articles.select do |a|
        a.data.has_key?("showcase") && a.data.has_key?("collection") && a.data["collection"] == @section_name && a.data["showcase"].has_key?("featured") && a.data["showcase"]["featured"] == true
      end.sort do |a, b|
        a_up = a.data['showcase']['updated_on'] || a.data['showcase']['written_on']
        b_up = b.data['showcase']['updated_on'] || b.data['showcase']['written_on']
        a_pub = a.data['showcase']['written_on']
        b_pub = b.data['showcase']['written_on']

        "#{a_up}-#{a_pub}" <=> "#{b_up}-#{b_pub}"
      end.reverse.first(@item_count)

      output = ""

      if featured != nil
        featured.each { |f| output += render_article(f) }
      end

      output
    end

    def render_article(showcase)
      
      written_on = showcase.data["showcase"]["written_on"]
      updated_on = showcase.data["showcase"]["updated_on"]
      date = fmt_date(written_on)
      if updated_on
        date += " (updated #{fmt_date(updated_on)})"
      end

      <<-END
      <div>
        <a href="#{showcase.full_path}"><strong>#{showcase.data["title"]}</strong></a><br>
        <br>
        #{showcase.data["description"]}
      </div>
      END
    end

    def fmt_date(date)
      return 'unknown' unless date
      date.strftime("%B %Y")
    end


  end

end

Liquid::Template.register_tag('featured_showcase', Jekyll::FeaturedShowcaseTag)
