module.exports = {
	name: 'oof',
	description: 'sends the oof images when asked',
	guildOnly: false,
	aliases: [],
	cooldown: 0,
	argsRequired: false,

	 execute(message) {
		if (message.content.includes('.oof')) {
        	message.channel.send('https://i.kym-cdn.com/photos/images/newsfeed/001/705/934/3a7.jpg');
		}
	},
};


