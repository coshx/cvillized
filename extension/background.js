// Based on Google's sample from https://developer.chrome.com/extensions/examples/api/pageAction/pageaction_by_url.zip

// When the extension is installed or upgraded ...
chrome.runtime.onInstalled.addListener(function() {
  // Replace all rules ...
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    // With a new rule ...
    chrome.declarativeContent.onPageChanged.addRules([
      {
        // That fires when a page's URL contains 'facebook' ...
        conditions: [
          // TODO: use chrome.devtools.inspectedWindow.eval() to check for fb comments?
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { urlContains: 'facebook' },
          })
        ],
        // And shows the extension's page action.
        actions: [ new chrome.declarativeContent.ShowPageAction() ]
      }
    ]);
  });
});
