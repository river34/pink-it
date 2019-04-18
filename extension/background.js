// background.js
console.log("background.js is enabled");

var enabled = false;

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function (tab) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, { "message": "clicked_browser_action" });
    });
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.message === "get_pink_it_enabled") {
        chrome.tabs.sendMessage(sender.tab.id, { "message": "reply_pink_it_enabled", "value": enabled });
    } else if (request.message === "set_pink_it_enabled") {
        enabled = request.value;
    }
});

// TODO: save and read data from local storage - haven't figured out 