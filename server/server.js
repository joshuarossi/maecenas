function didWin(amount)
{
	var chances = Math.round(amount * 10000);
	console.log(chances);
	var pot = Jackpot.findOne().value;
	var potchance = Math.round(pot * 1000);
	console.log(pot);
	var rand = Math.round(Math.random() * 5);

    return rand = 5;
}

Meteor.startup(function(){
	Jackpot.insert({
		value: 3.2
	});
	console.log(didWin(0.10003));
});
