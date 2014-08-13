
var cvillized = {
  apiUrl: "http://localhost:3000/extension/analyze_comment.json",

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
      // Get thread id and comment id from from Facebook
      $(el).attr('data-reactid').match(/.+comment([0-9]+)\_([0-9]+).+/)
      var threadId = RegExp.$1
      var commentId = RegExp.$2
      if($(el).attr('data-cvillized') != 'true') {
      	$(el).text("[cvillized is analyzing this comment...");
	      cvillized.analyzeComment({commentHtml: origHtml, threadId: threadId, commentId: commentId}, function(newHtml) {
	        $(el).html(newHtml);
	        $(el).attr('data-cvillized', 'true')
	      });
      }
    });
  },

  // ansync
  analyzeComment: function(apiArgs, callback) {
  	$.get(cvillized.apiUrl, apiArgs).done(function(data) {
  		callback(data.replacementHtml);
  	});
  }

};

console.log("registering DOM Change Listener");
cvillized.registerDOMChangeListener();
