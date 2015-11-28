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

  setIsSavedForCurrentTab() {
    chrome.tabs.query({ currentWindow: true, active: true }, tabs => {
      this.setIsSavedForTabId(tabs[0].id);
    });
  }

  setIsVisualizeForCurrentTab(isVisualized) {
    chrome.tabs.query({ currentWindow: true, active: true }, tabs => {
      this.tabId = tabs[0].id;
      this.isVisualized = isVisualized;
      this.updateIcon();
    });
  }

  setIsSavedForTabId(tabId) {
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
    const imageBase = `icons/${ this.isVisualized ? 'open' : 'closed' }-${ this.isSaved ? 'active-' : '' }`;

    chrome.browserAction.setIcon({
      tabId: this.tabId,
      path: {
        "19": `${imageBase}19.png`,
        "38": `${imageBase}76.png`
      }
    });
  }
}
