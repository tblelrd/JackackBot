/* eslint-disable no-unused-vars */
const { MessageEmbed } = require('discord.js');

module.exports = {
    commands: ['help', 'h'],
    maxArgs: 0,
    callback: (msg, args, text) => {
        const help = new MessageEmbed()
        .setTitle('Help')
        .setDescription('This is the Help Screen for Jackack bot, version is 1.0')
        .setAuthor('Jackack bot', msg.guild.me.user.avatarURL())
        .setColor('#FF00C8')
        .addField('misc', '`ping` `say` `id` `startDm` `me`')
        .addField('dm', '`text`')
        .addField('minecraft', '`namehistory`')
        .setThumbnail(msg.guild.iconURL())
        .setTimestamp()
        .setFooter('Bot created at Dec 2nd, 2020' + '\nThe origin of the text command', msg.guild.me.user.avatarURL());

    msg.channel.send(help);
    },
};