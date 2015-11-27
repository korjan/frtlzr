import _ from 'lodash';

function everyTimeUnit(callback) {
  var epoch = Date.now();
  var timeout = 1000;
  var visible = true;

  (function heartbeat() {
    if (visible) {
      callback(timeout);
    }
    setTimeout(heartbeat, timeout);
  })();

  document.addEventListener(
    "webkitvisibilitychange",
    () => visible = !document.hidden
  );
}

// inspired by http://rodp.me/2015/how-to-extract-data-from-the-web.html
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


export default function analyze() {
  var articleEl = getArticleElement();
  //let words = wordCount(articleEl);
  //console.log('word count', words);
  everyTimeUnit(time => {
    let activeScreenSpaces = getActiveScreenSpaces(articleEl);
    activeScreenSpaces.forEach(activeScreenSpace => {
      emit(
        document.location.href,
        activeScreenSpace.top,
        activeScreenSpace.bottom,
        time
      );
    });
  });
};

// TODO we kijken nu alleen nog maar naar het hele scherm
function getActiveScreenSpaces(articleEl) {
  let articleBox = articleEl.getBoundingClientRect();
  //document.scrollingElement.clientHeight
  //document.scrollingElement.scrollTop
  //window.innerHeight
  return [{top:0, bottom:articleBox.height}];
}

function emit(url, top, bottom, time) {
  console.log('emit');
  chrome.runtime.sendMessage('', {analysis:{url, top, bottom, time}}, function (cb){
    console.log('HALO MET CALLBACK', cb);
  });

}
