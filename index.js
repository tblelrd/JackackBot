/* eslint-disable no-shadow */
const Discord = require('discord.js');
const register = require('./src/utils/register');

const bot = new Discord.Client();

// THINGS THAT HAPPEN WHEN BOT ONLINE
bot.once('ready', () => {
    bot.user.setActivity('j!help', {
        type: 'WATCHING',
    }).catch(console.error);

    register.registerCommands(bot, 'commands');
    register.registerEvents(bot, 'events');

    console.log(`Bot logged in as ${bot.user.username}`);
});
// bot.login(process.env.token);
bot.login('Nzg0MDUwNDQxMjQ3OTE2MDMy.X8jp4A.JnsLV1MLuQMoENNCO38Qcj-hX54');
