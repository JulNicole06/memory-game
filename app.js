/* Game Logic */

let card1, card1value, card2, card2value;
let cards = document.querySelectorAll('.card');
let c = 1;

cards.forEach(function(card){
		card.addEventListener("click", reveal_card);
	});

function reveal_card() {
	prevent_reclick(this);
	if(c==1){
		c = c + 1;
		card1 = this;
		card1.classList.toggle("flipped");
		card1value = card1.firstElementChild.classList.value;
	}
	else if(c==2){
		c = 1;
		card2 = this;
		card2.classList.toggle("flipped");
		card2value = card2.firstElementChild.classList.value;
		if(card1value == card2value){
			console.log("MATCH!");
			setTimeout(function(){
				card1.classList.toggle("matched");
				card2.classList.toggle("matched");
			}, 1000);
		}
		else{
			console.log("WRONG ANSWER!");
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


/* Reset the game with "New Game" button */

const newGameButton = document.querySelector('#new-game-button');

newGameButton.addEventListener("click", new_game);


let order = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];

function new_game() {
	let i = 0;
	order = shuffle(order)
	cards.forEach(function(card) {
		/* reset class lists for event listeners*/
		card.setAttribute("class", "card flipped");
		card.addEventListener("click", reveal_card);
		card.style.order = order[i];
		i += 1;
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
