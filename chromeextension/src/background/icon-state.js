import _ from 'lodash';
import { canonicalUrl } from '../utils';

export default class IconState {
  constructor(shart) {
    this.shart = shart;
    this.isSaved = null;
    this.isVisualized = null;
    this.tabId = null;

    this.shart.subscribe('bsForUser').ready.then(() => {
      this.bsCollection = this.shart.getCollection('PageRank');
    });
  }

  setForTabId(tabId) {
    this.tabId = tabId;

    chrome.tabs.get(this.tabId, tab => {
      const canonical = canonicalUrl(tab.url);
      const bsQuery = this.bsCollection.reactiveQuery({
        _id: canonical
      });

      console.log('bs:', bsQuery.result);
      this.isSaved = !_.isEmpty(bsQuery.result) && !_.isEmpty(bsQuery.result[0].bullshit);
      this.updateIcon();
    });
  }

  updateIcon() {
    console.log('this.isSaved', this.isSaved);

    chrome.browserAction.setIcon({
      tabId: this.tabId,
      path: {
        "19": `icons/open-${ this.isSaved ? 'active-' : '' }19.png`,
        "38": `icons/open-${ this.isSaved ? 'active-' : '' }76.png`
      }
    });
  }
}
