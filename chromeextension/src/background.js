console.log('starting background frtlzr');

// https://developer.chrome.com/extensions/runtime#method-sendMessage
// Sends a single message to event listeners within your extension/app or a different extension/app.
// If sending to your extension, the runtime.onMessage event will be fired in each page

// Note that extensions cannot send messages to content scripts using this method.
// To send messages to content scripts, use tabs.sendMessage.
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {

  // Connect to a Meteor backend
  // shart.on('connected', function(h){
  //   console.log(shart);
  //   shart.loginWithGoogle();
  // });

// sender:  {id: "occchbnniakapelfkehpnjnpjhmcipna", url: "http://www.nu.nl/media/4056880/giel-beelen-biedt-excuses-oproep-cola-potloodtest.html", tab: Object, frameId: 0}
  console.log('om', message, sender);
  sendResponse({msg:'nope'});

// https://developer.chrome.com/extensions/tabs#method-query
  // chrome.tabs.query(object queryInfo, function callback);

  // Sends a single message to the content script(s) in the specified tab, with an optional callback to run when a response is sent back.
  // The runtime.onMessage event is fired in each content script running in the specified tab for the current extension.
  // chrome.tabs.sendMessage(integer tabId, any message, object options, function responseCallback);


  // Gets the tab that this script call is being made from.
  // May be undefined if called from a non-tab context (for example: a background page or popup view).
  chrome.tabs.getCurrent(function (current){
    console.log('current tab', current);
      });
});

chrome.runtime.onConnect.addListener(function (cb){
  console.log('onconnect', cb);

  var shart = window.shart || new Asteroid("localhost:3000");
  window.shart = shart;

  shart.on("connected", function () {
      // Asteroid doesn't expose the subscription directly. Fortunately, subscription calls are memoized
      // so you can safely call the subscribe method multiple times and it'll always return the same object
      shart.on("login", function loginWorked(loggedInUserId) {
        console.log('logged in as:' + loggedInUserId);
        shart.userId = loggedInUserId;
      });

      shart.resumeLoginPromise.then(function alreadyLoggedIn() {
        console.log("user is already logged in")
      }).fail(function notAlreadyLoggedIn() {
        console.log('user is not logged in');
        shart.loginWithGoogle();
      });
  });
});
