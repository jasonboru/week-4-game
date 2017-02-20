$(document).ready(function() {

	//set up variables: gameStart, gameWon, gameLost, roundWon, roundLost, pickToon, pickNPC

	//set up objects: Toon
		//give objects  name: hitP: atkP: expP

	//function for on click event for user to pick their Toon

		//the remaining toons should be moved to an 'opponent' area

	//functionm fo on click event for user to pick their 1st oppenent

		//the players toon and chosen NPC should both move into a battle arena area

	//function for on click of an Attack button to begin some code that has the player attack the NPC vice.versa
		
		//fight should use attack power to decrease hit points
		
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