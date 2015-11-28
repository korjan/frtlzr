import _ from 'lodash';

export default class Visualize {
  constructor() {
    // Get results from API
    // (function loop() {
    this.getApiResults()
      .then(apiResults => this.setupLinks(apiResults))
      .catch(err => console.warn('Failed to get bullshit', err));
    //   setTimeout(loop, 1000);
    // }.bind(this))();

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
      if (apiResult.score == null) {
        return;
      }
      if (apiResult.url == window.location.href) {
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
    }
  }

  onKeyUp(e) {
    document.body.classList.remove('--bs--enabled');
  }
}







function getArticleElement() {
  var accum = [];
  loop(document.body);
  accum =  _.sortBy(accum, a => _.max(a[1])).reverse();
  accum = _.take(accum, 5);
  accum = _.sortBy(accum, a => wordCount(a[0])).reverse();

  return accum[0][0];

  function loop(el) {
    accum.push([el, _.countBy(el.children, c => c.tagName)]);
    _.toArray(el.children).forEach(loop);
  }
}

function wordCount(el) {
  try {
    return el.innerText.match(/\b\S+\b/g).length;
  }
  catch (e) {
    return 0;
  }
}
