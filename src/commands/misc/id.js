/* eslint-disable no-unused-vars */
module.exports = {
    commands: 'id',
    expectedArgs: '<@username>',
    minArgs: 1,
    callback: (msg, args, text) => {
        if (msg.mentions.users.length != 0) {
            msg.mentions.users.forEach((k, v) => {
                msg.channel.send(`${k.username} - \`${k.id}\``);
            });
        }
    },
};