import _ from 'lodash';
import {wordCount,getArticleElement,canonicalUrl} from '../utils';

export default class Visualize {
  constructor(iconState) {
    this.iconState = iconState;

    // Get results from API
    (function loop() {
    this.getApiResults()
      .then(apiResults => this.setupLinks(apiResults))
      .catch(err => console.warn('Failed to get bullshit', err));
      setTimeout(loop.bind(this), 1000);
    }.bind(this))();

    // Toggle view
    document.onkeydown = this.onKeyDown;
    document.onkeyup = this.onKeyUp;
  }

  getApiResults() {
    return new Promise(function(resolve, reject) {
      let urls = _.chain(document.querySelectorAll('a'))
        .map(a => _.first(a.href.split('?')))
        .uniq()
        .value();

      urls.push(window.location.href);

      $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/api/classify',
        data: { urls: urls },
        success: resolve,
        error: reject
      });
    });
  }

  setupLinks(apiResults) {
    _.each(apiResults, apiResult => {
      if (apiResult.url == canonicalUrl(window.location.href)) {
        let articleEl = getArticleElement();
        articleEl.classList.add('--bs--article');
      } else {
        const relativePath = _.last(apiResult.url.split(window.location.hostname));
        const selector = `[href*="${relativePath}"]`;
        const domNodes = document.querySelectorAll(selector);
        _.each(domNodes, domNode => this.setupLink(apiResult, domNode));
      }
    });
  }

  setupLink(apiResult, domNode) {
    domNode.classList.add('--bs--link');

    // if (apiResult.bullshit) {
      domNode.classList.add('--bs--link-bullshit');
      domNode.classList.add('--bs--link-bullshit-0-5');
      // domNode.classList.add(`--bs--link-bullshit-${apiResult.bullshit.toFixed(1).replace('.', '-')}`);
    // }
  }

  onKeyDown(e) {
    if(e.altKey) {
      document.body.classList.add('--bs--enabled');
      chrome.runtime.sendMessage({ type:'visualize-changed', isVisualized:true });
    }
  }

  onKeyUp(e) {
    document.body.classList.remove('--bs--enabled');
    chrome.runtime.sendMessage({ type:'visualize-changed', isVisualized:false });
  }
}
