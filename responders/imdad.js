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
        const scan = (niceMessage.includes(" i'm ") || (niceMessage.length >= 4 && niceMessage.substring(0,2) === "i'm"));
        if ( scan ){
            const word = niceMessage.slice(niceMessage.indexOf(" i'm ") + " i'm ".length).trim();
            message.reply(`Hi ${word}, I'm dad!`)
        }

        //checks for im
        const scan2 = niceMessage.includes(" im ") || (niceMessage.length >= 3 && niceMessage.substring(0,1) === "im");
        if ( scan2 ){
            const word = niceMessage.slice(niceMessage.indexOf(" im ") + " im ".length).trim();
            message.reply(`Hi ${word}, I'm dad!`)
        }
	},
};
