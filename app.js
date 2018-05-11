const cards = document.querySelectorAll('.card');

/* Game Logic */

function take_a_turn(){
	cards.forEach(function(card){
		card.addEventListener("click", reveal_card);
		card.addEventListener("click", prevent_reclick);
	});

	i = 1;
	let card1, card2;

	function reveal_card() {
		if(i==1){
			this.classList.toggle("flipped");
			card1 = this.firstElementChild.classList.value;
			i = i + 1;
		}
		else if(i==2){
			this.classList.toggle("flipped");
			card2 = this.firstElementChild.classList.value;
			if(card1 == card2){
				console.log("MATCH!");
			}
			else{
				console.log("WRONG ANSWER!");
			}
			remove_event_listeners();
		}
	}

	function prevent_reclick(){
		this.removeEventListener("click", reveal_card);
	}

	function remove_event_listeners(){
		cards.forEach(function(card){
			card.removeEventListener("click", reveal_card);
		});
	}
}

/* Randomize card display order with "Shuffle Deck" button */

const shuffleButton = document.querySelector('#shuffle-button');
let order = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];

shuffleButton.addEventListener("click", function(){
	let i = 0;
	order = shuffle(order);
	cards.forEach(function(card){
		card.style.order = order[i];
		i += 1;
	})
})

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


take_a_turn();
