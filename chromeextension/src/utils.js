// inspired by http://rodp.me/2015/how-to-extract-data-from-the-web.html
export function getArticleElement() {
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

export function wordCount(el) {
  try {
    return el.innerText.match(/\b\S+\b/g).length;
  }
  catch (e) {
    return 0;
  }
}

export function canonicalUrl(url) {
  let noprotocol = url.replace(/.*?:\/\//g, "");
  return noprotocol.split(/[?#]/)[0];
}
