/* Game Logic */

let card1, card1value, card2, card2value;
let cards = document.querySelectorAll('.card');
let stars = document.querySelectorAll('.fa-star')
let cardCount = 1;
let score = 8;
let moves = 0;
let moveCounter = document.querySelector("#moves");

cards.forEach(function(card){
		card.addEventListener("click", reveal_card);
	});

function reveal_card() {
	prevent_reclick(this);
	if(cardCount==1){
		cardCount = cardCount + 1;
		card1 = this;
		card1.classList.toggle("flipped");
		card1value = card1.firstElementChild.classList.value;
	}
	else if(cardCount==2){
		cardCount = 1;
		card2 = this;
		card2.classList.toggle("flipped");
		card2value = card2.firstElementChild.classList.value;
		moves += 1;
		moveCounter.textContent = ("Moves: " + moves);
		if(card1value == card2value){
			matches += 1;
			setTimeout(function(){
				card1.classList.toggle("matched");
				card2.classList.toggle("matched");
			}, 1000);
		}
		else{
			score -= 1;
			return_event_listener(card1);
			return_event_listener(card2);
			setTimeout(function(){
				card1.classList.toggle("mismatch");
				card2.classList.toggle("mismatch");
			}, 0);
			setTimeout(function(){
				cards.forEach(function(card){
					card.classList.replace("mismatch", "flipped");
				})
				remove_star(score);
			}, 2000);
		}
	}
}

function prevent_reclick(card){
	card.removeEventListener("click", reveal_card);
}

function return_event_listener(card){
	card.addEventListener("click", reveal_card);
}

function remove_star(index) {
	let star = stars[index];
	star.classList.replace("fas", "far");
}

/* Reset the game with "New Game" button */

const newGameButton = document.querySelector('#new-game-button');

newGameButton.addEventListener("click", new_game);


let order = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];

function new_game() {
	let i = 0;
	score = 8;
	moves = 0;
	moveCounter.textContent = ("Moves: 0");
	order = shuffle(order)
	cards.forEach(function(card) {
		/* reset class lists for event listeners*/
		card.setAttribute("class", "card flipped");
		card.addEventListener("click", reveal_card);
		card.style.order = order[i];
		i += 1;
	})
	stars.forEach(function(star){
		star.classList.replace("far", "fas")
	})
	c = 1;

	/* Fisher-Yates Shuffle */

	function shuffle(array){
		let currentIndex = array.length, temporaryValue, randomIndex;
		while(0 !== currentIndex) {
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -=1;

			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}
		return array;
	}
}

/* shuffle cards for initial game */

new_game();


