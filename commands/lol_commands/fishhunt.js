module.exports = {
	name: 'hunt',
	description: 'FISH HUNT',
	guildOnly: true,
	argsRequired: false,

	async execute(message, args) {
        var messageArr = []
        for (let index = 0; index < 3; index++) {
            messageArr.push(message.channel.send('YO'));  
        }
        messageArr.push(message.channel.send("It's a perfect day for a fish hunt"));
        messageArr.push(message.channel.send("So I'll load up all my swords in his Honda Accord Sport"));
        messageArr.push(message.channel.send("**2015**"));
        messageArr.push(message.channel.send("it's a good car"));
        messageArr.push(message.channel.send("Not a great car, but it's a good car"));
        messageArr.push(message.channel.send("Electric windows down, feel the breeze"));
        messageArr.push(message.channel.send("I brought **CDs!**"));
        messageArr.push(message.channel.send("Each one's Alicia Keys"));
        messageArr.push(message.channel.send("We get pumped 'n ready"));
        messageArr.push(message.channel.send("I got guns aplenty"));
        messageArr.push(message.channel.send("Man, these fish gonna die"));
        messageArr.push(message.channel.send("Lock hands 'till they get sweaty!"));
        messageArr.push(message.channel.send("And when they dry, then we know we arrived"));
        messageArr.push(message.channel.send("Grab the fish killing permit from the Ranger Guy"));
        messageArr.push(message.channel.send("He said, \"Son, listen here, look me in my eye,\""));
        messageArr.push(message.channel.send("He only had one eye! It wasn't hard to find"));
        messageArr.push(message.channel.send("I had astigmatism in the left one"));
        messageArr.push(message.channel.send("And the fish knew this, so they plucked out my best one"));
        messageArr.push(message.channel.send("Not only that, but they killed my wife"));
        messageArr.push(message.channel.send("So take this book of spells, and this enchanted scythe."));
        messageArr.push(message.channel.send("**Right**"));
        messageArr.push(message.channel.send("Yeah, fish hunt, fish hunt"));
        messageArr.push(message.channel.send("These fish have legs, And these fish can run"));
        messageArr.push(message.channel.send("Seven foot tall and proficient at fencin' and wrestlin'"));
        messageArr.push(message.channel.send("Let's find a nest, and eject them!"));
        messageArr.push(message.channel.send("Blood moon rise when we reached the hive"));
        messageArr.push(message.channel.send("I was killing many fish with my many knives!"));
        messageArr.push(message.channel.send("Shot my musket at the Fish King, one of his fish wings"));
        messageArr.push(message.channel.send("He summoned several skeletons to do his bidding!"));
        messageArr.push(message.channel.send("Epic fight!"));
        messageArr.push(message.channel.send("Too expensive to show"));
        messageArr.push(message.channel.send("I'm only one man and I live at home"));
        messageArr.push(message.channel.send("But legend has it to this very day"));
        messageArr.push(message.channel.send("That the war rages on"));
        messageArr.push(message.channel.send("'Tween the brothers and the Fish King"));
        messageArr.push(message.channel.send("But that's a story for another time"));
        messageArr.push(message.channel.send("So good night little one, dream of dolphins tonight"));
        messageArr.push(message.channel.send("That's a story for another time"));
        messageArr.push(message.channel.send("So good night little one, dream of dolphins tonight"));
        setTimeout(() => {
            messageArr.forEach(async element => {
                msg = await element;
                msg.delete();
            });
        }, 60000);
	},
};