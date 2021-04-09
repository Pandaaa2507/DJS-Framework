module.exports = function(d) {
    return `${(d.getDate()).pad(2)}.${(d.getMonth()).pad(2)}.${d.getFullYear()}`;
};