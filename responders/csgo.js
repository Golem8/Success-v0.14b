module.exports = {
	name: 'csgo',
	description: 'sends the csgo image when asked',
	guildOnly: false,
	aliases: [],
	cooldown: 0,
	argsRequired: false,

	 execute(message) {
		if (message.content.includes('.csgo')) {
        	message.channel.send('https://cdn.discordapp.com/attachments/738121767880622200/855588881385783326/unknown.png');
		}
	},
};


