require('dotenv').config();

const Discord = require('discord.js');
const fs = require('fs');
const prefix = '!';
const remindjs = require('./commands/utility/remind');
const { Reminders } = require('./db');

db = require('./db');


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
  db.Pingwords.sync();
  db.Reminders.sync();
  db.DotCommands.sync();
  console.log(`Logged in as ${client.user.tag} on ${Date()}`);
  client.user.setActivity("EVE Online");

  // load reminders on startup
  checkReminders();
});

client.on('message', message => {
  // bots cant send commands
  if (message.author.bot) return;

  //loop through all responders.
  client.responders.forEach((value, key) => {
    const responder = client.responders.get(key);
    try {
      responder.execute(message);
    } catch (error) {
      console.error(error);
    }
  })


  if (!message.content.startsWith(prefix)) return;

  //regex to split on spaces
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const commandObj = client.commands.get(commandName);
  if (commandObj === undefined) return;

  //enforce guild only commands
  if (commandObj.guildOnly && message.channel.type !== 'text') {
    return message.reply('I can\'t execute that command inside DMs!');
  }

  if (commandObj.argsRequired && !args.length) {
    return message.reply(`Please follow: !${commandObj.usage}`);
  }

  try {
    console.log(`${message.author.username} attempted to execute ${commandObj.name} `);
    commandObj.execute(message, args);
  } catch (error) {
    console.error(error);
  }
});

// initiate reminders into memory from the db on startup
async function checkReminders() {
  const remindersList = await Reminders.findAll();
  remindersList.forEach(async reminder => {
    if (reminder == undefined) return;
    remindjs.addReminder(reminder.uuid, client);
  });
}

// login to Discord with bot token
client.login(process.env.BOT_TOKEN);

