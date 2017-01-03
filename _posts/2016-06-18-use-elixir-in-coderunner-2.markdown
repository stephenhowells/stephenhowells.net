---
layout: post
title: Use Elixir in CodeRunner 2
type: post
date: "2016-06-18 10:07:01"
categories: articles
---
Recently, I've been tinkering around with the [Elixir](http://elixir-lang.org/) language and have quite enjoyed it. It does offer a nice interactive environment named IEX which functions quite similarly to IRB in the Ruby world. While IEX is a great place to get started I prefer to tinker with code in [CodeRunner](https://coderunnerapp.com/). It's a hybrid of a text editor and the Terminal wrapped in a nice GUI. Mac based developers will feel right at home in CodeRunner. Basically, you compose code in an editor pane, complete with customizable syntax highlighting, and can view the results in an adjacent pane as they would appear in the shell. This workflow is fast and elegant.

CodeRunner doesn't include Elixir out of the box but adding a new language is very easy. We'll need to enter a few Terminal commands to start with:

```shell
# Install Elixir on OS X if you don't already have it with Homebrew.
brew update
brew install elixir

# Download the TextMate language grammar for Elixir.
curl -O https://raw.githubusercontent.com/elixir-lang/elixir-tmbundle/master/Syntaxes/Elixir.tmLanguage
```

Then, in CodeRunner's preferences visit the "Languages" tab and click the plus sign in the lower left. Name the new syntax "Elixir" and then in the "Syntax Mode" dropdown box select `Other…`. Navigate to where you saved the `Elixir.tmLanguage` file earlier and select it. You're almost finished. The following two screenshots display the required configuration to start using Elixir:

![CodeRunner Elixir Settings](/dist/img/2016-06-18_8_17_37AM.png)

![CodeRunner Elixir Template](/dist/img/2016-06-18_8_18_10AM.png)

Once those settings are saved in CodeRunner you'll have the option to start using Elixir. Just choose it in the dropdown box for a new file:

![CodeRunner Elixir Example](/dist/img/2016-06-18_2_48_03PM.png)
