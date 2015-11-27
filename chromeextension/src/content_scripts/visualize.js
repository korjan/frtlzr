import _ from 'lodash';

export default class Visualize {
  constructor() {
    // Get results from API
    const apiResults = this.getApiResults();

    // Add classes to links
    this.setupLinks(apiResults);
    // setTimeout(() => this.setupLinks(apiResults), 1000);

    // Toggle view
    document.onkeydown = this.onKeyDown;
    document.onkeyup = this.onKeyUp;
  }

  getApiResults() {
    return [
      { // medium
        url: 'https://medium.com/@lawham/phonetic-table-for-trolls-f03c05dc7f6a',
        bullshit: 1
      }, {
        url: 'https://medium.com/@Asher_Wolf/here-s-to-not-hating-other-parents-b34ee8dd8c7d',
        bullshit: 1
      }, {
        url: 'https://medium.com/@Asher_Wolf/here-s-to-not-hating-other-parents-b34ee8dd8c7d',
        bullshit: 1
      }, { // nu.nl
        url: '/binnenland/4173018/supporters-ajax-stappen-rechter-aanwezigheid-bij-fc-utrecht.html',
        bullshit: 1
      }, {
        url: '/binnenland/4172847/kuipverbod-en-werkstraffen-geeist-feyenoordfans-in-rome-zaak.html',
        bullshit: 1
      }, {
        url: '/politiek/4172867/akkoord-opvang-huisvesting-en-integratie-asielzoekers.html',
        bullshit: 1
      }, { // hackernews
        url: 'http://russell-j.com/0583TS.HTM',
        bullshit: 1
      }, {
        url: 'http://alchemy.cs.washington.edu/',
        bullshit: 1
      }, {
        url: 'https://labs.kunstmaan.be/blog/ios-continuous-delivery-with-jenkins-and-fastlane',
        bullshit: 1
      }, {
        url: 'http://blog.nobugware.com/post/2015/listening_to_satellites_for_30_dollars/',
        bullshit: 1
      }, {
        url: 'http://engineering.linkedin.com/network-performance/tcp-over-ip-anycast-pipe-dream-or-reality',
        bullshit: 1
      }, {
        url: 'http://nautil.us/issue/30/identity/is-farmed-salmon-really-salmon',
        bullshit: 1
      }, {
        url: 'https://www.quantamagazine.org/20141015-at-the-far-ends-of-a-new-universal-law/',
        bullshit: 1
      }, {
        url: 'https://news.ycombinator.com/item?id=10634732',
        bullshit: 1
      }, {
        url: 'http://fibbing.github.io/',
        bullshit: 1
      }, {
        url: 'http://the.gregor.institute/papers/ecoop2011-richards-eval.pdf',
        bullshit: 1
      }, {
        url: 'https://www.nginx.com/blog/capturing-5xx-errors-debug-server/',
        bullshit: 1
      }, {
        url: 'http://news.nationalgeographic.com/2015/11/151124-spiders-webs-tennessee-nation-science-animals/',
        bullshit: 1
      }
    ];
  }

  setupLinks(apiResults) {
    _.each(apiResults, apiResult => {
      const selector = `[href*="${apiResult.url}"]`;
      const domNodes = document.querySelectorAll(selector);
      _.each(domNodes, domNode => this.setupLink(apiResult, domNode));
    });
  }

  setupLink(apiResult, domNode) {
    domNode.classList.add('--bs--link');

    if (apiResult.bullshit) {
      domNode.classList.add('--bs--link-bullshit');
    }

    if (apiResult.interesting) {
      domNode.classList.add('--bs--link-interesting');
    }
  }

  onKeyDown(e) {
    if(e.altKey) {
      document.body.classList.add('--bs--enabled');
    }
  }

  onKeyUp(e) {
    document.body.classList.remove('--bs--enabled');
  }
}
