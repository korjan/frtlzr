// https://developer.chrome.com/extensions/runtime#method-sendMessage
// Sends a single message to event listeners within your extension/app or a different extension/app.
// Similar to runtime.connect but only sends a single message, with an optional response.
function message(){
  // chrome.extension.sendRequest({ msg: "startFunc" });
  //chrome.runtime.sendMessage('', 'a message', {}, function (cb){console.log('popup callback', cb);});

  // If sending to your extension, the runtime.onMessage event will be fired in each page
}

// https://developer.chrome.com/extensions/runtime#method-connect
// Attempts to connect to connect listeners within an extension/app (such as the background page),
// or other extensions/apps.
// This is useful for content scripts connecting to their extension processes, inter-app/extension communication,
// and web messaging.
// Note that this does not connect to any listeners in a content script. Extensions may connect to content scripts embedded in tabs via tabs.connect.
function connect(){
  var port = chrome.runtime.connect();
  port.postMessage("popup does this go?");
}

document.addEventListener('DOMContentLoaded', function () {

  document.getElementById("theButton").addEventListener("click",function(e){
    console.log('clicked');
    message();
  });
});
