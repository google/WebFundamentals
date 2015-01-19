module Jekyll
  module DeepSortFilter
	def deepsort(input, property = nil)
      ary = InputIterator.new(input)
      if property.nil?
        ary.sort
      elsif ary.first.respond_to?(:[]) && !ary.first[property].nil?
        ary.sort {|a,b| a[property] <=> b[property] }
      elsif ary.first.respond_to?(property)
        ary.sort {|a,b| a.send(property) <=> b.send(property) }
      end
    end
  end
end

Liquid::Template.register_filter(Jekyll::DeepSortFilter)