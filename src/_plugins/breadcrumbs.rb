# http://biosphere.cc/software-engineering/jekyll-breadcrumbs-navigation-plugin/

module Jekyll

  ##
  # Monkey patch Jekyll's Page class
  class Page

    ##
    # Caching version of find_ancestors
    def ancestors
      @ancestors ||= find_ancestors
    end

    ##
    # We add a custom method to the page variable, that returns an ordered list of its
    # parent pages ready for iteration.
    def find_ancestors
      a = []
      url = self.url # .sub("/fundamentals", "")
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

      a << get_page_from_url(url)

      a.pop

      return a.reverse
    end

    ##
    # Make ancestors available in liquid
    alias orig_to_liquid to_liquid
    def to_liquid
      h = orig_to_liquid
      h['ancestors'] = self.ancestors
      h['parent'] = self.ancestors.last
      h['current_directory'] = self.ancestors
      h['filepath'], h['filename'] = File.split(self.url)
      return h
    end

    private

    ##
    # Gets Page object that has given url. Very in-efficient O(n) solution.
    def get_page_from_url(pageurl)
      # pageurl = "/fundamentals" + pageurl
      return site.data['primes'][pageurl] if site.data.key? 'primes'
      site.pages.find { |page| page.url == pageurl }
    end
  end
end
