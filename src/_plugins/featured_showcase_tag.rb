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
      <div class="featured-spotlight">
        <div class="container-medium">
          <div class="featured-spotlight__container g--pull-half">
            <div class="featured-spotlight__img">
              <img src="#{showcase.data["showcase"]["wide-promo-image"]}" alt="image exemple">
            </div>

            <div class="container-small">
              <h3 class="xxlarge">#{showcase.data["title"]}</h3>
              <p>#{showcase.data["introduction"]}</p>
              <a href="#{showcase.full_path}" class="cta--primary">View case study</a>
            </div>
          </div>
        </div>
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
