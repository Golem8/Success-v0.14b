require('dotenv').config();
const Discord = require('discord.js');

module.exports = {
	name: 'push',
	description: 'secret push',
	guildOnly: false,
	argsRequired: true,

	async execute(message, args) {
        if(!message.author.id == process.env.FEATURE_REQ_SNOWFLAKE){
            return;
        }

        console.log("attempt to execute push")
        const channel = await message.client.channels.fetch(process.env.SECRETID);
        channel.send(args.join(' '))
	},
};
