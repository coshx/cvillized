
var cvillized = {
  apiUrl: "http://localhost:3000/analyze_comment",

  registerDOMChangeListener: function() {
    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
    var removeComments = _.debounce(cvillized.analyzeComments, 1500, true);
    var observer = new MutationObserver(function(mutations, observer) {
      console.log("calling debounced function");
      removeComments();
    });
    observer.observe(document, {
      subtree: true,
      childList: true,
      attributes: false
    });
  },

  analyzeComments: function() {
    $(".UFICommentBody").each(function(index, el) { 
      var origHtml = $(el).html();
      $(el).text("[cvillized is analyzing this comment...");
      cvillized.analyzeComment(origHtml, function(newHtml) {
        $(el).html(newHtml);
      });
    });
  },

  // ansync
  analyzeComment: function(commentHtml, callback) {
  	$.post(cvillized.apiUrl, {comment: commentHtml}).done(function(newHtml) {
  		callback(newHtml);
  	});
  }

};

console.log("registering DOM Change Listener");
cvillized.registerDOMChangeListener();
