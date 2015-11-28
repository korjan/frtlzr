import _ from 'lodash';
import {wordCount,getArticleElement,canonicalUrl} from '../utils';

export default class Visualize {
  constructor(topics) {
    console.log('topics',topics)
    this.topics = topics;

    let getTopicGiphy = this.getGiphy();
    // Get results from API
    (function loop() {
    Promise.all([this.getApiResults(), getTopicGiphy])
      .then(([apiResults, topicGiphy]) => this.setupLinks(apiResults, topicGiphy))
      .catch(err => {
        throw err;
        console.warn('Failed to get bullshit', err)
      });
      setTimeout(loop.bind(this), 1000);
    }.bind(this))();

    // Toggle view
    document.onkeydown = this.onKeyDown;
    document.onkeyup = this.onKeyUp;
  }

  getApiResults() {
    return new Promise(function(resolve, reject) {
      let urls = _.chain(document.querySelectorAll('a'))
        .filter(a => a.href)
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

  getGiphy() {
    return new Promise((resolve, reject) => {
      if (!this.topics || this.topics.length < 1) {
        return resolve(null);
      }

      $.ajax({
        type: 'GET',
        url: 'http://api.giphy.com/v1/gifs/search?q=' + encodeURIComponent(this.topics[0]) + '&api_key=dc6zaTOxFJmzC&limit=1&offset=0',
        success: function(data) {
          try {
            console.log('giphy', data);
            resolve(data.data[0].images['original'].url)
          }
          catch (e) {
            resolve(null);
          }
        },
        error: reject
      });
    });
  }

  setupLinks(apiResults, topicGiphy) {

    _.each(apiResults, apiResult => {
      if (apiResult.url == canonicalUrl(window.location.href)) {

        if (document.querySelectorAll('.--bs--article').length < 1) {
          let articleEl = getArticleElement();
          console.log('articleEl',articleEl)
          articleEl.classList.add('--bs--article');

          if (topicGiphy) {
            let img = document.createElement('img');
            img.style.backgroundImage = `url(${topicGiphy})`;
            // img.src = topicGiphy; //'http://media3.giphy.com/media/yoJC2qNujv3gJWP504/giphy.gif';
            img.className = '--bs--image';
            console.log(img);
            document.body.appendChild(img);
          }


        }

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
