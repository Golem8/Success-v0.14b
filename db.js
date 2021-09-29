const Sequelize = require('sequelize');

const sequelize = new Sequelize({
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

const Pingwords = sequelize.define('pingwords', {
	username: {
		type: Sequelize.STRING,
	},
	strings: {
		type: Sequelize.TEXT,
		defaultValue: '[]'
	},
	server: {
		type: Sequelize.TEXT,
	},
});

const Reminders = sequelize.define('reminders', {
	username: Sequelize.STRING,
	remindTime: Sequelize.DATE,
	returnChannel: Sequelize.STRING,
	returnMessage: Sequelize.TEXT,
	uuid: Sequelize.TEXT,
	messageLink: Sequelize.STRING,
});

const DotCommands = sequelize.define('dotcmds', {
	serverid: Sequelize.STRING,
	dotname: Sequelize.STRING,
	cmdoutput: Sequelize.STRING,
});

const MessageLinks = sequelize.define('messagelinks', {
	index: Sequelize.INTEGER,
	serverid: Sequelize.STRING,
	messageLink: Sequelize.STRING,
});

module.exports = {
    Pingwords,
    Reminders,
	DotCommands,
	MessageLinks,
};
