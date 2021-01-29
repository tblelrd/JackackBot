module.exports = {
    commands: 'ping',
    maxArgs: 0,
    callback: async (msg, args, text) => {
        const ping = await msg.channel.send('pinging');

        msg.channel.send(`Pong!\nLatency is ${Math.floor(ping.createdTimestamp - msg.createdTimestamp)}ms`);
        ping.edit('🏓Pong!');
    },
};