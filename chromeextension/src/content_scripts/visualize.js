import _ from 'lodash';

export default class Visualize {
  constructor() {
    // Get results from API
    this.getApiResults()
      .then(apiResults => this.setupLinks(apiResults))
      .catch(err => console.warn('Failed to get bullshit', err));

    // Toggle view
    document.onkeydown = this.onKeyDown;
    document.onkeyup = this.onKeyUp;
  }

  getApiResults() {
    return new Promise(function(resolve, reject) {
      const urls = _.chain(document.querySelectorAll('a'))
        .map(a => _.first(a.href.split('?')))
        .uniq()
        .value();

      $.ajax({
        type: 'POST',
        url: 'https://cowdung.herokuapp.com/api/classify',
        data: { urls: urls },
        success: resolve,
        error: reject
      });
    });

    return [
      { // medium
        url: 'https://medium.com/@lawham/phonetic-table-for-trolls-f03c05dc7f6a',
        bullshit: 0.8
      }, {
        url: 'https://medium.com/@Asher_Wolf/here-s-to-not-hating-other-parents-b34ee8dd8c7d',
        bullshit: 0.5
      }, {
        url: 'https://medium.com/@Asher_Wolf/here-s-to-not-hating-other-parents-b34ee8dd8c7d',
        bullshit: 0.8
      }, { // nu.nl
        url: '/politiek/4173073/kabinet-maakt-jaar-350-miljoen-vrij-opvang-vluchtelingen.html',
        bullshit: 0.5
      }, {
        url: '/beurs/4173100/wall-street-opent-kalm-halve-handelsdag.html',
        bullshit: 0.8
      }, {
        url: '/buitenland/4173080/poetin-weigert-contact-met-erdogan-.html',
        bullshit: 0.8
      }, {
        url: '/politiek/4173073/kabinet-maakt-jaar-350-miljoen-vrij-opvang-vluchtelingen.html',
        bullshit: 0.8
      }, {
        url: '/binnenland/4173047/geen-toename-aantal-discriminatieklachten-taboe-melden.html',
        bullshit: 0.8
      }, {
        url: '/buitenland/4172855/frankrijk-herdenkt-slachtoffers-aanslagen-parijs.html',
        bullshit: 0.2
      }, {
        url: '/binnenland/4172847/kuipverbod-en-werkstraffen-geeist-feyenoordfans-in-rome-zaak.html',
        bullshit: 0.2
      }, {
        url: '/aanslag-parijs/4172882/twee-arrestaties-bij-huiszoekingen-in-belgie.html',
        bullshit: 0.5
      }, {
        url: '/beurs/4173100/dunne-handel-verwacht-wall-street.html',
        bullshit: 0.5
      }, {
        url: '/voetbal/4173109/van-aken-maakt-rentree-bij-heerenveen-vitesse-mist-kashia-nec.html',
        bullshit: 0.5
      }, { // hackernews
        url: 'http://russell-j.com/0583TS.HTM',
        bullshit: 0.7
      }, {
        url: 'http://alchemy.cs.washington.edu/',
        bullshit: 0.7
      }, {
        url: 'https://labs.kunstmaan.be/blog/ios-continuous-delivery-with-jenkins-and-fastlane',
        bullshit: 0.5
      }, {
        url: 'http://blog.nobugware.com/post/2015/listening_to_satellites_for_30_dollars/',
        bullshit: 1
      }, {
        url: 'http://engineering.linkedin.com/network-performance/tcp-over-ip-anycast-pipe-dream-or-reality',
        bullshit: 0.1
      }, {
        url: 'http://nautil.us/issue/30/identity/is-farmed-salmon-really-salmon',
        bullshit: 0.2
      }, {
        url: 'https://www.quantamagazine.org/20141015-at-the-far-ends-of-a-new-universal-law/',
        bullshit: 0.2
      }, {
        url: 'https://news.ycombinator.com/item?id=10634732',
        bullshit: 0.2
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
      const relativePath = _.last(apiResult.url.split(window.location.hostname));
      const selector = `[href*="${relativePath}"]`;
      const domNodes = document.querySelectorAll(selector);
      _.each(domNodes, domNode => this.setupLink(apiResult, domNode));
    });
  }

  setupLink(apiResult, domNode) {
    domNode.classList.add('--bs--link');

    // if (apiResult.bullshit) {
      domNode.classList.add('--bs--link-bullshit');
      domNode.classList.add(`--bs--link-bullshit-0-5`);
      // domNode.classList.add(`--bs--link-bullshit-${apiResult.bullshit.toString().replace('.', '-')}`);
    // }
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
