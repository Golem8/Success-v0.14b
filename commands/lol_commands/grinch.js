module.exports = {
	name: 'grinch',
	description: 'grinches on someone',
	guildOnly: true,
	argsRequired: true,

	async execute(message, args) {
        let name = args.join(' ');

        var messageArr = []
        messageArr.push(message.channel.send(`You're a mean one, ${name}`));
        messageArr.push(message.channel.send(`You really are a heel`));
        messageArr.push(message.channel.send(`You're as cuddly as a cactus, you're as charming as an eel, ${name}`));
        messageArr.push(message.channel.send(`You're a bad banana with a greasy black peel!`));
        messageArr.push(message.channel.send(`You're a monster, ${name}`));
        messageArr.push(message.channel.send(`Your heart's an empty hole`));
        messageArr.push(message.channel.send(`Your brain is full of spiders, you've got garlic in your soul, ${name}`));
        messageArr.push(message.channel.send(`I wouldn't touch you with a thirty-nine-and-a-half foot pole!`));
        messageArr.push(message.channel.send(`You're a vile one, ${name}`));
        messageArr.push(message.channel.send(`You have termites in your smile`));
        messageArr.push(message.channel.send(`You have all the tender sweetness of a seasick crocodile, ${name}`));
        messageArr.push(message.channel.send(`Given a choice between the two of you I'd take the seasick crocodile!`));
        messageArr.push(message.channel.send(`You're a foul one, ${name}`));
        messageArr.push(message.channel.send(`You're a nasty-wasty skunk`));
        messageArr.push(message.channel.send(`Your heart is full of unwashed socks, your soul is full of gunk, ${name}`));
        messageArr.push(message.channel.send(`The three words that best describe you are as follows, and I quote: "Stink, stank, stunk!"`));
        messageArr.push(message.channel.send(`You're a rotter, ${name}`));
        messageArr.push(message.channel.send(`You're the king of sinful sots`));
        messageArr.push(message.channel.send(`Your heart's a dead tomato splotched with moldy purple spots, ${name}`));
        messageArr.push(message.channel.send(`Your soul is an appalling dump heap overflowing with the most disgraceful`));
        messageArr.push(message.channel.send(`Assortment of deplorable rubbish imaginable, mangled up in tangled up knots!`));
        messageArr.push(message.channel.send(`You nauseate me, ${name}`));
        messageArr.push(message.channel.send(`With a nauseous super "naus"!`));
        messageArr.push(message.channel.send(`You're a crooked dirty jockey and you drive a crooked hoss, ${name}`));
        messageArr.push(message.channel.send(`You're a three decker sauerkraut and toadstool sandwich with arsenic sauce!`));
        setTimeout(() => {
            messageArr.forEach(async element => {
                msg = await element;
                msg.delete();
            });
        }, 60000);
	},
};