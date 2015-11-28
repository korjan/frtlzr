import Visualize from './visualize';
import analyze from './analyze';
const visualize = new Visualize();

analyze();

var metas = document.getElementsByTagName('meta');
let authors = [];

for (var i=0; i<metas.length; i++) {

  if (metas[i].getAttribute("name") == "author") {
     console.log('author:', metas[i].getAttribute("content"));
     authors.push(metas[i].getAttribute("content"));
  }

	if (metas[i].getAttribute("name") == "article:author") {
     console.log('author:', metas[i].getAttribute("content"));
     authors.push(metas[i].getAttribute("content"));
  }
}

var authorsAsItemProp = document
	.querySelectorAll('[itemprop=author]')

for (var i=0; i<authorsAsItemProp.length; i++) {
//  console.log("meta", metas[i].getAttribute('name'), metas[i].getAttribute('content'));
  	console.log('author:', authorsAsItemProp[i].innerText);
    authors.push(authorsAsItemProp[i].innerText);
}

var onSucces = function(e){
  console.log('succes', e);
}

$.ajax({
  type: "POST",
  url: "http://localhost:3000/api/author",
  data: {authors: authors, url : window.location.href},
  success: onSucces,
  dataType: "json"
});
