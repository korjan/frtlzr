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
      shart.call('addInteresting', interestings);
    }
  }

  if (response) {
    sendResponse(response);
  }
});

chrome.browserAction.onClicked.addListener(tab => {
  console.log('bullshit!', tab.url)
  shart.call('toggleBS', tab.url);
})

shart.subscribe('bsForUser').ready.then(() => {
  const bsForUser = shart.getCollection('PageRank');
  const bsForUserQuery = bsForUser.reactiveQuery({});
  updateTabs(bsForUserQuery);
  bsForUserQuery.on("change", () => updateTabs(bsForUserQuery));
});


function updateTabs(bsForUserQuery) {
  chrome.tabs.query({}, (tabs) => {
    _.each(tabs, tab => {
      const isBs = _.find(bsForUserQuery.result, bs => {
        return tab.url.indexOf(bs._id) > -1 && _.indexOf(bs.bullshit, shart.userId) > -1;
      });

      chrome.browserAction.setIcon({
        tabId: tab.id,
        path: {
          "19": `icons/open-${ isBs ? '' : 'hollow-' }19.png`,
          "38": `icons/open-${ isBs ? '' : 'hollow-' }76.png`
        }
      });
    });
  });
}
