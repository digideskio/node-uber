function PartnerPayments(uber) {
  this._uber = uber;
  this.path = 'partners/payments';
  this.requiredScope = 'partner.payments';
}

module.exports = PartnerPayments;

PartnerPayments.prototype.getPayments = function getPayments(off, lim, from, to, callback) {
  var newOffset = off || 0;
  // ensure query limit is set. Maximum is 50. Default is 5.
  var newLimit = (lim)
    ? Math.min(lim, 50)
    : 5;

  var params = {
    offset: newOffset,
    limit: newLimit
  };

  if (parseInt(from, 10) > 0) {
    params['from_time'] = from;
  }

  if (parseInt(to, 10) > 0) {
    params['to_time'] = to;
  }

  return this._uber.get({
    url: this.path,
    version: 'v1',
    params: params,
    scope: this.requiredScope
  }, callback);
};
