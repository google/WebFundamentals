module Jekyll
  module DeepSortFilter

  class InputIterator
    include Enumerable

    def initialize(input)
      @input = if input.is_a?(Array)
        input.flatten
      elsif input.is_a?(Hash)
        [input]
      elsif input.is_a?(Enumerable)
        input
      else
        Array(input)
      end
    end

    def join(glue)
      to_a.join(glue)
    end

    def concat(args)
      to_a.concat args
    end

    def reverse
      reverse_each.to_a
    end

    def each
      @input.each do |e|
        yield(e.respond_to?(:to_liquid) ? e.to_liquid : e)
      end
    end
  end

  def wfconcat(input, array)
    InputIterator.new(input).concat(array)
  end

	def deepsort(input, property = nil, deepProperty = nil)
	  ary = InputIterator.new(input)
	  ary = ary.find_all {|a| a[property] }
      if property.nil?
        ary.sort
      elsif ary.first.respond_to?(:[]) && !ary.first[property][deepProperty].nil?
        ary.sort {|a,b| a[property][deepProperty] <=> b[property][deepProperty] }
      elsif ary.first.respond_to?(property)
        ary.sort {|a,b| a.send(property) <=> b.send(property) }
      end
    end



  end
end

Liquid::Template.register_filter(Jekyll::DeepSortFilter)