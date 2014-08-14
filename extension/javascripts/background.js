// currently content is injected via manifest.json
// so this is unneeded.
// TODO: figure out how to inject content into facebook and other sites using fb comments
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

    // surround the replacement text to tag the rule we used
    templateHtml = '<span data-cvillized-rule="<%= rule.name %>">'
                    + '<span data-cvillized-replacement>'
                      + templateHtml 
                    + '</span>'
                  + '</span>';
    templateParams.rule = this;

    return _.template(templateHtml, templateParams);
  }
}

var cvillizedBackground = {
  // TODO: grab these default rules from the server
  rules: [
    new Rule({
      name: 'f-bomb',
      description: "globally turn the f-word into an f-bomb",
      search: /fuck/ig,
      img: 'images/f-bomb.png',
      imgAlt: 'f-bomb'
    }),
    new Rule({
      name: 'poo',
      description: "globally turn poo words into poo",
      search: /poop(?:y)?|shit(?:ty)?|crap(?:py)?/ig,
      img: 'images/poo.png'
    }),
    new Rule({
      name: 'stupid',
      description: "stupid is as stupid does",
      search: '/stupid[a-z]*\b/ig',
      txt: 'stupendous'
    })
  ],

  sendRulesToPage: function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {rules: rules});
    });
  },
  listenForRulesUpdates: function() {
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
      if (request.rules) {
        cvillizedBackground.rules = request.rules;
        cvillizedBackground.sendRulesToPage();
      }
    });
  }
  listenForRulesRequests: function() {
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
      if (request.rulesRequest) {
        console.log("Got a rules request!");
        sendResponse({rules: cvillizedBackground.rules});
      } else {
        console.log("Got some other request");
        sendResponse({rules: "dont got none"});
      }
    });
  }
}

cvillizedBackground.listenForRulesUpdates();
cvillizedBackground.listenForRulesRequests();

/*
var cvillizedBackground = {
  content_css: ["stylesheets/cvillized.css"],
  content_js: ["javascripts/jquery-2.1.1.min.js", "javascripts/cvillized.js"],

  getInjectionContentRule: function() {
    return {
      conditions: [
        // TODO: use chrome.devtools.inspectedWindow.eval to detect fb comment thread in any page
        new chrome.declarativeContent.PageStateMatcher({
          pageUrl: { urlContains: 'facebook' },
        })
      ],

      // This requires chrome 38+
      //actions: [ new chrome.declarativeContent.RequestContentScript({css: this.content_css, js: this.content_js}) ]      

      actions: [ 
        new chrome.declarativeContent.ShowPageAction(),
        new chrome.declarativeContent.RequestContentScript({css: this.content_css, js: this.content_js})
      ]

    }
  },

  addPageListener: function() {
    chrome.runtime.onInstalled.addListener(this.removeAndAddRules);
  },

  removeAndAddRules: function() {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, cvillizedBackground.addRules);
  },

  addRules: function() {
    chrome.declarativeContent.onPageChanged.addRules([cvillizedBackground.getInjectionContentRule()]);
  }
};

cvillizedBackground.addPageListener();
*/
