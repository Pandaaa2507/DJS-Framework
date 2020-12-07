module.exports = Number.prototype.pad = function (size, sign) {
    let s = String(this);
    let n = sign || '0';
    while(s.length < (size || 2)) {
        s = n + s;
    }
    return s;
};