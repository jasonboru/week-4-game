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
	var deadToons = [];

	//set up objects: Toon
		//give objects  name: hitP: atkP: expP
	var toonRey = {
		hitP: 100, 
		atkP: 5, 
	}

	var toonFinn = {
		hitP: 125, 
		atkP: 10, 
	}

	var toonPhasma = {
		hitP: 150, 
		atkP: 15, 
	}

	var toonKyloRen = {
		hitP: 180, 
		atkP: 20, 
	}
	//function for on click event for user to pick their Toon
	$(".toonSelect").on("click", function() {
		if (!(gameActive) && !(chooseOpponent)) {
			chooseOpponent=true; //progress to player picks an opponent
			$("#choose").html("Opponent"); //changes choose 'Character' to 'Opponent'
			attacker = $(this).detach(); //removes players toon from list but will keep data in place
			attacker.appendTo("#battle-player"); //adds player to battle
			$("#arena").css("display", "block"); //show the battle arena which was priviously hidden
		} else if (chooseOpponent) { //function for on click event for user to pick their 1st oppenent
			chooseOpponent=false;
			gameActive=true; //will Activate later code to start the battle round
			attacked = $(this).detach(); // removes opponent from available
			attacked.appendTo("#battle-npc"); // adds npc to battle
			$("#toonSelectPanel").css("display", "none"); //hide the remaining unselected toons
		}
	})

	//function for on click of an Attack button to begin some code that has the player attack the NPC vice.versa
	function attack() {
		var opHitP = parseInt(attacked.data("hitp")); //stores oponents hit points as a num
		var userAP = parseInt(attacker.data("atkp")); //stores users attack power as a num
		opHitP -= userAP; //fight should use attack power to decrease hit points
		attacked.data("hitp", opHitP); //change data on attacked hitP
		$("#battle-npc").find(".toonHP").html(opHitP); //print Opponents new Hit Points post attack
		userAP+=userAP; 
		attacker.data("atkp", userAP);//increase the users attack power each strike.
		console.log(userAP);
		if (opHitP <= 0) {
			function defeated(){
				deadToons.push(attacked.detach()); //if NPC dies move it to the deadToons array and hide it
			} 
			defeated();
			$("#toonSelectPanel").css("display", "block");
			gameActive=false;
		} else {
			//if NPC lives post attack preform a counter attack.
			var userHitP = parseInt(attacker.data("hitp")); //stores users hit points as a num
			var opAP = parseInt(attacked.data("atkp")); //stores opponents attack power as a num
			userHitP -= opAP; // should use npc attack power to decrease user hit points
			attacker.data("hitp", userHitP); //change data on attacker hitP
			$("#battle-player").find(".toonHP").html(userHitP); //print users new Hit Points post counter attack
		}

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