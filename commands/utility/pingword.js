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
	execute(message, args) {
        //add remove list
        utility = args[0];
        args.shift();
        db.clear();
        pingstring = args.join(' ');

        //create new pingwords entry if it does not already exist for message.author
       
        if (utility === 'add'){
            if (!pingstring.length){
                return message.reply("You cant add nothing, add the string afterwards");
            }

        
            (async () => {
                await this.createList(message);

                let sender = message.author;
                let currentList = await db.get(sender);
    
                //update the array and db and respond to user
                currentList.push(pingstring)
                await db.set(sender, currentList);
                message.reply(`Here is your updated pinglist: ${JSON.stringify(currentList)}`)
            })();

        } else if (utility === 'remove'){
            //makes sure there is a string included
            if (!pingstring.length){
                return message.reply("You cant remove nothing, add the string afterwards");
            }


            (async () => {

                await this.createList(message);

                let sender = message.author;
                currentList = await db.get(sender);

                //make sure the entry is there
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
            })();

        } else if (utility === 'list'){

            
            (async () => {
                await this.createList(message);

                //verifies that the db key exists
                let sender = message.author;
                let currentList = await db.get(sender);

                //list pinglist
                db.get(message.author).then(response => {
                    message.reply(`Here is your pinglist: ${JSON.stringify(response)}`)
                });
            })();

            
        } else if (utility === 'removeall') {
            db.set(message.author,[]);
            message.reply("Your pingwords list has been reset");
        }else {
            message.reply(`Please follow: !pingword ${this.usage}`)
        }
	},

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