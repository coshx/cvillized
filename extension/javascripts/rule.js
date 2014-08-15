function Rule(data) {
  this.name = data.name;
  this.description = data.description;
  this.search = data.search;
  this.img = data.img;
  this.imgAlt = data.imgAlt;
  if (!this.imgAlt) {
    this.imgAlt = 'cvillized replacement';
  }
  this.txt = data.txt;

  this.searchRegExp = function() {
    if (!this._searchRegExp) {
      this._searchRegExp = new RegExp(this.search, "ig");
    }

    return this._searchRegExp;
  }

  this.html = function() {
    var templateHtml, templateParams;

    if (this.img) {
      templateHtml = '<img src="<%= img %>" alt="<%= imgAlt %>" height="24px"/>';
      templateParams = {
        img: chrome.extension.getURL(this.img),
        imgAlt: this.imgAlt
      }
    } else if (this.txt) {
      templateHtml = '<%= txt %>';
      templateParams = { txt: this.txt };
    } else {
      templateHtml = '<b>[hidden by cvillized]</b>';
      templateParams = {}
    }

    // TODO: surround the replacement 
    // image/text to indicate that we've already replaced it
    // so we don't keep finding the same word and nesting it deeper
    // (e.g. stupid in the name of the rule, rather than in the body text)
    // surround the replacement text to tag the rule we used
    templateParams.rule = this;

    return _.template(templateHtml, templateParams);
  }
}
