module Jekyll

  ##
  # Monkey patch Jekyll's Page class
  class Page

    ##
    # We add a custom method to the page variable, that returns an ordered list of it's
    # parent pages ready for iteration.
    def ancestors
      a = []
      url = self.url
      while url != "/index.html"
        pt = url.split("/")
        if pt[-1] != "index.html"
          # to to directory index
          pt[-1] = "index.html"
          url = pt.join("/")
        else
          # one level up
          url = pt[0..-3].join("/") + "/index.html"
        end
        a << get_page_from_url(url)
      end

      return a.reverse
    end

    ##
    # Make ancestors available in liquid
    alias orig_to_liquid to_liquid
    def to_liquid
      h = orig_to_liquid
      h['ancestors'] = self.ancestors
      return h
    end

    private

    ##
    # Gets Page object that has given url. Very efficient O(n) solution.
    def get_page_from_url(url)
      site.pages.each do |page|
        return page if page.url == url
      end
    end
  end
end
