module.exports = {
	name: 'imdad',
	description: 'When a user says I\'m _, the bot replies "hi _, I\'m dad"',
	guildOnly: false,
	aliases: [],
	cooldown: 0,
	argsRequired: false,

	async execute(message) {
        const niceMessage = message.content.toLowerCase();

        //checks for i'm
        const scan = niceMessage.includes(" i'm ");
        if ( scan ){
            const word = niceMessage.slice(niceMessage.indexOf(" i'm ") + " i'm ".length);
            message.reply(`Hi ${word}, I'm dad!`)
        }

        //checks for im
        const scan2 = niceMessage.includes(" im ");
        if ( scan2 ){
            const word = niceMessage.slice(niceMessage.indexOf(" im ") + " im ".length);
            message.reply(`Hi ${word}, I'm dad!`)
        }
	},
};