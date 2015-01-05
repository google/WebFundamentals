# Copyright 2014 Google Inc. All rights reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at

#    http://www.apache.org/licenses/LICENSE-2.0

# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.


require 'time'

module Jekyll

  class Page
    attr_accessor :name

    def full_path
      self.url.sub(/index\.html$/, '')
    end
  end

  class ShowcasesTag < Liquid::Tag
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

      @articles = context.registers[:site].pages.select{|p| p.data["showcase"]}
      @articles_for_section = @articles.select do |a|
        a.data["showcase"]["collection"] == @section_name
      end.sort do |a, b|
        a_up = a.data['showcase']['updated_on'] || a.data['showcase']['written_on']
        b_up = b.data['showcase']['updated_on'] || b.data['showcase']['written_on']
        a_pub = a.data['showcase']['written_on']
        b_pub = b.data['showcase']['written_on']

        "#{a_up}-#{a_pub}" <=> "#{b_up}-#{b_pub}"
      end.reverse

      @articles_for_section.map{|article| render_article(article)}.join("\n")

    end

    def render_article(showcase)
      author_names = fmt_author_name(showcase)

      written_on = showcase.data["showcase"]["written_on"]
      updated_on = showcase.data["showcase"]["updated_on"]
      date = fmt_date(written_on)
      if updated_on
        date += " (updated #{fmt_date(updated_on)})"
      end

      <<-END
      <p>
        <a href="#{showcase.full_path}"><strong>#{showcase.data['title']}</strong></a><br>
        <span class="text-muted">#{author_names}, #{date}</span><br>
        #{showcase.data['description']}
      </p>
      END
    end

    def fmt_date(date)
      return 'unknown' unless date
      date.strftime("%B %Y")
    end

    def fmt_author_name(showcase)
      return 'The Team' unless showcase.data['rel'] and showcase.data['rel']['author']
      [showcase.data['rel']['author']].flatten.map do |a|
        @authors[a] ? "#{@authors[a]['fname']} #{@authors[a]['lname']}" : 'UNKNOWN'
      end.join(', ')
    end

  end

end

Liquid::Template.register_tag('showcases', Jekyll::ArticlesTag)
