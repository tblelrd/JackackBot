module.exports = {
    event: (bot) => {
        bot.on('message', msg => {
            if(msg.channel.type !== 'dm') return;

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


                    bot.users.fetch(messageReciever).then((user) => {
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

												
                        bot.users.fetch(messageReciever).then((user) => {
                            user.send(`\`\`\`nim\n${messageContent}\n\n -Sent by ${msg.author.username}#${msg.author.discriminator}\n -their id: ${msg.author.id}\`\`\``);
                            msg.channel.send(`${user.username}#${user.discriminator} has been sent the following message: ${messageContent}`);
                        });
                    });
                });
            }
        });
    },
};