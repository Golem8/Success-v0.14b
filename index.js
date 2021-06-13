require('dotenv').config();

const Discord = require('discord.js');
const fs = require('fs')





// create a new Discord client
const client = new Discord.Client();

client.commands = new Discord.Collection();

const commandFolders = fs.readdirSync('./commands');

//loop through all .js files in all of the folders under 'commands'
for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);

		client.commands.set(command.name, command);
	}
}



// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
  });

client.on('message', message => {

    //bots cant send commands
    if (!message.content.startsWith(process.env.COMMAND_PREFIX) || message.author.bot) return;

    //regex to split on spaces
    const args = message.content.slice(process.env.COMMAND_PREFIX.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const commandObj = client.commands.get(commandName);

  if (!message.content.startsWith(process.env.COMMAND_PREFIX) || message.author.bot) return;

    try {
        commandObj.execute(message, args);
    } catch (error) {
        console.error(error)
    }


});

// login to Discord with bot token
client.login(process.env.BOT_TOKEN);



// // sends a message in the channel if the rare user has started typing
// client.on('typingStart', function(channel, user) {
//     if (user.username === process.env.RARE_USER){
//         channel.send(`${user.username} started typing which is very rare`);
//     }
// });*/