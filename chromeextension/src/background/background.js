import _ from 'lodash';
import connectDDP from './connect-ddp';
import {aggregate, getInterestings} from './analysis-aggregator';

var shart = window.shart || new Asteroid("localhost:3000");
window.shart = shart;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  let response;
  
  if (message.analysis) {
    response = aggregate(message.analysis);
    let interestings = getInterestings();
    if (!_.isEmpty(interestings)) {
      shart.call('addInteresting', interestings);
    }
  }

  if (response) {
    sendResponse(response);
  }
});

chrome.runtime.onConnect.addListener(connectDDP(shart));
