import _ from 'lodash';

var pages = {};

// TODO zet om naar 5 minutes voor productie
const FIVE_MINUTES = 20 * 1000;

const INTERESTING_THRESHOLD = 3 * 1000;

export function aggregate({url, top, bottom, time}) {
  pages[url] = pages[url] || {totalTime:0,sent:false,segments:{}};
  let screenId = `${top}x${bottom}`;
  pages[url].segments[screenId] = pages[url].segments[screenId] || 0;
  pages[url].segments[screenId] += time;
  pages[url].totalTime += time;
  pages[url].lastUpdateTime = Date.now();
}

export function getInterestings() {

  // is 5m geleden voor 't laatst geupdate
  let inactiveInterestingPages = _.filter(pages, page => {
    return Date.now() - page.lastUpdateTime >= FIVE_MINUTES;
  });

  let interestingPages = _.reduce(pages, (result, page, url) => {
    return !page.sent &&
      page.totalTime >= INTERESTING_THRESHOLD &&
      _.all(page.segments, s => s > INTERESTING_THRESHOLD) ?
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
