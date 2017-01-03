$.bigfoot({
  actionOriginalFN: "ignore",
  numberResetSelector: "article",
  buttonMarkup: (
    "<div class='footnote-container'>" +
    "<a href=\"#\" class=\"footnote-button\" " +
    "id=\"{{SUP:data-footnote-backlink-ref}}\" " +
    "data-footnote-number=\"{{FOOTNOTENUM}}\" " +
    "data-footnote-identifier=\"{{FOOTNOTEID}}\" " +
    "alt=\"See Footnote {{FOOTNOTENUM}}\" " +
    "rel=\"footnote\"" +
    "data-footnote-content=\"{{FOOTNOTECONTENT}}\">" +
    "{{FOOTNOTENUM}}" +
    "</a></div>"
  ),
})
