$(document).ready(function() {

	//set up variables: gameStart, gameWon, gameLost, roundWon, roundLost, pickToon, pickNPC
	var gameActive = false;
	var gameWon = false;
	var gameLost = false;
	var roundWon = false;
	var roundLost = false;
	var chooseOpponent = false;
	var attacker;
	var attacked;

	//set up objects: Toon
		//give objects  name: hitP: atkP: expP
	var toonRey = {
		hitP: 100, atkP: 5, expP: 10 
	}

	var toonFinn = {
		hitP: 125, atkP: 10, expP: 8 
	}

	var toonPhasma = {
		hitP: 150, atkP: 15, expP: 6 
	}

	var toonKyloRen = {
		hitP: 180, atkP: 20, expP: 4 
	}
	//function for on click event for user to pick their Toon
	$(".toonSelect").on("click", function() {
		if (!(gameActive) && !(chooseOpponent)) {
			chooseOpponent=true; //progress to player picks an opponent
			$("#choose").html("Opponent"); //changes choose 'Character' to 'Opponent'
			attacker = $(this).detach(); //removes players toon from list but will keep data in place
			attacker.appendTo("#battle-player"); //adds player to battle
			$("#arena").css("display", "block"); //show the battle arena which was priviously hidden
		} else if (chooseOpponent) { //functionm fo on click event for user to pick their 1st oppenent
			chooseOpponent=false;
			gameActive=true; //will Activate later code to start the battle round
			attacked = $(this).detach(); // removes opponent from available
			attacked.appendTo("#battle-npc"); // adds npc to battle
			$("#toonSelectPanel").css("display", "none"); //hide the remaining unselected toons
		}
	})

	//function for on click of an Attack button to begin some code that has the player attack the NPC vice.versa
	function attack() {
		var opHitP = parseInt(attacked.data("hitP")); //stores oponents hit points as a num
		var userAP = parseInt(attacker.data("atkP")); //stores users attack power as a num
		opHitP -= userAP; //fight should use attack power to decrease hit points
		attacked.data("hitP", opHitP); //change data on attacked hitP
		$("#battle-npc").find(".toonHP").html(opHitP);
		console.log(opHitP);
	}

	$(".fight").on("click", function() {
		attack();
	});

		
		
		
		//Print the results of each fight(click of attack btn) to the DOM
		
		//AtkP should stay constent for NPCs
		
		//AtkP should use some function to exponentially grow in each round. Possibly based of expP?
		
		//round should end when player or NPC hitP < 0
			
			//if player wins
				
				//print message 'You have defeated ' + NPCname
				
				//if attack btn is clicked before new oppenent give message to pick one
				
				//the gains in atkP & expP should be remembered in subsequent rounds
				
				//if there are no more opennents to select print message 'you win game' give a restart btn
			
			//if player loses
				
				//print message 'You have been defeated by ' + NPCname
				
				//give a restart btn

	//function for a resart btn to reload the page

});