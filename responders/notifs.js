const ChannelsWithNotifs = require('../db').ChannelsWithNotifs;

module.exports = {
    name: 'notifs',
    description: 'listens and triggers notifs for channels that have them enabled',

    async execute(message) {
        var queryres = await ChannelsWithNotifs.findAll({
            where: {
                notifsEnabled: true,
            }
        });
        if (queryres == undefined) return;
        queryres = queryres.map(sort => sort.channelId);
        if (queryres.includes(message.channel.id)) {
            res = []
            res.push(`From   ${message.author}`);
            res.push(`Server   ${message.guild.name}`);
            res.push(`Channel   ${message.channel.name}`);
            res.push(`Content   ${message.content}`);
            message.client.users.fetch(process.env.FEATURE_REQ_SNOWFLAKE).then(response => response.send(res))
                .catch(error => console.error(error));
        }
    }
};
