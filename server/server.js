Pot = new Mongo.Collection("pot");
Wins = new Mongo.Collection("wins");
Transactions = new Mongo.Collection("transactions");

function didWin(amount)
{
	var chances = Math.round(amount * 10000);
	console.log(chances);
	var pot = Pot.findOne().balance;
	var potchance = Math.round(pot * 1000);
	console.log(pot);
	var rand = Math.round(Math.random() * 5);
	
	if(rand = 5)
	{
		return true;
	}
	else
	{
		return false;
	}
};

Meteor.startup(function(){
	Pot.insert({
		balance: 32
	});
	console.log(didWin(0.10003));
});