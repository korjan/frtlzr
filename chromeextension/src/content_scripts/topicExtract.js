import lda from 'lda';

export default function() {
  let articleEl = getArticleElement();
  let text = articleEl.innerText;
  var documents = text.match( /[^\.!\?]+[\.!\?]+/g );
  var result = lda(documents, 1, 5);
  return result[0].map(r => r.term);
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
