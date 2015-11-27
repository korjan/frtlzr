import _ from 'lodash';

var pages = {};

export function aggregate({url, top, bottom, time}) {
  pages[url] = pages[url] || {totalTime:0,sent:false};
  let screenId = `${top}x${bottom}`;
  pages[url][screenId] = pages[url][screenId] || 0;
  pages[url][screenId] += time;
  pages[url].totalTime += time;
  pages[url].lastUpdateTime = Date.now();
}

export function getInterestings() {
  // TODO even om te testen op 1 gezet!
  let fiveM = 20 * 1000;
  // is 5m geleden voor 't laatst geupdate
  let inactiveInterestingPages = _.filter(pages, page => {
    return Date.now() - page.lastUpdateTime >= fiveM;
  });

  // TODO we kijken nu alleen nog maar naar de totalTime
  // is minimaal een minuut gelezen
  let interestingPages = _.reduce(pages, (result, page, url) => {
    return !page.sent && page.totalTime >= fiveM ?
      result.concat([url]) :
      result;
  }, []);

  _.forEach(pages, (page, url) => {
    if (_.contains(interestingPages, url)) {
      page.sent = true;
    }
  });

  return interestingPages;
}
