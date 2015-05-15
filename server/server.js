Pot = new Mongo.Collection("pot");

function didWin(amount)
{
	var chances = amount * 100000000;
	console.log(chances);
	var pot = Pot.find().count();
	console.log(pot);
};

Meteor.startup(function(){
	Pot.insert({
		balance: 32
	});
	didWin(0.10003);
})