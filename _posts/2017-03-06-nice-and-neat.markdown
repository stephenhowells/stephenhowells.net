---
layout: post
title: Nice and Neat
type: post
date: "2017-03-06 11:44:03"
categories: articles
---
When I first coded this site in Jekyll I decided to make life easy and use [Bootstrap](http://getbootstrap.com/) to organize the web templates. The main advantage was the nice grid system, mobile responsive navigation, and quick time to launch. It served its purpose by helping me finish the project in a hurry, one weekend, and the results were fine.

As time passed I’ve had this notion in my mind that eventually I’d do a rewrite specifically to remove Bootstrap. The site’s layout is minimal and doesn’t justify the full weight of the framework. Also, some of the visual elements from Bootstrap appeared overly default for my taste and I never felt motivated to heavily restyle them. Finally, the responsive menu system was unnecessary because the site’s navigation is simple. Obviously, using a front-end framework has its advantages and can prevent reinventing the wheel. Why write my own custom grid system when there are countless others to choose from?

This past Saturday I noticed [Thoughtbot](https://thoughtbot.com/) had recently released version 2.0.0 of their lightweight grid system [Neat](http://neat.bourbon.io/). This was all the motivation I needed to start rewriting the site’s templates. I felt an unexpected sense of relief when I removed Bootstrap, almost as if I had regained control of the page. Neat doesn’t affect styling of page elements, it only focuses on the layout grid. Also, I did drop in the tiny [Normalize.css](https://github.com/necolas/normalize.css/) library because it offers a sensible baseline to begin customizing the page.

Once again the rewrite took a weekend and that proved to me that using a heavy framework like Bootstrap isn’t always the time saver I believed it was. The real value in Bootstrap becomes more apparent when developing a prototype web app. It’s nice when all the buttons, menus, and tables are already formatted. It’s worth mentioning that I could pull in a customized version of Bootstrap that omitted the elements I didn’t need but I honestly never bothered to do that. I would guess that most quick weekend projects people put together just grab the full framework off the CDN.

So how did I like using Neat? I loved it! It’s an incredible approach to grids because it’s just a series of SASS mixins you drop into your stylesheets. You assign which items on your page are columns and that’s it. The result is a super lightweight stylesheet and a very flexible grid. It does have a small learning curve as the syntax is a bit unique but it’s not hard to learn. I’d use Neat again for projects both large and small. It’s the type of library that never feels like it’s taken over my project. Those are the libraries I plan to use whenever possible.