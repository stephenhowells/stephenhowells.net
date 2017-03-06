---
layout: post
title: Byword Previews in Marked 2 with AppleScript
type: post
date: "2014-09-23 15:55:44"
categories: articles
---
I’m a big fan of both [Byword](http://www.bywordapp.com) and [Marked 2](http://marked2app.com/). *The Sweet Setup* recently declared Byword to be [their favorite Markdown writing app](http://thesweetsetup.com/apps/favorite-markdown-writing-app-mac/) and deservedly so. While Byword does offer a Markdown preview to quickly ensure everything is formatted correctly, its functionality is limited. Marked on the other hand is a Markdown processing powerhouse. It offers many advanced options to both preview and export HTML such as MultiMarkdown and GitHub Flavored Markdown. If you maintain a blog it’s the best $14 you’ll ever spend. I wrote an AppleScript that allows me to author posts in Byword and automatically preview them in Marked with a simple hotket. I use <kbd>command</kbd> + <kbd>shift</kbd> + <kbd>m</kbd>.

```applescript
tell application "Byword"
    activate
    set the_document to document 1
    save the_document
    tell application "Marked 2"
        set the_file to the_document's file
        open the_file
        activate
    end tell
end tell
```

I use [Keyboard Maestro](http://www.keyboardmaestro.com/main/) to invoke the script but [FastScripts](http://www.red-sweater.com/fastscripts/) and [Alfred](http://www.alfredapp.com/) can both do the job. Conveniently, it will automatically prompt you to save the file in Byword if you're working on a brand new document. Once saved, invoking the script again will provide the desired result. If you’re an iA Writer fan[^{{ page.date | date: "%m%d%Y%H%M" }}1] the same script will work by simply replacing the reference to Byword with iA Writer.

[^{{ page.date | date: "%m%d%Y%H%M" }}1]: Which I'm not, long story.
