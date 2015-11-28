export default function() {
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

  return authors;
};
