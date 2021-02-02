module.exports = {
    commands: ['disguise', 'disg', 'nick'],
    expectedArgs: '<userID> <tex>',
    minArgs: 2,
    callback: async (msg, args, text, bot) => {
        const guild = msg.guild.id;
        const user = await msg.guild.users.fetch(args[0]);
        if(!user) return msg.reply('They don exist');
        const member = guild.member(user);
        const name = member.nickname;
        const avatar = user.avatarURL();

        await msg.delete();

        args.shift();

        const webhook = await msg.channel.createWebhook('SayHook', { reason: 'Say' });
        await webhook.send(args.join(' '), { username: name, avatarURL: avatar });

        await webhook.delete();
    },
};