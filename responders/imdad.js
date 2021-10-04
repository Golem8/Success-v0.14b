module.exports = {
	name: 'imdad',
	description: 'When a user says I\'m _, the bot replies "hi _, I\'m dad"',
	guildOnly: false,
	argsRequired: false,

	async execute(message) {
        const niceMessage = message.content.toLowerCase();
	let triggers = ["im", "i'm", "i’m", "i am"]
	
	triggers.forEach(function(element) {
		if (niceMessage.includes(element)){
        		const word = niceMessage.slice(niceMessage.indexOf(" " + element + " ") + (" " + element + " ").length);
        		if (word != '' && (niceMessage.indexOf(element + " ") == 0 || niceMessage[niceMessage.indexOf(element + " ") - 1] == ' '))
                	message.reply(`Hi ${word.trim()}, I'm dad!`)
        	}
	})
	/*
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
	*/

	},
};
