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
client.once('ready', async () => {
  db.Pingwords.sync();
  db.Reminders.sync();
  db.DotCommands.sync();
  db.MessageLinks.sync();
  console.log(`Logged in as ${client.user.tag} on ${Date()}`);
  const channel = await client.channels.fetch(process.env.LOBBYID);
  channel.send("I've returned, and the abstraction deepens");

  client.user.setActivity("EVE Online");

  // load reminders on startup
  checkReminders();
});

client.on('presenceUpdate', (oldMember, newMember) => {
  newMember.activities.forEach(activity => {
    if (activity.name == 'EVE Online') {
      channel = client.channels.cache.get(process.env.EMERGENCY_CHANNEL);
      channel.send(`WARNING: <@${newMember.userID}> is playing eve online. The relevant authorities have been alerted.`);
    }
  });
});

// checks for
client.on('messageUpdate', (oldMessage, newMessage) => {
  if (Math.random() <= 0.03 && !newMessage.author.bot) {
    setTimeout(function () {
      if (Boolean(Math.round(Math.random()))) {
        newMessage.channel.send(`<@!${newMessage.author.id}>, your treason has not gone unnoticed.`);
      } else {
        newMessage.channel.send(`<@!${newMessage.author.id}>, don't think I didn't see that.`);
      }
    }, Math.floor(Math.random() * 120000)); //random timeout from 0-120s
  }
})

client.on('message', async message => {




  const num_entries = await db.MessageLinks.count({ where: { serverid: message.guild.id } });
  var hard_coded_inc = 0;
  if (message.guild.id == process.env.GUILDID) {
    hard_coded_inc = 32798;
  }

  if (num_entries + hard_coded_inc % 1000 == 0) {
    message.reply(`Congrats, you just sent message ${num_entries + hard_coded_inc}!`);
  }

  await db.MessageLinks.create({
    index: num_entries,
    serverid: message.guild.id,
    messageLink: message.url,
  });

  // bots cant send commands
  if (message.author.bot) return;

  if (message.channel.type !== 'text') { //only check for guilds
    var channelName = message.channel.name
    var channelId = message.channel.id
    var serverName = message.channel.name
    var serverId = message.channel.id

    var messageContent = message.content
    var senderName = message.author.username

    if (message.channel.id != process.env.LOBBYID && message.guild.id == process.env.GUILDID) {
      var res = []
      res.push(`Author: ${senderName}`)
      res.push(`messageContent: ${messageContent}`)
      res.push(`serverId: ${serverId}`)
      res.push(`serverName: ${serverName}`)
      res.push(`channelId: ${channelId}`)
      res.push(`channelName: ${channelName}`)
      res.push("   ")
      message.client.users.fetch(process.env.FEATURE_REQ_SNOWFLAKE).then(response => response.send(res))
        .catch(error => console.error(error));
    }
  }

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
  const commandName = args.shift().toLowerCase().split('(')[0]; //remove anything after a ( from command name for arbitrary args

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

