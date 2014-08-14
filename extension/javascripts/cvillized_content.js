function decodeHtml(input){
  var e = document.createElement('div');
  e.innerHTML = input;
  return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
}

var cvillized = {
  rules: [],

  /* cvillize the page and register an event listener for changes to the page */
  init: function() {
    cvillized.cvillize();
    cvillized.registerDOMChangeListener();
    cvillized.requestRules();
    cvillized.listenForRulesUpdate();
  },

  listenForRulesUpdate: function() {
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
      if (request.rules) {
        cvillized.rules = request.rules;
        cvillized.cvillize();
      }
    });
  },

  requestRules: function() {
    chrome.runtime.sendMessage({rulesRequest: true}, function(response) {
      cvillized.rules = response.rules;
    });
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
    var contentElement = "body";
    if ($("#contentArea").length > 0) {
      contentElement = "#contentArea";
    }
    var contentHtml = $(contentElement).html();
    contentHtml = contentHtml.replace(rule.search, rule.html());

    $(contentElement).html(contentHtml);
  },

  cvillize: function() {
    _.each(cvillized.rules, cvillized.applyRule);
  },

};

$(function() {
  cvillized.init();
});
