module Jekyll
  class FigureTag < Liquid::Tag
    @url = nil
    @caption = nil
    @class = nil
    @resrc = nil

    IMAGE_URL_WITH_CLASS_AND_CAPTION = /(\w+)(\s+)((https?:\/\/|\/)(\S+))(\s+)"(.*?)"/i
    IMAGE_URL_WITH_CAPTION = /((https?:\/\/|\/)(\S+))(\s+)"(.*?)"/i
    IMAGE_URL_WITH_CLASS = /(\w+)(\s+)((https?:\/\/|\/)(\S+))/i
    IMAGE_URL = /((https?:\/\/|\/)(\S+))/i

    def initialize(tag_name, markup, tokens)
      super

      if markup =~ IMAGE_URL_WITH_CLASS_AND_CAPTION
        @class   = $1
        @url     = $3
        @caption = $7
      elsif markup =~ IMAGE_URL_WITH_CAPTION
        @url     = $1
        @caption = $5
      elsif markup =~ IMAGE_URL_WITH_CLASS
        @class = $1
        @url   = $3
      elsif markup =~ IMAGE_URL
        @url = $1
      end

    end

    def render(context)
      site = context.registers[:site]
      @site_url = site.config['url']

      if @class
        if @class == 'breakout'
          source = "</div><figure class='#{@class}'>"
        else
          source = "<figure class='#{@class}'>"
        end
      else
        source = "<figure>"
      end

      if ENV['JEKYLL_ENV'] != 'development' && (@url.include? '.jpg' or @url.include? '.jpeg' or @url.include? '.png')
        source += "<img src=\"#{@site_url}#{@url}\" data-action=\"zoom\"/>"
      else
        source += "<img src=\"#{@url}\" data-action=\"zoom\"/>"
      end

      source += "<figcaption>#{@caption}</figcaption>" if @caption
      source += "</figure>"

      source
    end
  end
end

Liquid::Template.register_tag('figure', Jekyll::FigureTag)
