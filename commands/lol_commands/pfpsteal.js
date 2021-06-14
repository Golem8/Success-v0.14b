module.exports = {
	name: 'pfpsteal',
	description: 'sets the bot\'s profile pic to your pfp, or to the tagged user\'s pfp',
	usage: '<user>',
	guildOnly: true,
	aliases: ['avatarsteal','pfpvampire', 'avatarvampire'],
	cooldown: 5,
	argsRequired: false,

	execute(message, args) {
		console.log('pfpsteal exectued');

		if (!message.mentions.users.size) {
			//dynamic = false to not take .gif in. That may crash it
			stolen_img=message.author.displayAvatarURL({ format: 'png', dynamic: false });

			message.client.user.setAvatar(stolen_img)
				.then(user => {
					console.log(`Stealing ${message.author}\'s pfp, it can be found here: ${stolen_img}`);
					message.channel.send('Nom Nom Nom profile pic stolen');
				})
				.catch(console.error);
			
        } else {

			user=message.mentions.users.first()

			stolen_img=user.displayAvatarURL({ format: 'png', dynamic: false })

			//console.log(stolen_img)

			message.client.user.setAvatar(stolen_img)
				.then(user => {
					console.log(`Stealing ${message.author}\'s pfp, it can be found here: ${stolen_img}`);
					message.channel.send('Nom Nom Nom profile pic stolen');
			})
				.catch(console.error);

			
		}
	},
};