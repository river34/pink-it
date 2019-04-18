// content.js
console.log("content.js is enabled");

// Called when loaded
reload();

var html_class_att;
var enabled = false;

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
        if (request.message === "clicked_browser_action") {
            toggle();
            console.log("clicked_browser_action");
        }
        if (request.message === "reply_pink_it_enabled") {
            enabled = request.value;
            console.log("reply_pink_it_enabled: " + enabled);
            setCSS(enabled);
        }
    }
);

function reload() {
    // Send message to extension
    chrome.runtime.sendMessage({ message: "get_pink_it_enabled" }, function (response) {
    });
}

function toggle() {
    enabled = !enabled;

    // Send message to extension
    chrome.runtime.sendMessage({ "message": "set_pink_it_enabled", "value": enabled }, function (response) { });

    setCSS(enabled);
}

function setCSS(enabled) {
    if (enabled) {
        var html = document.getElementsByTagName("html")[0];
        html_class_att = html.getAttribute("class");
        html.setAttribute("class", html_class_att + " pink-it-styles");
    } else {
        document.getElementsByTagName("html")[0].setAttribute("class", html_class_att);
    }
}