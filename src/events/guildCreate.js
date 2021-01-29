const Discord = require('discord.js');

module.exports = {
    event: (bot) => {
        // JOIN MESSAGE WHEN INVITED
        bot.on('guildCreate', member => {
            const channel = member.channels.cache.find(msgChannel => msgChannel.type === 'text' && channel.permissionsFor(member.me).has('SEND_MESSAGES'));
            const ThankYouEmbed = new Discord.MessageEmbed()
                .setColor('#fc00ff')
                .setTitle('Thanks for inviting me to ur server!')
                .setThumbnail(member.iconURL())
                .setImage(member.me.user.avatarURL());

            channel.send(ThankYouEmbed);

        });
    },
};