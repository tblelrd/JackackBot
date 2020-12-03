const Discord = require('discord.js');
const Bot = new Discord.Client();

const Avatar = "https://cdn.discordapp.com/avatars/784050441247916032/526f8f0d44f418782bedc76a9250f27e.webp"

Bot.once('ready', () => {
    console.log('Bot Online');
});

Bot.login(process.env.token);


Bot.on("guildCreate", member =>{
    const ThankYouEmbed = new Discord.MessageEmbed()
        .setColor('#fc00ff')
        .setTitle('Thanks for inviting me to ur server!')
        .setThumbnail(member.guild.iconURL())
        .setImage(member.guild.me.user.avatarURL())
        
    guild.channels.find(`name`, `general`).send(ThankYouEmbed)
    
})

Bot.on("message", async msg =>{


    if(msg.author.bot) {
        return console.log(`${msg.author.username}#${msg.author.discriminator} said \"${msg.content}\"`)
    }

    if(msg.channel.type == "dm") {
        if(msg.content == "j!text") {
            var messageContent
            var messageReciever
            const filter = m => m.author == msg.author
            msg.channel.send("Provide the ID of the user you want to text...")
            const collector = msg.channel.createMessageCollector(filter, { max: 1, time: 30000 });

            
            
            collector.on('collect', m => {
                console.log(`Collected ${m.content}`);
                messageReciever = m.content
            });

            collector.on('end', collected => { 
                console.log(`Collected ${collected.size} items`);
                
                
                msg.channel.send("What do you wana text")
                const collector2 = msg.channel.createMessageCollector(filter, { max: 1, time: 30000 });
                
                collector2.on('collect', m2 => {
                    console.log(`Collected ${m2.content}`);
                    messageContent = m2.content
                });

                collector2.on('end', collected2 => { 
                    console.log(`Collected ${collected2.size} items`);
                    

                    console.log(client.users.cache.get(messageReciever))
                    textee = client.users.cache.get(messageReciever)

                    msg.channel.send(`${textee.username}#${textee.discriminator} has been sent the following messege: ${messageContent}`)
                    textee.send(`${msg.author.username}#${msg.author.discriminator}: ${messageContent}`)
                });
            });
            
        }
        return 
    }


    nick = msg.guild.member(msg.author).displayName


    console.log (`${msg.author.username}#${msg.author.discriminator} said \"${msg.content}\"`)

    console.log(msg.author)

    if(msg.content == "j!ping") {
        return msg.reply("Pong!")
    }

    if(msg.content.includes('j!say')) {
        let say = msg.content.replace('j!say', '')
        msg.guild.me.setNickname(nick).then(
            msg.delete(),
            msg.channel.send(say)
        )
        
        msg.guild.me.setNickname("(j!) " + msg.guild.me.user.username)
    }   
    if(msg.content == "j!startdm") {
        msg.author.send("Hi!")
    }

    
});