// Injected into every tab
// 1. Retrieve all links and enricht them.
// 2. show the conversation, for example, better sources, twitter links mentioning this url

// TODO: use meteor API (anonymous REST call still?)
$.getJSON('https://manure.herokuapp.com/bs', function(data) {
    //data is the JSON string
    console.log('bs', data);

    data.forEach(function(el){
      selector = "a[href='"+ el.link + "']";
      console.log('sel', selector);
      $(selector).replaceWith('<span class="__frtlzr"><em>BULLSHIT</em></span>');

    });

    chrome.runtime.sendMessage('', 'a tab message', function (cb){console.log('popup callback', cb);});
});

// chrome.runtime.sendMessage(string extensionId, any message, object options, function responseCallback)
var port = chrome.runtime.connect();
port.postMessage("where does this go?");


// THE MEDIA are broken, people are misinformed.
// media are searching for a story.
// ASSUMPTION: more context about sources of information
// will lead to better decision and more empathy

// WHAT DOES MORE CONTEXT MEAN?
// > OTHER POINTS OF views
// > POINT of view of the source
// > what other people say about this source (likes)
// > what are better sources about this topic

var metas = document.getElementsByTagName('meta');

for (i=0; i<metas.length; i++) {
//  console.log("meta", metas[i].getAttribute('name'), metas[i].getAttribute('content'));
  if (metas[i].getAttribute("name") == "author") {
     console.log('author:', metas[i].getAttribute("content"));
  }
	if (metas[i].getAttribute("name") == "article:author") {
     console.log('author:', metas[i].getAttribute("content"));
  }
}

var authors = document
	.querySelectorAll('[itemprop=author]')

for (i=0; i<authors.length; i++) {
//  console.log("meta", metas[i].getAttribute('name'), metas[i].getAttribute('content'));
  	console.log('author:', authors[i].innerText);
}

// author : Bas Heijne ->
//  {twitter : https://twitter.com/Bjheijne, wikipedia: https://en.wikipedia.org/wiki/Bas_Heijne}
// article : http://www.nrc.nl/next/2015/10/24/piemel-1549342
// published in : nrc
// match : {
//	topics : {refugues, philosophy}
// }

// issue: authors are badly marked up
// => determine list of sources / publishers (nrc, ad, volkskrant, NONE )
// => get list of writers for sources
// => guess writer based on article text / writing style -> http://stackoverflow.com/questions/4771293/can-an-authors-unique-literary-style-be-used-to-identify-him-her-as-the-autho
