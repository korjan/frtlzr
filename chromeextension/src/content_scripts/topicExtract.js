import lda from 'lda';
import {wordCount,getArticleElement} from '../utils';

export default function() {
  try {
  let articleEl = getArticleElement();
  let text = articleEl.innerText;

  var documents = text.match( /[^\.!\?]+[\.!\?]+/gm );
  var result = lda(documents, 1, 5);

  return result[0].map(r => r.term);
} catch (e) {
  return [];
}
}
