/* Add event listeners */
const newGameButton = document.querySelector('#new-game-button');
const cards = document.querySelectorAll('.card');

newGameButton.addEventListener("click", new_game);

cards.forEach(function(card){
		card.addEventListener("click", reveal_card);
	});

/* Start/Reset Game */
const congratsPopup = document.querySelector("#congrats-modal");
let stars = document.querySelectorAll('.fa-star');
let moveCounter = document.querySelector("#moves");
let timer = null;
const time = document.querySelector("#time");
let moves, gameStart, cardCount, deckCount, mismatch;
let order = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];

function new_game() {
	/* Hide congrats pop up */
	congratsPopup.style.display = 'none';

	/* Set/Reset scoreboard */
	stars.forEach(function(star){
		star.classList.replace("far", "fas");
	})
	moveCounter.textContent = ("0");
	moves = 0;
	if(timer !== null) {
		end_game();
	}
	time.textContent = "00:00";

	/* Set/Reset starting game counts */
	gameStart = true;
	cardCount = 1;
	deckCount = 16;
	mismatch = 0;

	/* Shuffle deck */
	let i = 0;
	order = shuffle(order);
	cards.forEach(function(card) {
		/* Reset class lists for event listeners on reset */
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
let startTime, card1, card1value, card2, card2value;

function reveal_card() {
	if(gameStart == true){
		startTime = Date.now();
		start_timer();
	}

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
	prevent_reclick(this);
}

/* Prevent card from being flipped back over on re-click */
function prevent_reclick(card) {
	card.removeEventListener("click", reveal_card);
}

/* Return listeners once full turn is complete */
function return_event_listener(card) {
	card.addEventListener("click", reveal_card);
}

/* Remove a star after multiple wrong moves */
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

/* Start game timer */
function start_timer() {
	gameStart = false;
	timer = setInterval(add_second, 1000);
	startTime = new Date();
}

/* End game and present final scores */
let finalStars, starsRemaining, finalMoves, finalTime;

function end_game() {
	finalStars = 3 - document.querySelectorAll(".far").length;

	/* Set timer to null to avoid automatic restart before 1st click */
	clearInterval(timer);
	timer = null;

	/* Fill in results on congrats modal */
	finalStars.textContent = starsRemaining + " stars";
	finalMoves.textContent = moves + " moves";
	finalTime.textContent = time.textContent + " minutes";

	/* Show congrats modal */
	setTimeout(function() {
		congratsPopup.style.display = 'block';
	}, 2000);
}

/* Increment timer on a 1 second interval */
let endTime, elapsedTime

function add_second() {
	endTime = new Date();
	elapsedTime = (endTime - startTime);
	time.textContent = format_time(elapsedTime);
}

/* Format minutes/seconds into mm:ss format */
let minutes, seconds;

function format_time(elapsedTime) {
	minutes = new Date(elapsedTime).getUTCMinutes();
	seconds = new Date(elapsedTime).getUTCSeconds();
	return add_zero(minutes)+":"+add_zero(seconds);
}

/* Format numbers less than 10 with leading zero */
function add_zero(number) {
	if(number < 10){
		number = "0"+number;
	}
	return number;
}

new_game();


