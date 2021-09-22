module.exports = {
	name: 'imdad',
	description: 'When a user says I\'m _, the bot replies "hi _, I\'m dad"',
	guildOnly: false,
	argsRequired: false,

	async execute(message) {
        const niceMessage = message.content.toLowerCase();

        //checks for i'm
        var scan = niceMessage.includes("i'm ");
        if ( scan ){
            const word = niceMessage.slice(niceMessage.indexOf(" i'm ") + " i'm ".length);
            if (word != '')
                message.reply(`Hi ${word.trim()}, I'm dad!`)
        }

        //checks for im
        scan = niceMessage.includes("im ");
        if ( scan ){
            const word = niceMessage.slice(niceMessage.indexOf(" im ") + " im ".length);
            if (word != '' && (niceMessage.indexOf("im ") == 0 || niceMessage[niceMessage.indexOf("im ") - 1] == ' '))
                message.reply(`Hi ${word.trim()}, I'm dad!`)
        }
	},
};
