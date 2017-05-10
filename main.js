
var clicked = {};

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
   if(changeInfo.status == "complete"){
     chrome.browserAction.setIcon({path: "icon2.png"});
     clicked[tabId] = clicked[tabId] || {};
     clicked[tabId].loading = false;
     clicked[tabId].opened = false;
   }
   if(changeInfo.status == "loading"){
     clicked[tabId] = clicked[tabId] || {};
     clicked[tabId].loading = true;
     chrome.browserAction.setIcon({path: "icon2_disabled.png"});
   }
});

chrome.browserAction.onClicked.addListener(function(tab) {

    chrome.tabs.query({
        'active': true,
        'lastFocusedWindow': true
    }, function(tabs) {

        if( !clicked[tabs[0].id].opened && !clicked[tabs[0].id].loading){
            clicked[tabs[0].id].opened = true;
            chrome.browserAction.setIcon({path: "icon2_disabled.png"});
        }else{
          return;
        }

        var _nocache = new Date().getTime();

        chrome.tabs.executeScript(null, {

            code: "var script = document.createElement('link');" +
                "script.setAttribute('rel', 'stylesheet');" +
                "script.setAttribute('href', 'http://localhost:8081/main.css?" + _nocache +"');" +
                "document.head.appendChild(script);"
        });
    });
});
