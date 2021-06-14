require('dotenv').config();
const Discord = require('discord.js');

module.exports = {
	name: 'reqfeature',
	description: 'requests a feature to be added to the bot',
	guildOnly: true,
	aliases: ['requestfeature','featurerequest'],
	cooldown: 60,
	argsRequired: false,

	execute(message, args) {
        console.log("new feature requested")
        
        res = []
        res.push(`Request From ${message.author}`);
        res.push(`Request body: ${args.join(' ')}`);

        message.client.users.fetch(process.env.FEATURE_REQ_SNOWFLAKE).then(response => response.send(res))
            .catch(error => console.error(error));

	},
};