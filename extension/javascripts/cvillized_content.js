function decodeHtml(input){
  var e = document.createElement('div');
  e.innerHTML = input;
  return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
}

function Rule(data) {
  this.description = data.description;
  this.domain = data.domain;
  this.search = data.search;
  this.img = data.img;
  this.imgAlt = data.imgAlt;
  if (!this.imgAlt) {
    this.imgAlt = 'cvillized replacement';
  }
  this.txt = data.txt;

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

    return _.template(templateHtml, templateParams);
  }
}

var cvillized = {
  rules: [
    new Rule({
      description: "globally turn the f-word into an f-bomb",
      search: /fuck/ig,
      img: 'images/f-bomb.png',
      imgAlt: 'f-bomb'
    }),
    new Rule({
      description: "globally turn poo words into poo",
      search: /poop(?:y)?|shit(?:ty)?|crap(?:py)?/ig,
      img: 'images/poo.png'
    }),
    new Rule({
      description: "stupid is as stupid does",
      search: '/stupid[a-z]*\b/ig',
      txt: 'stupendous'
    })
  ],

  /* cvillize the page and register an event listener for changes to the page */
  init: function() {
    cvillized.cvillize();
    cvillized.registerDOMChangeListener();
  },

  registerDOMChangeListener: function() {
    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
    var cvillize = _.debounce(cvillized.cvillize, 1500, true);
    var observer = new MutationObserver(function(mutations, observer) {
      cvillize();
    });
    observer.observe(document, {
      subtree: true,
      childList: true,
      attributes: false
    });
  },

  applyRule: function(rule, rule_index) {
    console.log("Applying rule " + rule_index + ": " + rule.description);
    // TODO: check if rule.domain matches current page

    // Find all the matches on current page and replace them
    var bodyHtml = $("#contentArea").html();
    bodyHtml = bodyHtml.replace(rule.search, rule.html());

    $("#contentArea").html(bodyHtml);
  },

  cvillize: function() {
    _.each(cvillized.rules, cvillized.applyRule);
  },

};

$(function() {
  cvillized.init();
});
