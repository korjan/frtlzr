import _ from 'lodash';

export default class Visualize {
  constructor() {
    // Get results from API
    const apiResults = this.getApiResults();

    // Add classes to links
    this.setupLinks(apiResults);

    // Toggle view
    document.onkeydown = this.onKeyDown;
    document.onkeyup = this.onKeyUp;
  }

  getApiResults() {
    return [
      // medium
      {
        url: 'https://medium.com/@lawham/phonetic-table-for-trolls-f03c05dc7f6a',
        bullshit: 1
      }, {
        url: 'https://medium.com/@Asher_Wolf/here-s-to-not-hating-other-parents-b34ee8dd8c7d',
        bullshit: 1
      }, {
        url: 'https://medium.com/@Asher_Wolf/here-s-to-not-hating-other-parents-b34ee8dd8c7d',
        bullshit: 1
      },
      // nu.nl
      {
        url: '/binnenland/4173018/supporters-ajax-stappen-rechter-aanwezigheid-bij-fc-utrecht.html',
        bullshit: 1
      },
      {
        url: '/binnenland/4172847/kuipverbod-en-werkstraffen-geeist-feyenoordfans-in-rome-zaak.html',
        bullshit: 1
      },
      {
        url: '/politiek/4172867/akkoord-opvang-huisvesting-en-integratie-asielzoekers.html',
        bullshit: 1
      },
    ];
  }

  setupLinks(apiResults) {
    _.each(apiResults, apiResult => {
      const domNodes = document.querySelectorAll(`[href^="${apiResult.url}"]`);
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
