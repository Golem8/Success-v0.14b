require('dotenv').config();


// require the discord.js module
const Discord = require('discord.js');

// create a new Discord client
const client = new Discord.Client();

// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
  });



// sends a message in the channel if the rare user has started typing
client.on('typingStart', function(channel, user) {
    if (user.username === process.env.RARE_USER){
        channel.send(`${user.username} started typing which is very rare`);
    }
});



//profile pic vampire
client.on('message', message => {
    if (message.content.startsWith( `${process.env.COMMAND_PREFIX}pfpvampire`)) {

        if (!message.mentions.users.size) {
            return message.reply(`Ping someone to steal their profile pic`);
        }

        user=message.mentions.users.first()
        //console.log(user)
        stolen_img=user.displayAvatarURL({ format: 'png', dynamic: true })

        //console.log(stolen_img)

        client.user.setAvatar(stolen_img)
            .then(user => console.log(`New avatar set!`))
            .catch(console.error);
        
	} else if(message.content === `${process.env.COMMAND_PREFIX}pfpreset`){
        client.user.setAvatar('https://cdn.discordapp.com/embed/avatars/0.png')
            .then(user => console.log(`New avatar set!`))
            .catch(console.error);
    }
});


// login to Discord with your app's token
client.login(process.env.BOT_TOKEN);
