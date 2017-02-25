 $(document).ready(function() {

//set up variables: gameStart, gameWon, gameLost, pickToon, pickNPC
var gameActive = false;
var gameWon = false;
var gameLost = false;
var chooseOpponent = false;
var attacker;
var attacked;
var winner;
var loser;
var deadToons = [];

var audioSaber = document.createElement("audio");
audioSaber.setAttribute("src", "assets/sounds/Lightsaber-Clash.mp3");

//set up objects: Toon
//give objects  name: hitP: atkP: expP
var toonRey = {
    hitp: 100,
    atkp: 5
}

var toonFinn = {
    hitp: 125,
    atkp: 4
}

var toonPhasma = {
    hitp: 150,
    atkp: 2
}

var toonKyloRen = {
        hitp: 180,
        atkp: 1
}
    //function for on click event for user to pick their Toon
$(".toonSelect").on("click", function() {
    if (!(gameActive) && !(chooseOpponent)) {
        chooseOpponent = true; //progress to player picks an opponent
        $("#choose").html("Opponent"); //changes choose 'Character' to 'Opponent'
        attacker = $(this).detach(); //removes players toon from list but will keep data in place
        attacker.appendTo("#battle-player"); //adds player to battle
        $("#arena").css("display", "block"); //show the battle arena which was priviously hidden
    } else if (chooseOpponent) { //function for on click event for user to pick their 1st oppenent
        chooseOpponent = false;
        gameActive = true; //will Activate later code to start the battle round
        attacked = $(this).detach(); // removes opponent from available
        attacked.appendTo("#battle-npc"); // adds npc to battle
        $("#toonSelectPanel").css("display", "none"); //hide the remaining unselected toons
    }
})

function reset() { //function for a restart btn to reset the to starting variables
	if (gameLost || gameWon) {
		winner = attacked.detach();
        loser = attacker.detach();
		gameActive = false;
		chooseOpponent = false;
		gameLost = false;
        gameWon = false;
		for (i = 0; i < deadToons.length; i++) {
		deadToons[i].appendTo("#toonSelectPanel");
		}
		deadToons=[];
		winner.appendTo("#toonSelectPanel");
        loser.appendTo("#toonSelectPanel");
		//reset display
		$("#battle-text").html("");
		$("#choose").html("Character");
		$("#reset").fadeOut("slow");
		$("#fignt").fadeOut("slow");
		//reset toon data
		$("#rey").data("hitp", toonRey.hitp).find(".toonHP").html(toonRey.hitp);
		$("#rey").data("atkp", toonRey.atkp);
		$("#finn").data("hitp", toonFinn.hitp).find(".toonHP").html(toonFinn.hitp);
		$("#finn").data("atkp", toonFinn.atkp);
		$("#phasma").data("hitp", toonPhasma.hitp).find(".toonHP").html(toonPhasma.hitp);
		$("#phasma").data("atkp", toonPhasma.atkp);
		$("#kyloRen").data("hitp", toonKyloRen.hitp).find(".toonHP").html(toonKyloRen.hitp);
		$("#kyloRen").data("atkp", toonKyloRen.atkp);

		$("#toonSelectPanel").css("display", "block");

	}
}

var timeoutID;
function endRoundWin() {
    // check if there are any oppenents left to fight.
    if (deadToons.length === 3) {
        gameWon=true; //set GameWon to true to trigger reset on click
        function winGame() { //if user wins display Congrats text
            $("#battle-text").text("Congratulations! You have defeated all of your Foes. You have mastered the Force!");
            $("#toonSelectPanel").css("display", "none"); //hide the remaining unselected toons
            $("#reset").fadeIn("slow"); //show restart button
        }
        timeoutID = window.setTimeout(winGame, 1000); //call winGame function with a delay so the last battle text still shows
        //$("#reset").fadeIn("slow"); //show restart button
        $("#arena").fadeOut("slow"); //hide areana (vs & fight button)

        
        winner = attacker.detach(); //remove the user from the battle-player div and label that toon winner
    } else {
        chooseOpponent = true; //if player won round but not game set it to choose next oppenent.
        $("#toonSelectPanel").css("display", "block"); //show character select section
    }

}

//function for on click of an Attack button to begin some code that has the player attack the NPC vice.versa

function attack() {
    var opHitP = parseInt(attacked.data("hitp")); //stores oponents hit points as a num
    var userAP = parseInt(attacker.data("atkp")); //stores users attack power as a num
    opHitP -= userAP; //fight should use attack power to decrease hit points
    attacked.data("hitp", opHitP); //change data on attacked hitP
    $("#battle-npc").find(".toonHP").html(opHitP); //print Opponents new Hit Points post attack
    $("#battle-text").html("You hit " + attacked.data("name") + " for " + userAP + ". "); //send battle notice to user
    if (userAP < 25){
        userAP += userAP; //user AtkP increases each click of Fight
    } else {
        userAP += 22;
    }
    attacker.data("atkp", userAP); //increase the users attack power each strike.
    console.log(userAP);
    if (opHitP <= 0) { //round ends when NPC hitP <= 0
        function defeatedNPC() {
            deadToons.push(attacked.detach()); //if NPC dies move it to the deadToons array and hide it
        	console.log(deadToons);
        	$("#battle-text").text("You have defeated " + attacked.data("name") + ". "); //print message 'You have defeated ' + NPCname
        	endRoundWin();
            
        } 
        timeoutID = window.setTimeout(defeatedNPC, 2000);
    } else {
        //if NPC lives post attack preform a counter attack.
        var userHitP = parseInt(attacker.data("hitp")); //stores users hit points as a num
        var opAP = parseInt(attacked.data("catkp")); //stores opponents attack power as a num
        userHitP -= opAP; // should use npc attack power to decrease user hit points
        attacker.data("hitp", userHitP); //change data on attacker hitP
        $("#battle-player").find(".toonHP").html(userHitP); //print users new Hit Points post counter attack
        $("#battle-text").append("And " + attacked.data("name") + " hit you for " + opAP + ". "); //send battle notice to user
        if (userHitP <=0) { //game ends when player hitP <= 0
        	gameLost=true;
        	
        	$("#arena").fadeOut("slow");
            $("#battle-text").text("You have been defeated by" + attacked.data("name") + ". ");
                function defeatedUser () {
                    deadToons.push(attacker.detach()); //if palyer dies move it to the deadToons array and hide it
                    console.log(deadToons);
                    $("#reset").fadeIn("slow");
                    $("#battle-text").text("Would you like to play again? Click Restart.");
                }
                timeoutID = window.setTimeout(defeatedUser, 2000);
        }

    }

}

$("button").on("click", function() { //on click events for buttons
	if (gameLost || gameWon) { // if user lost or game isnt active click does a reset
		reset();
	} else if (chooseOpponent) {
        $("#battle-text").text("You must first pick a new opponent"); //if attack btn is clicked before new oppenent give message to pick one
    } else { // otherwise click preform an attack
		attack();
        if (audioSaber.duration > 0 && !audioSaber.paused) {
            audioSaber.pause();
            audioSaber.currentTime = 0;
            audioSaber.play();
            } else {
                audioSaber.play();
            }
	}
})


});





