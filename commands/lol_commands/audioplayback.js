module.exports = {
	name: 'painmode',
	description: 'Plays back whatever you say but with a delay',
	guildOnly: true,
	argsRequired: false,

	async execute(message, args) {
        // if (message.member.voice.channel) {
        //     const connection = await message.member.voice.channel.join();
        //         message.member.voice.channel.members.forEach((member) => {
        //             if (member.user.id != message.client.user.id){
        //                 const audio = connection.receiver.createStream(member.user.id, { end: 'manual' });
        //                 connection.play(audio, { type: 'opus', volume: 3 });
        //             }
        //         });
            
        // } else {
        //     message.reply('you must be in a voice channel to use that command');
        // }
        message.reply("This command has been deprecated")
	},
};