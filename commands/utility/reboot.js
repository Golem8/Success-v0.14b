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
            if(stdout == "Already up to date."){
              message.reply("Already up to date");
            }
  
            if(stdout != "Already up to date."){
              message.reply("Either that worked or git pull failed idk which");
            }
          });

          
	},
};