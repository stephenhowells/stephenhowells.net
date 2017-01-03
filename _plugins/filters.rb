module Jekyll
  module Filters
    def no_widows(title)
      if title.strip.count(" ") >= 2
        title.split[0...-1].join(" ") + "&nbsp;#{title.split[-1]}"
      else
        title
      end
    end

    def pretty_date(post_date)
      date = DateTime.parse(post_date.to_s)
      day = date.strftime("%-d")

      human_day = case day
        when '1', '21', '31' then day + '<sup>st</sup>'
        when '2', '22' then day + '<sup>nd</sup>'
        when '3', '23' then day + '<sup>rd</sup>'
        else day + '<sup>th</sup>'
      end

      "#{date.strftime("%B")} #{human_day}, #{date.strftime("%Y")}"
    end
  end
end

Liquid::Template.register_filter(Jekyll::Filters)
