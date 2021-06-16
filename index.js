require('dotenv').config();

const Discord = require('discord.js');
const fs = require('fs')
const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	// SQLite only
	storage: 'database.sqlite',
});

const Pingwords = sequelize.define('pingwords', {
	username: {
		type: Sequelize.STRING,
		unique: true,
	},
	strings: {
		type: Sequelize.TEXT,
		defaultValue: '[]'
	},
});

module.exports = Pingwords;

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

const messageScanners = fs.readdirSync('./responders');
client.responders = new Discord.Collection();

for (const file of messageScanners) {
	const responder = require(`./responders/${file}`);
	client.responders.set(responder.name, responder);
}



// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', () => {
  Pingwords.sync();
  console.log(`Logged in as ${client.user.tag}!`);
  
});

client.on('message', message => {

    if(message.author.bot) return;

    scanPingLists(message);

    //loop through all responders.
    client.responders.forEach((value, key) => {
      const responder = client.responders.get(key);
      try {
        responder.execute(message);
      } catch (error) {
          console.error(error);
      }
    })

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

  const list = await Pingwords.findAll({ attributes: ['username'] });

  if (list == undefined) return;

  const users = list.map(t => t.username);

  
  //looping through each user
  users.forEach(async userSnowflake => {

    const dbEntry = await pingdb.findOne({ where: { username: userSnowflake } });

    if (dbEntry == undefined) return;

    const pingStringsArr = JSON.parse(dbEntry.get('strings'));


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

