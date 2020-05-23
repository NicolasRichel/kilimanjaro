/**
 * Statistics Service
 */

class StatisticsService {

  computeTotals(operations, labels) {
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
    return {
      totalAmount,
      totalPositiveAmount,
      totalNegativeAmount,
      totalByLabel
    };
  }

}

export default new StatisticsService();
