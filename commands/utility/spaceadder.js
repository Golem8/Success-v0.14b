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

        for (let i = 0; i < content.length; i++) {
            returnStr += content.charAt(i);
            for (let index = 0; index < (numSpaces == -1 ? i : (numSpaces == -2 ? Math.floor(Math.random() * 4)+1 : numSpaces)); index++) {
                returnStr += ' '; //add numSpaces spaces
            }
        }
        
        for (let i = 0; i < Math.floor(returnStr.length / 2000) && i < 15; i++) {
            message.channel.send(returnStr.substring(2000 * i, 2000 * (i + 1)))
        }
        return message.channel.send(returnStr.substring(returnStr.length - (returnStr.length % 2000)))
    },
};
