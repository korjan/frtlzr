import connectDDP from './connect-ddp';
import {aggregate, getInterestings} from './analysis-aggregator';

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  let response;
  if (message.analysis) {
    response = aggregate(message.analysis);
  }
  if (response) {
    sendResponse(response);
  }
});

(function loop() {
  getInterestings();
  setTimeout(loop, 1000);
})()


chrome.runtime.onConnect.addListener(connectDDP);
