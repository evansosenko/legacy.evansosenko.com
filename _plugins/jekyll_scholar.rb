require 'jekyll/scholar'
require 'uri'

# Make urls hyperlinks in Jekyll-Scholar.
# Required until the follow issue is fixed:
# https://github.com/inukshuk/jekyll-scholar/issues/30
module HTMLFilter
  class HTML < BibTeX::Filter
    def apply(value)
      value.to_s.gsub(URI.regexp(['http','https','ftp'])) do |c|
        %Q{<a href="#{$&}">#{$&}</a>}
      end
    end
  end
end
