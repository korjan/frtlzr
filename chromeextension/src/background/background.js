import _ from 'lodash';
import connectDDP from './connect-ddp';
import {aggregate, getInterestings} from './analysis-aggregator';
import IconState from './icon-state';

var shart = window.shart || new Asteroid("localhost:3000");
connectDDP(shart);

var iconState = new IconState(shart);

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  let response;

  switch (message.type) {
    case 'analysis':
      response = onMessageAnalysis(message);
    break;

    case 'content-loaded':
      response = onMessageContentLoaded(message);
    break;

    case 'visualize-changed':
      response = onMessageVisualizeChanged(message);
    break;
  }

  if (response) {
    sendResponse(response);
  }
});

function onMessageAnalysis(message) {
  if (!message.analysis) return;

  let response = aggregate(message.analysis);
  let interestings = getInterestings();

  if (!_.isEmpty(interestings)) {
    shart.call('addInteresting', interestings);
  }

  return response;
}

function onMessageContentLoaded(message) {
  iconState.setIsSavedForCurrentTab();
}

function onMessageVisualizeChanged(message) {
  iconState.setIsVisualizeForCurrentTab(message.isVisualized);
}

chrome.browserAction.onClicked.addListener(tab => {
  shart.call('toggleBS', tab.url).result.then(() => {
    iconState.setIsSavedForTabId(tab.id)
  });
})

chrome.tabs.onActivated.addListener(e => {
  iconState.setIsSavedForTabId(e.tabId);
});
