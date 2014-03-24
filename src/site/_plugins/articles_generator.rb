module Jekyll
  
  class CollectionGenerator < Generator
    def generate(site)
      # Find all the collection pages
      collections = site.pages.select { |page| page.data.has_key?('collection') }
      
      # aggregate all the article into categories
      
      # todo learn about map
      articles = {}
      collections.each do |page|
        collection = page.data['collection'];
        if collection != nil
          if articles.has_key?(collection) == false
            articles[collection] = []
          end
          articles[collection].push(page)
        end
      end
      
      articles.keys.each do |article| 
        articles[article] = articles[article].sort do |a, b|
          a_order = a.data['article']['order'] || 0
          b_order = b.data['article']['order'] || 0
          a_order <=> b_order
        end
      end
      
      # Add all the pages per category to each page.
      site.pages.each do |page| 
        page.data['articles'] = articles
      end
    end
  end
  
end