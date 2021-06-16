module.exports = {
	name: 'pfpreset',
	description: 'resets the bot\'s pfp to default',
	guildOnly: true,
	aliases: ['avatarreset'],
	cooldown: 5,
	argsRequired: false,

	execute(message, args) {

        message.client.user.setAvatar('https://cdn.discordapp.com/embed/avatars/0.png')
            .then(user => {
				console.log(`New avatar set!`);
				message.channel.send('Profile pic reset');
			})
            .catch(console.error);	
	},
};