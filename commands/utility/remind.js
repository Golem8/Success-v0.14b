const Reminders = require('../../db').Reminders;
const { v4: uuidv4 } = require('uuid');

module.exports = {
    name: 'remind',
    description: 'reminds the user of whatever they asked whenever they asked to be reminded',
    guildOnly: true,
    aliases: [],
    cooldown: 0,
    argsRequired: true,
    usage: "remind <timeString> <message>",

    async execute(message, args) {
        let timeString = args[0];
        let weeks = 0;
        let days = 0;
        let hours = 0;
        let minutes = 0;
        let seconds = 0;

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
        remindMessage = args.join(' ');

        //ensure the correct args are being used
        if (timeString == undefined || remindMessage == undefined || remindMessage == '') {
            return message.reply(`Please follow: !${this.usage}`)
        }
        remindTime = Date.now() + (604800000 * weeks) + (86400000 * days) + (3600000 * hours) + (60000 * minutes) + (1000 * seconds);
        uuid = uuidv4();
        try {
            await Reminders.create({
                //snowflake
                username: message.author.id,
                remindTime: remindTime,
                returnChannel: message.channel.id,
                returnMessage: remindMessage,
                uuid: uuid,
                messageLink: message.url,
            });
            this.addReminder(uuid, message.client);
            return message.react('👍');
            
        } catch (error) {
            console.error(error);
        }

    },
    async addReminder(uuid, client) {
        reminder = await Reminders.findOne({ where: { uuid: uuid } });
        setTimeout(async reminder => {
            res = [];
            res.push(`<@${reminder.dataValues.username}>, your reminder is fully cooked`);
            res.push(`You wanted to be reminded: ${reminder.dataValues.returnMessage}`);
            res.push(`${reminder.messageLink}`);

            client.channels.cache.get(reminder.returnChannel).send(res);
            const rowCount = await Reminders.destroy({ where: { uuid: reminder.uuid } });
            if (!rowCount) console.error('No reminder found to delete');
        }, Date.parse(reminder.remindTime) - Date.now(), reminder);
    }
};


