const DJSF = require('../../DJSF');

const Test = new DJSF.Command()

.setExec(async function(client, msg, args) {
    msg.channel.send(`Hi, I am ${client.user.username}!`);
})
.setName('test');

module.exports = Test;