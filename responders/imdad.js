module.exports = {
	name: 'imdad',
	description: 'When a user says I\'m _, the bot replies "hi _, I\'m dad"',
	guildOnly: false,
	aliases: [],
	cooldown: 0,
	argsRequired: false,

	async execute(message) {
        const niceMessage = message.content.toLowerCase();

        var scan = niceMessage.startsWith("i'm ");
        if ( scan ){
            const word = niceMessage.slice(niceMessage.indexOf("i'm") + "i'm".length);
            if (word != '')
                message.reply(`Hi ${word.trim()}, I'm dad!`)
        }

        scan = niceMessage.startsWith("im ");
        if ( scan ){
            const word = niceMessage.slice(niceMessage.indexOf("im") + "im".length);
            if (word != '')
                message.reply(`Hi ${word.trim()}, I'm dad!`)
        }

        //checks for i'm
        var scan = niceMessage.includes(" i'm");
        if ( scan ){
            const word = niceMessage.slice(niceMessage.indexOf(" i'm ") + " i'm ".length);
            if (word != '')
                message.reply(`Hi ${word.trim()}, I'm dad!`)
        }

        //checks for im
        scan = niceMessage.includes(" im");
        if ( scan ){
            const word = niceMessage.slice(niceMessage.indexOf(" im ") + " im ".length);
            if (word != '')
                message.reply(`Hi ${word.trim()}, I'm dad!`)
        }
	},
};