/* eslint-disable no-unused-vars */
const { MessageEmbed } = require('discord.js');

module.exports = {
    commands: 'me',
    maxArgs: 0,
    callback: async (msg, args, text) => {
        const meee = await msg.reply('If it didnt work its becuz ur not in a server');
        const me = new MessageEmbed()
            .setTitle('User Information')
            .addField('Name:', (await msg.guild.members.fetch(msg.author.id)).nickname, true)
            .addField('Server:', msg.guild.name, true)
            .addField('Member Count', msg.guild.memberCount, true)
            .addField('Role In The Sever', msg.member.roles.highest.toString(), true)
            .addField('Joined At:', msg.member.joinedAt, true)
            .addField('Owner:', msg.guild.owner.nickname + '(' + msg.guild.owner.user.tag + ')', true)
            .setColor('#FF00C8')
            .setThumbnail(msg.author.displayAvatarURL());
        msg.channel.send(me);
        meee.delete();
    },
};