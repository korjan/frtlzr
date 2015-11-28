import Visualize from './visualize';
import analyze from './analyze';
const visualize = new Visualize();
import topicExtract from './topicExtract';
import authors from './authors';

analyze();

console.log('meta', {
  authors: authors(),
  url : window.location.href,
  topics: topicExtract()
})

$.ajax({
  type: "POST",
  url: "http://localhost:3000/api/meta",
  data: {
    authors: authors(),
    url : window.location.href,
    topics: topicExtract()
  },
  success: () => console.log('succes!'),
  dataType: "json"
});

chrome.runtime.sendMessage({ type:'content-loaded' });
