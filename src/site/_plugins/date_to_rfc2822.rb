require 'time'

module RFC2822Filter
  def date_to_rfc2822(input)
    if input == 'now'
      Time.new.rfc2822
    else
      # input might be a date and not a string
      Time.parse(input.to_s).rfc2822
    end
  end
end

Liquid::Template.register_filter(RFC2822Filter)