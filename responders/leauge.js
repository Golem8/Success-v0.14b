module.exports = {
	name: 'league',
	description: 'sends the league image on lol',
	guildOnly: false,
	aliases: [],
	cooldown: 0,
	argsRequired: false,

	 execute(message) {
		if (message.content.includes('lol')) {
        	message.channel.send('https://tenor.com/view/league-of-legends-lol-riot-games-riot-uninstall-gif-18739871');
		}
	},
};


