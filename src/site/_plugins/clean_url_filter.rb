module Jekyll
  module CleanURLFilter
    def clean(input)
      # remove the trailing index.html from a url
      input.gsub(/\index\.html$/, "")
    end
  end
end

Liquid::Template.register_filter(Jekyll::CleanURLFilter)