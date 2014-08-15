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
    cvillized.requestRules();
    cvillized.listenForRulesUpdate();
  },

  listenForRulesUpdate: function() {
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
      if (request.rules) {
        cvillized.rules = request.rules;
        _.each(cvillized.rules, setRuleComplementaryParams);
        cvillized.cvillize();
      }
    });
  },

  requestRules: function() {
    chrome.runtime.sendMessage({rulesRequest: true}, function(response) {
      cvillized.rules = response.rules;
      _.each(cvillized.rules, setRuleComplementaryParams);
      $(function() {
        cvillized.cvillize();
        cvillized.registerDOMChangeListener();
      });
    });
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
    // TODO: check if rule.domain matches current page

    // Find all the matches on current page and replace them
    var selector = cvillized.globalSelector();
    $(selector).each( function() {
      var globalHtml = $(this).html();
      // Ignore attributes thanks to split, so we don't replace some text in some 
      // attribute by an image
      var reg = new RegExp(/(?:(?: *[a-z-]+= *(?:\"|\').*?(?:\"|\'))+)/gim);
      var globalHtmlPartsWithoutAttributes = globalHtml.split(reg);
      _.each(globalHtmlPartsWithoutAttributes, function(partialHtml) {
        // Apply the rule for each partial
        var newPartialHtml = partialHtml.replace(rule.search, rule.html);
        globalHtml = globalHtml.replace(partialHtml, newPartialHtml);
      });
      $(this).html(globalHtml);
    });
  },

  cvillize: function() {
    _.each(cvillized.rules, cvillized.applyRule);
  }

};

$(function() {
  cvillized.init();
});
