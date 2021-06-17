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
	username: {
		type: Sequelize.STRING,
		unique: true,
	},
	strings: {
		type: Sequelize.TEXT,
		defaultValue: '[]'
	},
});

module.exports = {
    Pingwords,
    Reminders
};
