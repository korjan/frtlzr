import _ from 'lodash';

export default class Visualize {
  constructor() {
    console.log('o')
    // Get results from API

    const apiResults = [
      {
        url: 'https://medium.com/@lawham/phonetic-table-for-trolls-f03c05dc7f6a',
        score: 1
      }, {
        url: 'https://medium.com/@jblake17/a-historic-day-for-the-world-of-competitive-rubik-s-cube-solving-33a92a5f3d1c',
        score: 0
      }, {
        url: 'https://medium.com/@Asher_Wolf/here-s-to-not-hating-other-parents-b34ee8dd8c7d',
        score: -1
      },
    ];

    // Add classes to links

    _.each(apiResults, apiResult => {
      const domNodes = document.querySelectorAll(`[href^="${apiResult.url}"]`);

      _.each(domNodes, domNode => {
        domNode.classList.add('--bs--link');

        switch (apiResult.score) {
          case 0: domNode.classList.add('--bs--link-neutral'); break;
          case 1: domNode.classList.add('--bs--link-positive'); break;
          case -1: domNode.classList.add('--bs--link-negative'); break;
        }
      });
    });

    // Toggle view

    document.onkeydown = e => {
      if(e.altKey) {
        document.body.classList.add('--bs--enabled');
      }
    };

    document.onkeyup = e => {
      document.body.classList.remove('--bs--enabled');
    };
  }
}
