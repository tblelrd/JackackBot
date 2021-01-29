module.exports = {
    commands: ['startdm', 'sdm'],
    maxArgs: 0,
    callback: (msg) => {
        msg.author.send('Hi');
    },
};