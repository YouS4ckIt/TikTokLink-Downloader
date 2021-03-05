module.exports = {
  isNumber: function (n) {
    return /^-?[\d.]+(?:e-?\d+)?$/.test(n);
  },
  isNull: function (object) {
    return !(object !== undefined && object !== null);
  },
};
