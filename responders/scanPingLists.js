const pingdb = require('../index');

module.exports = {
	name: 'scanPingLists',
	description: 'notfies users when their pingwords are used',
	guildOnly: false,
	aliases: [],
	cooldown: 0,
	argsRequired: false,

    async execute(message){

        const list = await pingdb.findAll({ attributes: ['username'] });
      
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
};