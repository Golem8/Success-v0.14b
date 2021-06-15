db = require('../../index');

module.exports = {
	name: 'pingword',
	description: 'sets, removes, or lists the pingwords that a user has set',
	guildOnly: true,
	aliases: ['pingstring'],
	cooldown: 60,
    argsRequired: true,
    usage: '<add/remove/list> <pingword>',

	execute(message, args) {
        //add remove list
        utility = args[0];
        args.shift();
        
        pingstring = args.join(' ');

        //create new pingwords entry if it does not already exist for message.author 
       
        if (utility === 'add'){
            if (!pingstring.length){
                return message.reply("You cant add nothing, add the string afterwards");
            }

            (async () => {
                //verifies that the entry alread exists
                let sender = message.author;
                let currentList = await db.get(sender);

                if(currentList===undefined){
                    //create entry for that user
                    console.log('Making new db entry for user ' + sender);
                    currentList = [];
                }    

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
                let sender = message.author;
                currentList = await db.get(sender);

                //make sure the entry is there
                //lazy eval first checks for undefined
                if(currentList === undefined || !currentList.includes(pingstring)){
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
                //verifies that the db key exists
                let sender = message.author;
                let currentList = await db.get(sender);

                //make new entry if undef
                if(currentList===undefined){
                    //create entry for that user
                    console.log('Making new db entry for user ' + sender);
                    await db.set(message.author,[]);
                }    

                //list pinglist
                db.get(message.author).then(response => {
                    console.log(response)
                    message.reply(`Here is your pinglist: ${JSON.stringify(response)}`)
                });
            })();

            
        } else if (utility === 'removeall') {
            db.set(message.author,[]);
            message.reply("Your pingwords list has been reset");
        }else {
            message.reply(`Please follow: !pingword <add/remove/list> <pingword>`)
        }
	},
};