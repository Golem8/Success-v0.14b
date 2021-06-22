const DotCommands = require('../db').DotCommands;

module.exports = {
	name: 'dotListener',
	description: 'listens and triggers dot commands',

    async execute(message){

        //get all commands for the guild
        const cmds = await DotCommands.findAll({ where: { serverid: message.guild.id } });
        if (cmds == undefined) return;
        
        //looping through each command
        cmds.forEach(cmd => {
            if (message.content === (cmd.get('dotname'))){
                message.channel.send(cmd.get('cmdoutput'));
            }
        });
      }
};