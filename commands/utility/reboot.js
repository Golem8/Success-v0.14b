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
          if (args[0] == 'force'){
            message.reply(`Attempting a hard reset`);
            exec("rm index.js", (error, stdout, stderr) => {
              console.log(`stdout (rm index.js): ${stdout}`);
            });
            exec("git reset --hard", (error, stdout, stderr) => {
              console.log(`stdout (git reset --hard): ${stdout}`);
            });
            exec("git pull", (error, stdout, stderr) => {
              console.log(`stdout (git pull): ${stdout}`);
            });
            exec("npm ci", (error, stdout, stderr) => {
              console.log(`stdout ("npm ci): ${stdout}`);
            });
          }else{
            exec("git pull", (error, stdout, stderr) => {
              console.log(`stdout (git pull): ${stdout}`);
              message.reply(`Ran Git pull`);
            });
          }
         
	},
};