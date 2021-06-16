db = require('../../index');

module.exports = {
	name: 'pingword',
	description: 'sets, removes, or lists the pingwords that a user has set',
	guildOnly: true,
	aliases: ['pingstring'],
	cooldown: 60,
    argsRequired: true,
    usage: '<add/remove/list/removeall> <pingword>',

    //main one first creates the db
	async execute(message, args) {
        //gets the pingword utility (as of now, add/remove/list/removeall)
        utility = args[0];

        //gets the string to be added / removed
        args.shift();
        pingstring = args.join(' ');

        if (utility === 'add'){
            //first check if they provided the needed args
            if (!pingstring.length){
                return message.reply("You cant add nothing, add the string afterwards");
            }

            //make a new entry for this user if they do not have one yet
            await this.createList(message);

            //get their current array and record the senderid
            let sender = message.author;
            let currentList = await db.get(sender);

            //update the array and db and respond to user
            currentList.push(pingstring)
            await db.set(sender, currentList);
            message.reply(`Here is your updated pinglist: ${JSON.stringify(currentList)}`)


        } else if (utility === 'remove'){
            //makes sure there is a string included
            if (!pingstring.length){
                return message.reply("You cant remove nothing, add the string afterwards");
            }

            //create db entry if they do not have one yet
            await this.createList(message);

            let sender = message.author;
            currentList = await db.get(sender);

            //make sure this was one of their pingwords
            if(!currentList.includes(pingstring)){
                return message.reply(`That was not one of your pingwords, this is your list: ${JSON.stringify(currentList)}`);
            }

            //removes it
            const index = currentList.indexOf(pingstring);
            if (index > -1) {
                currentList.splice(index, 1);
            }

            //update db and respond to the user
            await db.set(sender, currentList);
            message.reply(`Here is your updated pinglist: ${JSON.stringify(currentList)}`)


        } else if (utility === 'list'){
            //creates a db entry if they do not have one
            await this.createList(message);

            let sender = message.author;
            let currentList = await db.get(sender);

            //list their pingwords
            db.get(message.author).then(response => {
                message.reply(`Here is your pinglist: ${JSON.stringify(response)}`)
            });

        } else if (utility === 'removeall') {
            //doesnt matter if they have a list registered yet, just set it to empty
            db.set(message.author,[]);
            message.reply("Your pingwords list has been reset");
        }else {
            message.reply(`Please follow: !pingword ${this.usage}`)
        }
	},

    //creates a new db entry if it does not exist yet
    async createList(message){
        let sender = message.author;
        let currentList = await db.get(sender);

        if(currentList===undefined){
            //create entry for that user
            console.log('Making new db entry for user ' + sender);
        } 
        await db.set(message.author,[]);
    },
};