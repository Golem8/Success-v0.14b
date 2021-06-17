const pingdb = require('../../db').Pingwords;

module.exports = {
	name: 'pingword',
	description: 'sets, removes, or lists the pingwords that a user has set',
	guildOnly: true,
	aliases: ['pingstring'],
	cooldown: 60,
    argsRequired: true,
    usage: 'pingword <add/remove/list/removeall> <pingword>',

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
            let sender = message.author.id;
            let currentList = JSON.parse(await this.getCurrentList(message));

            //update the array and db and respond to user
            currentList.push(pingstring)
            await pingdb.update({ strings: JSON.stringify(currentList) }, { where: { username: message.author.id } });
            message.reply(`Here is your updated pinglist: ${JSON.stringify(currentList)}`)

        } else if (utility === 'remove'){
            //makes sure there is a string included
            if (!pingstring.length){
                return message.reply("You cant remove nothing, add the string afterwards");
            }

            //create db entry if they do not have one yet
            await this.createList(message);

            let sender = message.author.id;
            let currentList = JSON.parse(await this.getCurrentList(message));

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
            await pingdb.update({ strings: JSON.stringify(currentList) }, { where: { username: message.author.id } });
            message.reply(`Here is your updated pinglist: ${JSON.stringify(currentList)}`)


        } else if (utility === 'list'){
            return message.reply(`Here is your pinglist: ${await this.getCurrentList(message)}`);

        } else if (utility === 'removeall') {
            //make list if they dont have one yet
            await this.createList(message);
            //set it to empty
            const affectedRows = await pingdb.update({ strings: JSON.stringify([]) }, { where: { username: message.author.id } });
            //if changes were made
            if (affectedRows > 0) {
                return message.reply("Your pingwords list has been reset");
            }
            return console.log(`ERROR: Unable to find db entry for user ${message.author.id}, utility = removeall`);
            
        }else {
            return message.reply(`Please follow: !${this.usage}`)
        }
	},

    //creates a new db entry if it does not exist yet
    async createList(message){
        let sender = message.author.id;
        try {
            
            const newUser = await pingdb.create({
                username: sender,
                strings: JSON.stringify([]),
            });
            console.log('Making new db entry for user ' + sender);
        }
        catch (e) {
            if (e.name === 'SequelizeUniqueConstraintError') {
                return console.log('User already in db');
            }
            return console.log('Error creating tag');
        }  
    },

    async getCurrentList(message){
        //creates a db entry if they do not have one
        await this.createList(message);
        const dbEntry = await pingdb.findOne({ where: { username: message.author.id } });
        return dbEntry.get('strings');
    } 
};