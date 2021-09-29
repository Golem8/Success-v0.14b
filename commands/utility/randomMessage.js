const MessageLinks = require('../../db').MessageLinks;

module.exports = {
    name: 'randommessage',
    description: 'returns a random message in an interval',
    guildOnly: true,
    argsRequired: false,
    usage: "returnMessage(a,b)",

    async execute(message, args) {
        const num_entries = await MessageLinks.count( { where: { serverid: message.guild.id }});


        //get a,b
        const vars = message.content.substring(message.content.indexOf('(') + 1).split(',');
        const a = parseInt(vars[0]);
        const b = parseInt(vars[1].split(')')[0]); //take closing paren off

        if (!Number.isInteger(a) || ! Number.isInteger(b)){
            message.reply('put integers in');
            return;
        }
        
        if (b > num_entries){
            message.reply(`Please enter an upper bound of under ${num_entries}`);
            return;
        }
        if (a < 0){
            message.reply(`Please enter an lower bound of over 0`);
            return;
        }
        if (a > b){
            message.reply(`Thats not how coding works dummy`);
            return;
        }

        const randNum = Math.floor(Math.random() * (b - a + 1)) + a; //Mozzilla dev code for random in in range [a,b)
        const dbobj = await MessageLinks.findOne({ where: { 
            index: randNum,
            serverid: message.guild.id
        } });
        const link = dbobj.get('messageLink')
        message.reply(`${link}`);

    }
};


