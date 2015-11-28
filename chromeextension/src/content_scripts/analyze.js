import _ from 'lodash';
import {wordCount,getArticleElement} from '../utils';

function everyTimeUnit(callback) {
  var epoch = Date.now();
  var timeout = 1000;
  var visible = true;

  (function heartbeat() {
    if (!document.hidden && document.hasFocus()) {
      callback(timeout);
    }
    setTimeout(heartbeat, timeout);
  })();
}

export default function analyze() {
  var articleEl = getArticleElement();
  //let words = wordCount(articleEl);
  //console.log('word count', words);
  everyTimeUnit(time => {
    let activeScreenSpaces = getActiveScreenSpaces(articleEl);
    activeScreenSpaces.forEach(({top, bottom, inView}) => {
      emit(
        document.location.href,
        top,
        bottom,
        inView ? time : 0
      );
    });
  });
};

// TODO we kijken nu alleen nog maar naar het hele scherm
function getActiveScreenSpaces(articleEl) {
  let articleBox = articleEl.getBoundingClientRect();

  let viewport = window.innerHeight;
  let segment = 100;

  let viewportTop = articleBox.top < 0 ? Math.abs(articleBox.top) : -articleBox.top;
  let viewportBottom = viewportTop + viewport;

  let activeScreenSpaces = _.range(0, articleBox.height + segment, segment)
    .map(segmentTop => {
      let segmentBottom = segmentTop + segment;

      let inView = (segmentTop >= viewportTop && segmentTop <= viewportBottom) ||
                  (segmentBottom >= viewportTop && segmentBottom <= viewportBottom);

      return {
        top: segmentTop,
        bottom: segmentBottom,
        inView
      };
    });

  return activeScreenSpaces;
}

function emit(url, top, bottom, time) {
  chrome.runtime.sendMessage({ type:'analysis', analysis: { url, top, bottom, time } });
}
