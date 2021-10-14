module.exports = {
	name: 'annoy',
	description: 'annoys a user',
	usage: '!annoy <user> annoyanceCount',
	guildOnly: true,
	argsRequired: true,

	execute(message, args) {
        user=message.mentions.users.first();

        var ac = args[1];

        if (ac == undefined)
            return message.reply(`Follow usage: ${this.usage}`);

        if (ac > 17)
            return message.reply(`Please have mercy and do not ping more than 17 times`);
        
        for (let index = 0; index < ac; index++) {
            message.channel.send(`${user}`);
        }
	},
};