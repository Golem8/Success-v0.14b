require('dotenv').config();

const Discord = require('discord.js');
const fs = require('fs')

const Keyv = require('keyv');

const pingwords = new Keyv('sqlite://./database.sqlite');
pingwords.on('error', err => console.error('Keyv connection error:', err));

module.exports = pingwords;

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

    if(message.author.bot) return;

    scanPingLists(message);

    //bots cant send commands
    if (!message.content.startsWith(process.env.COMMAND_PREFIX)) return;

    //regex to split on spaces
    const args = message.content.slice(process.env.COMMAND_PREFIX.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const commandObj = client.commands.get(commandName);
    if(commandObj === undefined) return;
  
    if (commandObj.ardgsRequired && !args.length) {
      return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
    }

    try {
        console.log(`${commandObj.name} attempted to execute`);
        commandObj.execute(message, args);
    } catch (error) {
        console.error(error);
    }


});

async function scanPingLists(message){
  users = await db.get('pingWordUsers');
  if (users === undefined) return;

  //looping through each user
  users.forEach(async userSnowflake => {
    pingStringsArr = await db.get(userSnowflake);
    if (pingStringsArr === undefined) return;

    pingStringsArr.forEach(async string => {
      //now looping through each string for the user
      if (message.content.toLowerCase().includes(string.toLowerCase())){

        res = [];
        res.push(`Your pingword "${string}" was used by ${message.author.username} in ${message.channel} in server "${message.guild.name}"`);
        res.push('See message link below');
        res.push(message.url);

        message.client.users.fetch(userSnowflake).then(response => response.send(res))
            .catch(error => console.error(error));
      }
    });
  });
}

// login to Discord with bot token
client.login(process.env.BOT_TOKEN);

