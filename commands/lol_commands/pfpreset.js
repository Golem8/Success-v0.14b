module.exports = {
	name: 'pfpreset',
	description: 'resets the bot\'s pfp to default',
	guildOnly: true,
	aliases: ['avatarreset'],
	cooldown: 5,

	execute(message, args) {
		console.log('reset pfp executed')
		
        message.client.user.setAvatar('https://cdn.discordapp.com/embed/avatars/0.png')
            .then(user => {
				console.log(`New avatar set!`);
				message.channel.send('Nom Nom Nom profile pic stolen');
			})
            .catch(console.error);	
	},
};