const pingdb = require('../db').Pingwords;


module.exports = {
  name: 'scanPingLists',
  description: 'notfies users when their pingwords are used',
  guildOnly: false,
  argsRequired: false,

  async execute(message) {
    if (!message.guild === null) { //only check for guilds
      let list = await pingdb.findAll({ attributes: ['username'] });
      if (list == undefined) return;

      let users = list.map(t => t.username);

      // only loop through once for each user when a message is sent. We dont want duplicate
      // usernames, even if a user has multiple pingword lists for multiple servers
      // it will scan all their pingwords in the server in which the message was sent.
      users = [...new Set(users)];

      //looping through each user
      users.forEach(async userSnowflake => {
        const dbEntry = await pingdb.findOne({
          where: {
            username: message.author.id,
            server: message.guild.id
          }
        });

        if (dbEntry == undefined) return;

        const pingStringsArr = JSON.parse(dbEntry.get('strings'));


        pingStringsArr.forEach(async string => {
          //now looping through each string for the user
          if (message.content.toLowerCase().includes(string.toLowerCase())) {

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
  }
};