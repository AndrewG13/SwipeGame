// player points
let points;
let points_element;
let bonus;
let timer = 0;
let timer_element;
let button_element = document.getElementById("game-button");
// quanity of squares
let base;
let startingBase;
// visual playfield/box
playfield = document.getElementById("playfield");

// set default theme (Red Green theme)
let theme_correct = "#00e600";
let theme_wrong = "#cc0000";

// set default mode (colorblind off)
let colorblind = false;

gameOver();
//init();

/*
** StartClock Function
**
** Starts the game clock that counts down from $timer to 0.
** When $timer hits 0 it will initiate a game over.
*/
function startClock() {
	let clock = setInterval( function() {
		if (timer === 0) {
			clearInterval(clock);
			timer_element.innerHTML = "Finished";
			gameOver();
		} else {
			timer--;
			updateTimer();
		}
	}, 1000);
}

/*
** CorrectClicked Function
**
** description
*/
function correctClicked() {
	// increment points & bonus
	points++;
	bonus++;
	
	// activate reward if bonus is ready
	if (bonus === 5) {
		// activate reward
		timer += 2;
		updateTimer();
		bonus = 0;
	}
	
	
	// update score graphic
	updateScore();
	
	// get current correct square & switch it to wrong
	let currentCorrect = document.getElementsByClassName("swipe-square-correct")[0];
	currentCorrect.classList.remove = "swipe-square-correct";
	currentCorrect.className = "swipe-square-wrong";
	currentCorrect.removeAttribute("onclick");
	currentCorrect.style.textDecoration = "none";
	
	// add new square
	playfield.appendChild(createSquare());
	
	// initialize a new correct square
	setNewCorrect();
	
	// update theme
	setTheme(theme_correct, theme_wrong);
}

/*
** CreateSquare Function 
**
** Creates a new Square element
** @return newSquare
*/
function createSquare() {
	let newSquare = document.createElement('div');
	newSquare.className = "swipe-square-wrong";
	// increment base quantity
	base++;
	newSquare.innerHTML = base;
	return newSquare;
}

/*
** SetNewCorrect Function
**
** Randomly sets a new square to be green
*/
function setNewCorrect() {
	// set new correct square
	let newIndex = Math.floor(Math.random() * base);
	playfield.children[newIndex].classList.remove = "swipe-square-wrong";
	playfield.children[newIndex].className = "swipe-square-correct";
	playfield.children[newIndex].setAttribute("onclick", "correctClicked()");
	
	// colorblind mode accommodation
	if (colorblind) {
		playfield.children[newIndex].style.textDecoration = "underline";
	}
}

/*
** UpdateScore Function
**
** Updates the player's score
*/
function updateScore() {
	points_element.innerHTML = points;
}

/*
** UpdateTimer Function
**
** Updates the clock timer
*/
function updateTimer() {
	timer_element.innerHTML = timer;
}

function updateTimeRange() {
	document.getElementById("time-range").innerHTML = document.getElementById("settings-timer").value;
}

/*
** GameOver Function
**
** 
*/
function gameOver() {
	playfield.className = "container-game container-game-disabled";
	playfield.replaceChildren();
	playfield.innerHTML = "X";
	button_element.innerHTML = "Start Game";
	button_element.style.background = "#339e3a";
}

/*
** Themes Setter
*/
function setTheme(correct, wrong) {
	// get all elements of class and modify their colors
	var allCorrect = document.querySelectorAll('.swipe-square-correct');
  allCorrect[0].style.background = correct;
	
	var allWrong = document.querySelectorAll('.swipe-square-wrong');
	for (var i = 0; i < allWrong.length; i++) {
    allWrong[i].style.background = wrong;
	}
}

function userSelectedTheme() {
	var theme_selected = document.getElementById("settings-theme").value;
	if (theme_selected === "RG") {
		RedGreenTheme();
	} else if (theme_selected === "GR") {
		GoldRushTheme();
	} else if (theme_selected === "CB"){
		CoolguyBlueTheme();
	} else {
		InvisibleTheme();
	}
}

/*
** Themes
*/
function RedGreenTheme() {
	theme_correct = "#00e600";
	theme_wrong   = "#cc0000";
	setTheme(theme_correct, theme_wrong);
}
function GoldRushTheme() {
	theme_correct = "#f5d53b";
	theme_wrong   = "#9e9984";
	setTheme(theme_correct, theme_wrong);
}
function CoolguyBlueTheme() {
	theme_correct = "#27a4f1";
	theme_wrong   = "#906dff";
	setTheme(theme_correct, theme_wrong);
}
function InvisibleTheme() {
	theme_correct = "var(--body-bg)";
	theme_wrong   = "var(--body-bg)";
	setTheme(theme_correct, theme_wrong);
}

/*
** ChangeMode Function
*/
function changeMode() {
	colorblind = !colorblind;
	
	// change current correct square (needed otherwise it is skipped)
	if (colorblind) {
		document.getElementsByClassName("swipe-square-correct")[0].style.textDecoration = "underline";
	} else {
		document.getElementsByClassName("swipe-square-correct")[0].style.textDecoration = "none";
	}
}

function buttonPressed() {
	// check if game is still running
	if (timer === 0) {
		// game is done
		init();
		button_element.innerHTML = "End Game";
		button_element.style.background = "#cc0000";
	} else {
		// game is running
		timer_element.innerHTML = "Finished";
		timer = 0;
		button_element.innerHTML = "Start Game";
		button_element.style.background = "#339e3a";
	}
}

/*
** Init Function
**
** Initializes the startup process of the game
*/
function init() {
	points = 0;
	bonus = 0;
  base = 0;
  startingBase = 5; // changable starting quantity of squares
  timer = document.getElementById("settings-timer").value;
  playfield.classList.remove = "container-game-disabled";
  playfield.className = "container-game";
  playfield.innerHTML = "";
	points_element = document.getElementById("points");
	timer_element = document.getElementById("timer");
	
	for (let i = 0; i < startingBase; i++) {
			playfield.appendChild(createSquare());
	}
	
	// run startup tasks
	updateScore();
	setNewCorrect();
	startClock();
	updateTimer();
	updateTimeRange();
	setTheme(theme_correct, theme_wrong);
}
