---
layout: post
title: Prevent Widows in Jekyll and Middleman
type: post
date: "2016-06-17 09:04:24"
categories: articles
---
One of my major pet peeves while reading Internet publications is when article titles (normally wrapped in header tags) display line breaks that result in unfortunate widows. A widow is when a line break occurs and a single lonely word is bumped to the next line, left to poke me in eye.

Luckily, this can easily be avoided in both Jekyll and Middleman. The goal is to determine if the title is at least two words in length and then replace the last space in the title with an `&nbsp;`. This non-breaking space will keep the last two words married together so that in the event of a line break they will always bump down to the next line together.

The following code is a Jekyll filter that is used in Liquid templates. Simply place this filter in a file named `filters.rb` and save it to the `_plugins` folder (create this file and folder if you don't have them):

{% raw %}
```ruby
# filters.rb

module Jekyll
  module WidowFilter
    def no_widows(title)
      if title.strip.count(" ") >= 2
        title.split[0...-1].join(" ") + "&nbsp;#{title.split[-1]}"
      else
        title.strip
      end
    end
  end
end

Liquid::Template.register_filter(Jekyll::WidowFilter)
```

```html
<!-- In a Liquid template the filter is easily invoked. -->

<h1>{{ post.title | no_widows }}</h1>
```

The process is very similar in Middleman except it's referred to as a helper instead of a filter. Place the following code in the `config.rb` file:

```ruby
# config.rb

helpers do
  def no_widows(title)
    if title.strip.count(" ") >= 2
      title.split[0...-1].join(" ") + "&nbsp;#{title.split[-1]}"
    else
      title.strip
    end
  end
end
```

Middleman supports both Haml and ERB. To use the helper in Haml:

```haml
%h1= no_widows(article.title)
```

Or in ERB:

```erb
<h1><%= no_widows(article.title) %></h1>
```
{% endraw %}

If you view the source code for this site you'll see that I use the same technique for my titles. It's a nice touch and the type of attention to detail that makes a better experience for the reader.