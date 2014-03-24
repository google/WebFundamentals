module Jekyll
  
  class CollectionGenerator < Generator
    def generate(site)
      
      # For each collection, finds all the pages
      
      # Find all the collection pages
      collections = site.pages.select { |page| page.data.has_key?('collection') }
      
      collections.each do |page|
        collection = page.data['collection']
        
        page.data['articles'] = site.pages.select do |article|
          if article.data.has_key?('article') && article.data['article'].has_key?('collection')
            article.data['article']['collection'] == collection
          else
            false
          end
        end
      end
      
    end
  end
  
end