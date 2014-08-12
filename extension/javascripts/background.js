// currently content is injected via manifest.json
// so this is unneeded.
// TODO: figure out how to inject content into facebook and other sites using fb comments

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
