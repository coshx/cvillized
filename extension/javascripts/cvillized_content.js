function decodeHtml(input){
  var e = document.createElement('div');
  e.innerHTML = input;
  return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
}

function setRuleComplementaryParams(rule) {
  rule.search = new RegExp(rule.search, 'gi')
  setRuleHtml(rule);
}
function setRuleHtml(rule) {
  var templateHtml, templateParams;

  if (rule.img) {
    templateHtml = '<img src="<%= img %>" alt="<%= imgAlt %>" height="24px"/>';
    templateParams = {
      img: chrome.extension.getURL(rule.img),
      imgAlt: rule.imgAlt
    }
  } else if (rule.txt) {
    templateHtml = '<%= txt %>';
    templateParams = { txt: rule.txt };
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
  templateParams.rule = rule;

  rule.html = _.template(templateHtml, templateParams);
}

var cvillized = {
  rules: [],

  /* cvillize the page and register an event listener for changes to the page */
  init: function() {
    cvillized.registerDOMChangeListener();
    cvillized.requestRules();
    cvillized.listenForRulesUpdate();
  },

  listenForRulesUpdate: function() {
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
      if (request.rules) {
        cvillized.updateRules(request.rules);
      }
    });
  },

  requestRules: function() {
    chrome.runtime.sendMessage({rulesRequest: true}, function(response) {
      cvillized.updateRules(response.rules);
    });
  },

  updateRules: function(rawRules) {
    cvillized.rules = [];
    _.each(rawRules, function(rawRule) {
      cvillized.rules.push(new Rule(rawRule));
    });
    cvillized.cvillize();
  },
  

  registerDOMChangeListener: function() {
    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
    var cvillize = _.debounce(cvillized.cvillize, 1500, true);
    var observer = new MutationObserver(function(mutations, observer) {
      cvillize();
    });
    observer.observe(document.querySelector(cvillized.globalSelector()), {
      subtree: true,
      childList: true,
      attributes: false,
      characterData: true
    });
  },

  globalSelector: function() {
    if(window.location.host.indexOf("facebook.com") != -1) {
      if($("[role^=article], .UFICommentBody").length > 0) {
        return "[role^=article], .UFICommentBody";
      }
    }
    else if(window.location.host.indexOf("twitter.com") != -1) {
      if($(".ProfileTweet-text, .tweet-text, .tweet").length > 0) {
        return ".ProfileTweet-text, .tweet-text, .tweet";
      }
    }
    else if(window.location.host.indexOf("google.") != -1) {
      if($("#res").length > 0) {
        return "#res";
      }
    }
    return "body";
  },

  applyRule: function(rule, rule_index) {
    console.log("Applying rule " + rule_index + ": " + rule.description);

    // Find all the matches on current page and replace them
    var contentElement = "body";
    if ($("#contentArea").length > 0) {
      contentElement = "#contentArea";
    }
    var contentHtml = $(contentElement).html();
    contentHtml = contentHtml.replace(rule.searchRegExp(), rule.html());

    $(contentElement).html(contentHtml);
  },

  cvillize: function() {
    _.each(cvillized.rules, cvillized.applyRule);
  }

};

$(function() {
  cvillized.init();
});
