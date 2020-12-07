/* eslint-disable no-shadow */
const Discord = require('discord.js');
const MC = require('minecraft-api');

const Config = require('./config.json');

const Bot = new Discord.Client();


// THINGS THAT HAPPEN WHEN BOT ONLINE
Bot.once('ready', () => {
    console.warn('Bot Online');
    Bot.user.setActivity('j!help', {
        type: 'WATCHING',
    }).catch(console.error);
});

Bot.login(process.env.token);


// JOIN MESSAGE WHEN INVITED
Bot.on('guildCreate', member => {
    const channel = member.channels.cache.find(channel => channel.type === 'text' && channel.permissionsFor(member.me).has('SEND_MESSAGES'));
    const ThankYouEmbed = new Discord.MessageEmbed()
        .setColor('#fc00ff')
        .setTitle('Thanks for inviting me to ur server!')
        .setThumbnail(member.iconURL())
        .setImage(member.me.user.avatarURL());

    channel.send(ThankYouEmbed);

});

// NAME HISTORY COMMAND
async function nh(name, msg) {
    const cactus = await MC.nameForUuid('793884e374e142f3879613386f969e77');

    if (name == cactus) return msg.channel.send('AHAHAHAHAHAHA YOU TRIEDDDDDDDDDD');

    const nameHistory = await MC.nameHistoryForName(name);


    let i;

    for (i = 0; i < nameHistory.length; i++) {
        msg.channel.send(`${name}: ${nameHistory[i].name}`);
    }
}

Bot.on('message', async msg => {

    // CHECKS IF MESSAGE AUTHOR IS A BOT
    if (msg.author.bot) {
        return console.log(`(${msg.channel.name})${msg.author.username}#${msg.author.discriminator} said "${msg.content}"`);
    }


    // DM CHECK
    if (msg.channel.type == 'dm') {
        // TEXT COMMAND
        if (msg.content == 'j!text') {
            let messageContent;
            let messageReciever;
            const filter = m => m.author == msg.author;
            msg.channel.send('Provide the ID of the user you want to text...');
            const collector = msg.channel.createMessageCollector(filter, {
                max: 1,
                time: 30000,
            });


            collector.on('collect', m => {
                console.warn(`Collected ${m.content}`);
                messageReciever = m.content;
            });

            collector.on('end', collected => {
                console.warn(`Collected ${collected.size} items`);


                Bot.users.fetch(messageReciever).then((user) => {
                    msg.channel.send('What do you want to text ' + user.username);
                });
                const collector2 = msg.channel.createMessageCollector(filter, {
                    max: 1,
                    time: 30000,
                });

                collector2.on('collect', m2 => {
                    console.warn(`Collected ${m2.content}`);
                    messageContent = m2.content;
                });

                collector2.on('end', collected2 => {
                    console.warn(`Collected ${collected2.size} items`);


                    Bot.users.fetch(messageReciever).then((user) => {

                        const text = new Discord.MessageEmbed()
                            .setTitle(`${messageContent}`)
                            .setDescription(`${msg.author.username}#${msg.author.discriminator}(${msg.author.id})`)
                            .setFooter('Sent via the jackack message service')
                            .setColor('#FF00C8')
                            .setThumbnail(msg.author.displayAvatarURL());

                        user.send(text);
                        msg.channel.send(`${user.username}#${user.discriminator} has been sent the following message: ${messageContent}`);
                    });


                });
            });

        }
        return;
    }

    // SAY COMMAND
    const nick = msg.guild.member(msg.author).displayName;
    if (msg.content.includes('j!say')) {
        const say = msg.content.replace('j!say', '');
        msg.guild.me.setNickname(nick).then(
            msg.delete(),
            msg.channel.send(say),
        );

        msg.guild.me.setNickname('(' + Config.prefix[msg.guild.id] + ') ' + msg.guild.me.user.username);
    }

    // LOGS
    console.log(`(${msg.channel.name})${msg.author.username}#${msg.author.discriminator} said "${msg.content}"`);


    // COMMANDS
    if (!msg.content.startsWith(Config.prefix[msg.guild.id]) || msg.author.bot) return;
    const args = msg.content.toLowerCase().slice(Config.prefix[msg.guild.id].length).trim().split(/ +/);

    switch (args[0]) {
        case 'ping':
            const ping = await msg.channel.send('pinging');
            ping.edit('🏓Pong!');

            msg.channel.send(`Pong!\nLatency is ${Math.floor(ping.createdTimestamp - msg.createdTimestamp)}ms`);
            break;

        case 'startdm':
            msg.author.send('Hi!');
            break;

        case 'canvas':
            break;

        case 'help':
            const help = new Discord.MessageEmbed()
                .setTitle('Help')
                .setDescription('This is the Help Screen for Jackack bot, version is 1.0')
                .setAuthor('Jackack Bot', msg.guild.me.user.avatarURL())
                .setColor('#FF00C8')
                .addField('Help', 'Displays this help screen', true)
                .addField('Ping', 'Pong!', true)
                .addField('Prefix', 'Sets the GLOBAL prefix', true)
                .addField('StartDM', 'Essential for texting', true)
                .addField('Say', 'Says your message as you', true)
                .addField('Text', 'Only works in DMs also type the command as standalone so it works', true)
                .addField('Me', 'Displays info about you in a server', true)
                .addField('NameHistory', 'Displays the Minecradt name history of a provided username', true)
                .setThumbnail(msg.guild.iconURL())
                .setTimestamp()
                .setFooter('Bot created at Dec 2nd, 2020', msg.guild.me.user.avatarURL());

            msg.channel.send(help);
            break;

        case 'me':
            const meee = await msg.reply('If it didnt work its becuz ur not in a server');
            const me = new Discord.MessageEmbed()
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
            break;

        case 'id':
            if (msg.mentions.users.length != 0) {
                msg.mentions.users.forEach((k, v) => {
                    console.warn(k, v, '');
                    msg.reply(k.id);
                });
            }
            break;

        case 'prefix':
            Config.prefix[msg.guild.id] = args[1];
            msg.guild.me.setNickname('(' + Config.prefix[msg.guild.id] + ') ' + msg.guild.me.user.username);
            break;
        case 'namehistory':
            if (!args[1]) {
                msg.channel.send('You need to put a minecraft username!');
                return;
            }

            nh(args[1], msg).catch(console.error());
            break;

        case 'token':
            if(args[1]) return msg.channel.send('Why did u put something after the command lol');
            Config.passcode[msg.author.id] = Math.floor(Math.random() * 10000);
            msg.author.send(`Your secret passcode is: ${Config.passcodes[msg.author.id]}, ${msg.author}`);
            break;
    }
});