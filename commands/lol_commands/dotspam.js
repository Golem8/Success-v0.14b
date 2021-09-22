const DotCommands = require('../../db').DotCommands;
module.exports = {
	name: 'dotspam',
	description: 'sends all dot commands',
	guildOnly: true,
	argsRequired: false,

	async execute(message, args) {
        const cmds = await DotCommands.findAll({ where: { serverid: message.guild.id } });
        if (cmds == undefined) return;
        cmds.forEach(cmd => {
            message.channel.send(cmd.get('cmdoutput'));
        });
	},
};