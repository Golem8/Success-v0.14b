const { exec } = require("child_process");

module.exports = {
	name: 'reboot',
	description: 'reboots bot',
	usage: 'reboot bot',
	guildOnly: true,
	argsRequired: false,

    async execute(message, args) {
        if(message.guild.id != process.env.GUILDID){
              message.reply("This command is guild restricted");
              return;
          }
          message.reply("Attempting to pull changes for bot");
          exec("git pull", (error, stdout, stderr) => {
            console.log(`stdout (git pull): ${stdout}`);
            message.reply(`stdout (git pull): ${stdout}`);
          });

          
	},
};