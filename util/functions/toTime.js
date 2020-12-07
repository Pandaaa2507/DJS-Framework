module.exports = function(d, ms) {
    if(ms === true) {
        return `${(d.getHours()).pad(2)}:${(d.getMinutes()).pad(2)}:${(d.getSeconds()).pad(2)}.${(d.getMilliseconds()).pad(4)}`; 
    } else {
        return `${(d.getHours()).pad(2)}:${(d.getMinutes()).pad(2)}:${(d.getSeconds()).pad(2)}`;
    };
};