module.exports = {
	name: 'fix',
	description: 'converts given hex number to decimal',
	usage: 'fix <hexidecimal number>',
	guildOnly: false,
	argsRequired: true,

    execute(message, args) {
        message.channel.send(`[${args[0].toUpperCase()}] in hex equals [${parseInt(args[0], 16)}] in base 10`);
	},
};