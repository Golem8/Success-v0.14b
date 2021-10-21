require('dotenv').config();
const Discord = require('discord.js');
const ChannelsWithNotifs = require('../../db').ChannelsWithNotifs;

module.exports = {
    name: 'pt',
    description: 'passthrough functionality for sending and recieving messages from any channel',
    guildOnly: false,
    argsRequired: true,
    usage: 'pt !<send/read/tree/notif> <command> <response>',


    async execute(message, args) {
        if (message.author.id != process.env.FEATURE_REQ_SNOWFLAKE) {
            return;
        }

        if (args[0] == 'tree') this.createTree(message, true);
        else if (args[0] == 'notif') {
            channelNumber = args[1] - 1
            if (args[2] == 'on') {
                const channelIds = await this.createTree(message, false);
                channelId = channelIds[channelNumber]
                if (channelId == null) return message.reply("I failed to find that channel");

                await this.checkEntryExists(message, channelId)
                await ChannelsWithNotifs.update({ notifsEnabled: true }, {
                    where: {
                        channelId: channelId
                    }
                });
            }
            else if (args[2] == 'off') {
                const channelIds = await this.createTree(message, false);
                channelId = channelIds[channelNumber]
                if (channelId == null) return message.reply("I failed to find that channel");

                await this.checkEntryExists(message, channelId)
                await ChannelsWithNotifs.update({ notifsEnabled: false }, {
                    where: {
                        channelId: channelId
                    }
                });

            }
            else {
                message.reply('<notif> <channelNumber> <on/off>')
            }

        } else if (args[0] == 'send') {
            args.shift() //removes the send element
            channelNumber = args[0] - 1
            const channelIds = await this.createTree(message, false);
            channelId = channelIds[channelNumber]
            if (channelId == null) return message.reply("I failed to find that channel");

            args.shift() //remove channel num arg

            const destinationChannel = await message.client.channels.fetch(channelId);
            destinationChannel.send(args.join(' '))
            message.react('👍');

        }
        else if (args[0] == 'read') {
            args.shift() //removes the send element
            channelNumber = args[0] - 1
            const channelIds = await this.createTree(message, false);
            channelId = channelIds[channelNumber]
            if (channelId == null) {
                message.reply("Please enter valid number. <read> <channelNum> <number of messages to fetch>");
                return message.reply("I failed to find that channel");
            }
            args.shift() //remove channel num arg

            grabNum = args[0]

            if (grabNum == null || !Number.isInteger(parseInt(grabNum)) || grabNum > 100 || grabNum <= 0)
                return message.reply("Please enter valid number. <read> <channelNum> <number of messages to fetch>");


            args.shift() //remove grabNum arg

            const sourceChannel = await message.client.channels.fetch(channelId);
            res = []
            charCount = 0
            sourceChannel.messages.fetch({ limit: grabNum }).then(recieved => {
                console.log(`Received ${recieved.size} messages`);

                recieved.forEach(recievedIndiv => {
                    if (charCount > 1500) {
                        message.reply(res)
                        res = []
                        charCount = 0
                    }
                    res.push(`${recievedIndiv.author.username}    ${recievedIndiv.content}`)
                    charCount += `${recievedIndiv.author.username}    ${recievedIndiv.content}`.length
                })
                if (res[0] != undefined) {
                    message.reply(res)
                }
                else {
                    message.reply('Could not find anything in message history')
                }
            })


        }
        else {
            return message.reply(`Please follow: !${this.usage}`);
        }

    },
    async createTree(message, doSendMessage) {
        res = []
        counter = 1 //for keeping track of which channel is which
        channelArrSorted = [] //channelArr[counter-1] will return the channel id corresponding to the printed channel with id counter


        var queryres = await ChannelsWithNotifs.findAll({
            where: {
                notifsEnabled: true,
            }
        });
        queryres = queryres.map(sort => sort.channelId);

        guildsArr = message.client.guilds.cache
        guildsArr.forEach(guild => {
            res.push(`- **${guild.name}**`);
            channelsArr = guild.channels.cache.filter(c => c.guild && c.type === 'text')
            channelsArr.forEach(channel => {
                channelArrSorted.push(channel.id)

                var pushstr = (`    L ${channel.name}  (${counter})`);
                if (queryres.includes(channel.id)) {
                    pushstr += ('🔔');
                }
                counter++;
                res.push(pushstr)
            })
            res.push('');

        })
        if (doSendMessage)
            message.channel.send(res)
        return channelArrSorted;
    },

    async checkEntryExists(message, cId) {
        const dbEntry = await ChannelsWithNotifs.findOne({
            where: {
                channelId: cId,
            }
        });

        if (dbEntry == null) {
            try {
                await ChannelsWithNotifs.create({
                    channelId: cId,
                    notifsEnabled: false,
                });
                console.log('Making new db entry for pt channel ' + cId);
            }
            catch (e) {
                return console.log('Error creating new entry passthrough channel', e);
            }
        }
    },
};
