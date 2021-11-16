module.exports = {
    name: 'spaceadder',
    description: 'a  d  d  s     s  p  a  c  e  s',
    usage: 'spaceadder <numspaces> <text>',
    guildOnly: false,
    argsRequired: true,

    async execute(message, args) {
        numSpaces = args[0];
        args.shift();
        content = args.join(' ');
        returnStr = ''
/*
        if (numSpaces == -1) {
            for (let i = 0; i < content.length; i++) {
                returnStr += content.charAt(i);
                for (let index = 0; index < i; index++) {
                    returnStr += ' '; //add i spaces
                }
            }
        } else {
            for (let i = 0; i < content.length; i++) {
                returnStr += content.charAt(i);
                for (let index = 0; index < numSpaces; index++) {
                    returnStr += ' '; //add numSpaces spaces
                }
            }
        }
*/
        for (let i = 0; i < content.length; i++) {
            returnStr += content.charAt(i);
            for (let index = 0; index < (numSpaces == -1 ? i : (numSpaces == -2 ? Math.floor(Math.random() * 5) : numSpaces)); index++) {
                returnStr += ' '; //add numSpaces spaces
            }
        }
      
        return message.channel.send(returnStr.substring(0,2000))
    },
};
