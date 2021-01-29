module.exports = {
    commands: ['say', 'repeat'],
    expectedArgs: '<tex>',
    minArgs: 1,
    callback: async (msg, args, text) => {
        msg.channel.send(text);
    },
};