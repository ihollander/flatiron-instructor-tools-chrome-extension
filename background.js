chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({ batchId: 1012 });
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostEquals: "learn.co" }
          })
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()]
      }
    ]);
  });
});
chrome.tabs.onUpdated.addListener((tabId, change, tab) => {
  if (
    change.url &&
    change.url.startsWith("https://learn.co/curriculum/tracks")
  ) {
    console.log(change.url);
    // send a message to content.js
    chrome.tabs.sendMessage(tabId, {
      message: "URL_CHANGE",
      url: change.url
    });
  }
});
