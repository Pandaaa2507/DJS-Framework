const DJSF = require('../../DJSF');

const Test = new DJSF.Function()

.setExec(function(client) {
    DJSF.Log(`Hello, ${client.user.username} started!`);
})
.setName('TestFunction');

module.exports = Test;