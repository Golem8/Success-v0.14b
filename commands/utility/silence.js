require('dotenv').config();
const Mutations = require('../../db').Mutations;
const { v4: uuidv4 } = require('uuid');

mutedRoleName = "Silent Observer"

module.exports = {
    name: 'mute',
    description: 'adds the silent observer role',
    guildOnly: true,
    argsRequired: false,
    usage: "mute @user <timeString> <reason>",

    async execute(message, args) {
        //var role = message.guild.roles.cache.find(role => role.name === "Silent Observer");
        var role = message.guild.roles.cache.find(role => role.name === mutedRoleName);
        args.shift() //remove mention from args list
        user = message.mentions.members.first()

        //hanle timestring stuff
        let timeString = args[0];
        let weeks = 0;
        let days = 0;
        let hours = 0;
        let minutes = 0;
        let seconds = 0;
        if (timeString == undefined || user == undefined) {
            return message.reply(`Please follow: !${this.usage}`)
        }
        if (timeString.includes('w')) {
            weeks = timeString.slice(0, timeString.indexOf('w'));
            timeString = timeString.slice(timeString.indexOf('w') + 1);
        }
        if (timeString.includes('d')) {
            days = timeString.slice(0, timeString.indexOf('d'));
            timeString = timeString.slice(timeString.indexOf('d') + 1);
        }
        if (timeString.includes('h')) {
            hours = timeString.slice(0, timeString.indexOf('h'));
            timeString = timeString.slice(timeString.indexOf('h') + 1);
        }
        if (timeString.includes('m')) {
            minutes = timeString.slice(0, timeString.indexOf('m'));
            timeString = timeString.slice(timeString.indexOf('m') + 1);
        }
        if (timeString.includes('s')) {
            seconds = timeString.slice(0, timeString.indexOf('s'));
            timeString = timeString.slice(timeString.indexOf('s') + 1);
        }
        if (timeString != '') return message.reply('Malformed time string');
        args.shift();
        reason = args.join(' ');

        //ensure the correct args are being used
        if (reason == undefined || reason == '') {
            return message.reply(`Please follow: !${this.usage}`)
        }
        endTime = Date.now() + (604800000 * weeks) + (86400000 * days) + (3600000 * hours) + (60000 * minutes) + (1000 * seconds);
        uuid = uuidv4();
        try {
            existing = await Mutations.findOne({ where: { muteeSnowflake: user.user.id } });
            if (existing == undefined) {
                await Mutations.create({
                    //snowflake
                    muteeSnowflake: user.user.id,
                    endTime: endTime,
                    reason: reason,
                    uuid: uuid,
                    guildSnowflake: message.guild.id,
                });
                this.addMutation(uuid, message.client);
                user.roles.add(role);
                return message.react('👍');
            }
            else{
                await Mutations.update({ endTime: endTime }, {where: { muteeSnowflake: user.user.id } }); //update mute time
                return message.react('👍');
            }

        } catch (error) {
            console.error(error);
        }
    },
    async addMutation(uuid, client) {
        mutation = await Mutations.findOne({ where: { uuid: uuid } });
        setTimeout(async (uuid, client) => {
            mutation = await Mutations.findOne({ where: { uuid: uuid } });
            const rowCount = await Mutations.destroy({ where: { uuid: mutation.uuid } });
            if (!rowCount) console.error('No mutation found to delete');
            if ((mutation.endTime) - Date.now() > 1000) {

                await Mutations.create({
                    muteeSnowflake: mutation.muteeSnowflake,
                    endTime: mutation.endTime,
                    reason: mutation.reason,
                    uuid: mutation.uuid,
                    guildSnowflake: mutation.guildSnowflake,
                });
                this.addMutation(uuid, client);
            } else {
                guild = client.guilds.cache.find(guild => guild.id === mutation.guildSnowflake)
                //get the user
                user = guild.members.cache.find(user => user.id === mutation.muteeSnowflake) 
                
                role = guild.roles.cache.find(role => role.name === mutedRoleName);
                user.roles.remove(role);
                
            }

        }, Date.parse(mutation.endTime) - Date.now(), uuid, client); //param 3 is send as a argument to the function that is called back
    }
};
