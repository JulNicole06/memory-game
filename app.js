/* Animation to flip cards when clicked */

const cards = document.querySelectorAll('.card');

cards.forEach(function(card){
	card.addEventListener("click", function(){
		card.classList.toggle("flipped");
	})
})


/* Randmize card display order with "Shuffle Deck" button */

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