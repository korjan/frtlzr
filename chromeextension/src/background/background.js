import _ from 'lodash';
import connectDDP from './connect-ddp';
import {aggregate, getInterestings} from './analysis-aggregator';

var shart = window.shart || new Asteroid("localhost:3000");
connectDDP(shart);

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  let response;

  if (message.analysis) {
    response = aggregate(message.analysis);
    let interestings = getInterestings();
    if (!_.isEmpty(interestings)) {
      console.log('added interesting', interestings);
      shart.call('addInteresting', interestings);
    }
  }

  if (response) {
    sendResponse(response);
  }
});

chrome.browserAction.onClicked.addListener(tab => {
  console.log('added bullshit', tab.url)
  shart.call('addBS', tab.url);
})
