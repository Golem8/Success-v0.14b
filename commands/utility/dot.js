const DotCommands = require('../../db').DotCommands;

module.exports = {
	name: 'dot',
	description: 'adds a server-wide dot command that responds to messages',
	usage: 'dot !<add/remove/list> <command> <response>',
	guildOnly: true,
	argsRequired: true,

    async execute(message, args) {
        //gets the  utility (as of now, add/remove/list)
        utility = args[0];
        //gets the string to be added / removed
        args.shift();
        cmdname = args[0];
        args.shift();
        response = args.join(' ');

        if (utility === 'add'){
            //first check if they provided the needed args
            if (!(cmdname.indexOf('.') == 0)){
                return message.reply("Your dot command must start with a dot");
            }

            if (!response.length){
                return message.reply("You cant add blank responses, add the string afterwards");
            }

            //console.log(DotCommands.findOne({ where: { serverid: message.guild.id, dotname: cmdname } }))
            if (await DotCommands.findOne({ where: { serverid: message.guild.id, dotname: cmdname } }) != null){
                return message.reply("That dot command exists already");
            }

            //make a new entry for this command
            await DotCommands.create({
                serverid: message.guild.id,
                dotname: cmdname,
                cmdoutput: response,
            });

            return message.react('👍')

        } else if (utility === 'remove'){
            //makes sure there is a string included
            if (cmdname == null){
                return message.reply("You cant remove nothing, add the string afterwards");
            }

            const success = await DotCommands.destroy({ where: { serverid: message.guild.id , dotname: cmdname } });
            if (!success) return message.reply('That dot command did not exist.');
            return message.react('👍')


        } else if (utility === 'list'){
            var list = [];
            const cmds = await DotCommands.findAll({ where: { serverid: message.guild.id } });

            cmds.forEach( (cmd) => {
                list.push(' ' + cmd.get('dotname'));
            });
            message.reply(`This server has the folling dot commands:${list}`)
            
        }else {
            return message.reply(`Please follow: !${this.usage}`)
        }
	},
};