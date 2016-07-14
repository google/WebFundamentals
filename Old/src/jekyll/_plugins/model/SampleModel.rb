class SampleModel
  attr_accessor :section

  def initialize(site, sourcepath, dir, section)
    @site = site
    @sourcepath = sourcepath
    @dir = dir
    @section = section
  end

  def contents()
    contents = File.read(@sourcepath).force_encoding('UTF-8')
    contents.gsub!(/<!-- \/\/ \[(?:(?:START)|(?:END)) [^\]]+\] -->\s*\n?/m, "\n")
    contents.gsub!(/\/\* \/\/ \[(?:(?:START)|(?:END)) [^\]]+\] \*\/\s*\n?/m, "\n")
    contents.gsub!(/<!-- \/\/ \[TEMPLATE ([^\]]+)\] -->\s*\n/m) { |matches|
      tag = $1.downcase
      if (tag == "header")
        Template.header(@site)
      elsif (tag == "header_full")
        Template.header(@site) + Template.header_full(@site)
      elsif (tag == "footer")
        Template.footer(@site)
      else
        ""
      end
    }
    Liquid::Template.parse(contents).render(@site.site_payload)
  end

  def filename()
    File.join(@dir, File.basename(@sourcepath).sub("/_langs/en", ""))
  end
end
