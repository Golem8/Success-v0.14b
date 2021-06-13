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


// login to Discord with your app's token
client.login(process.env.BOT_TOKEN);
