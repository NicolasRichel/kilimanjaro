/**
 * Statistics Service
 */

import * as utils from '../utils';

class StatisticsService {

  computeAll(operations, dates, labels) {
    // Init
    let total = 0;
    let totalPositive = 0;
    let totalNegative = 0;
    let totalByDate = dates.reduce(
      (obj, date) => Object.assign(obj, { [date]: 0 }), {}
    );
    let totalByLabel = labels.map(l => l._id).reduce(
      (obj, labelID) => Object.assign(obj, { [labelID]: 0 }), {}
    );
    // Compute
    operations.forEach(op => {
      total += op.amount;
      totalPositive += op.amount > 0 ? op.amount : 0;
      totalNegative += op.amount < 0 ? op.amount : 0;
      totalByDate[op.date] += op.amount;
      op.labels.forEach( labelID => totalByLabel[labelID] += op.amount );
    });
    // Format
    total = utils.round(total, 2);
    totalPositive = utils.round(totalPositive, 2);
    totalNegative = utils.round(totalNegative, 2);
    Object.entries(totalByDate).forEach(
      e => totalByDate[e[0]] = utils.round(e[1], 2)
    );
    Object.entries(totalByLabel).map(
      e => totalByLabel[e[0]] = utils.round(e[1], 2)
    );
    return {
      total,
      totalPositive,
      totalNegative,
      totalByDate,
      totalByLabel
    };
  }

}

export default new StatisticsService();
