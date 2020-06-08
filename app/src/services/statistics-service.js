/**
 * Statistics Service
 */

import * as utils from '../utils';

class StatisticsService {

  computeStats(operations, labels) {
    let totalAmount = 0;
    let totalPositiveAmount = 0;
    let totalNegativeAmount = 0;
    let totalByLabel = labels.map(l => l._id).reduce(
      (obj, labelID) => Object.assign(obj, { [labelID]: 0 }), {}
    );
    operations.forEach(op => {
      totalAmount += op.amount;
      if (op.amount < 0) {
        totalNegativeAmount += op.amount;
      } else {
        totalPositiveAmount += op.amount;
      }
      op.labels.forEach(
        labelID => totalByLabel[labelID] += op.amount
      );
    });
    totalAmount = utils.round(totalAmount, 2);
    totalPositiveAmount = utils.round(totalPositiveAmount, 2);
    totalNegativeAmount = utils.round(totalNegativeAmount, 2);
    totalByLabel = Object.entries(totalByLabel).map(
      e => ({ [e[0]]: utils.round(e[1], 2) })
    ).reduce(
      (obj, x) => Object.assign(obj, x), {}
    );
    return {
      totalAmount,
      totalPositiveAmount,
      totalNegativeAmount,
      totalByLabel
    };
  }

}

export default new StatisticsService();
