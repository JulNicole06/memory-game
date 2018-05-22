/* Declare variables */
let mismatch, moves, gameStart, startTime, elapsedTime,
	endTime, minutes, seconds, cardCount, deckCount;
let stars = document.querySelectorAll('.fa-star')
let moveCounter = document.querySelector("#moves");
let time = document.querySelector("#time");
let order = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
let card1, card1value, card2, card2value;
let cards = document.querySelectorAll('.card');
const newGameButton = document.querySelector('#new-game-button');
let timer = null;
let finalTime = document.querySelector("#end-time");
let finalMoves = document.querySelector("#end-moves");
let finalStars = document.querySelector("#end-stars");
let congratsPopup = document.querySelector("#congrats-modal");
/* Add event listeners */
newGameButton.addEventListener("click", new_game);

cards.forEach(function(card){
		card.addEventListener("click", reveal_card);
	});

/* Start or Reset Game */
function new_game() {
	if (timer !== null) {
		end_game();
	}

	/* Show congrats modal */
	congratsPopup.style.display = 'none';

	/* Set or Reset scoreboard */
	gameStart = true;
	startTime = new Date();
	time.textContent = "00:00"
	mismatch = 0;
	moves = 0;
	moveCounter.textContent = ("0");
	stars.forEach(function(star){
		star.classList.replace("far", "fas")
	})
	cardCount = 1;
	deckCount = 16;

	/* Shuffle deck */
	let i = 0;
	order = shuffle(order)
	cards.forEach(function(card) {
		/* reset class lists for event listeners*/
		card.setAttribute("class", "card flipped");
		card.addEventListener("click", reveal_card);
		card.style.order = order[i];
		i += 1;
	})
}

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

/* Game logic for matching / mismatched cards */
function reveal_card() {
	if(gameStart == true){
		startTime = Date.now();
		start_timer();
	}

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
		moveCounter.textContent = (moves);
		if(card1value == card2value){
			deckCount -= 2;
			if(deckCount == 0) {
				end_game();
			}
			setTimeout(function(){
				card1.classList.toggle("matched");
				card2.classList.toggle("matched");
			}, 1000);
		}
		else{
			mismatch += 1;
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
				remove_star(mismatch);
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

function remove_star(mismatch) {
	let index, star;

	if(mismatch==4){
		index = 2;
	}else if(mismatch==10){
		index = 1
	}else{
		return;
	}
	star = stars[index];
	star.classList.replace("fas", "far");
}

function start_timer() {
	gameStart = false;
	timer = setInterval(add_second, 1000);
	startTime = new Date();
}

function end_game() {
	let starsRemaining = 3 - document.querySelectorAll(".far").length;
	let time = document.querySelector("#timer").textContent;

	/* Set timer to null to avoid automatic restart before 1st click */
	clearInterval(timer);
	timer = null;

	/* Fill in results on congrats modal */
	finalTime.textContent = time + " minutes";

	finalMoves.textContent = moves + " moves";

	finalStars.textContent = starsRemaining + " stars";

	/* Show congrats modal */
	setTimeout(function() {
		congratsPopup.style.display = 'block';
	}, 2000);
}

function add_second() {
	endTime = new Date();
	elapsedTime = (endTime - startTime);
	time.textContent = format_time(elapsedTime);
}

function format_time(elapsedTime) {
	minutes = new Date(elapsedTime).getUTCMinutes();
	seconds = new Date(elapsedTime).getUTCSeconds();
	return add_zero(minutes)+":"+add_zero(seconds);
}

function add_zero(number) {
	if(number < 10){
		number = "0"+number;
	}
	return number;
}

new_game();


