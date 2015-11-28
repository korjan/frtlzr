import Visualize from './visualize';
import analyze from './analyze';
import topicExtract from './topicExtract';
import authors from './authors';

analyze();
let topics = topicExtract();
const visualize = new Visualize(topics);

console.log('meta', {
  authors: authors(),
  url : window.location.href,
  topics: topics
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
