const Sequelize = require('sequelize');

const sequelize = new Sequelize({
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

const Pingwords = sequelize.define('pingwords', {
	username: {
		type: Sequelize.STRING,
		unique: true,
	},
	strings: {
		type: Sequelize.TEXT,
		defaultValue: '[]'
	},
});

const Reminders = sequelize.define('reminders', {
	username: Sequelize.STRING,
	remindTime: Sequelize.DATE,
	returnChannel: Sequelize.STRING,
	returnMessage: Sequelize.TEXT,
	uuid: {
		type: Sequelize.UUID,
		allowNull: false,
		primaryKey: true
	  },
	  messageLink: Sequelize.STRING,
});

const DotCommands = sequelize.define('dotcmds', {
	serverid: Sequelize.STRING,
	dotname: Sequelize.STRING,
	cmdoutput: Sequelize.STRING,
});

module.exports = {
    Pingwords,
    Reminders,
	DotCommands,
};
