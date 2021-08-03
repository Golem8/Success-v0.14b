module.exports = {
	name: 'league',
	description: 'sends the league image on lol',
	guildOnly: false,
	argsRequired: false,

	 execute(message) {
		if (message.content.includes('lol') && Math.random() <= .07) {
        	message.channel.send('https://tenor.com/view/league-of-legends-lol-riot-games-riot-uninstall-gif-18739871');
		}
	},
};


