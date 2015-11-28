import _ from 'lodash';

export default class Visualize {
  constructor() {
    // Get results from API
    this.getApiResults()
      .then(apiResults => this.setupLinks(apiResults))
      .catch(err => console.warn('Failed to get bullshit', err));

    // Toggle view
    document.onkeydown = this.onKeyDown;
    document.onkeyup = this.onKeyUp;
  }

  getApiResults() {
    return new Promise(function(resolve, reject) {
      const urls = _.chain(document.querySelectorAll('a'))
        .map(a => _.first(a.href.split('?')))
        .uniq()
        .value();

      if (urls.length === 0) {
        return resolve([]);
      }

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
      const relativePath = _.last(apiResult.url.split(window.location.hostname));
      const selector = `[href*="${relativePath}"]`;
      const domNodes = document.querySelectorAll(selector);
      _.each(domNodes, domNode => this.setupLink(apiResult, domNode));
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
    }
  }

  onKeyUp(e) {
    document.body.classList.remove('--bs--enabled');
  }
}
