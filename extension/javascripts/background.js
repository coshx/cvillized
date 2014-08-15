var cvillizedBackground = {
  // TODO: grab these default rules from the server
  rules: [
    new Rule({
      name: 'f-bomb',
      description: "globally turn the f-word into an f-bomb",
      search: 'fuck',
      img: 'images/f-bomb.png',
      imgAlt: 'f-bomb',
      enabled: true
    }),
    new Rule({
      name: 'poo',
      description: "globally turn poo words into poo",
      search: 'poop(?:y)?|shit(?:ty)?|crap(?:py)?',
      img: 'images/poo.png',
      enabled: true
    }),
    new Rule({
      name: 'stupid',
      description: "stupid is as stupid does",
      search: 'stupid[a-z]*\\b',
      txt: 'stupendous',
      enabled: true
    })
  ],

  sendRulesToPage: function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {rules: cvillizedBackground.rules});
    });
  },
  listenForRulesUpdates: function() {
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
      if (request.rules) {
        console.log("Got a rules update");
        cvillizedBackground.rules = request.rules;
        cvillizedBackground.sendRulesToPage();
      }
    });
  },

  listenForRulesRequests: function() {
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
      if (request.rulesRequest) {
        console.log("Got a rules request!");
        sendResponse({rules: cvillizedBackground.rules});
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
