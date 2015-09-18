// Global variables:
// Variables to store timers/intervals
var checking;
var animate;
var userStatements = [];
var userReasons = [];
var Alert = new CustomAlert();
var revertIndex = -1;

// Variables that help with dragging and prevent stacking.
var jqParent; var OGTop; var OGLeft;
var dragIndex = 0;

// Time variables for timers/intervals
var timePerCheck = 1500;
var timePerAnimate = 200;
// End Global variables.

// Function loads text and image items based on the proof #.
function initialize(proofIndex) {
	var div = document.createElement('div');
	div.innerHTML = "<!--[if lt IE 9]><i></i><![endif]-->";
	var isIeLessThan9 = (div.getElementsByTagName("i").length == 1);
	if (isIeLessThan9) {
		alert("Please update your browser and graduate to the 21st century.");
		return -1;
	}
	// Shuffle statements and reasons.
	statements[proofIndex].sort( function () { return Math.random() - .5 });
	reasons[proofIndex].sort( function() { return Math.random() - .5 });
	
	// Load header texts and display them.
	var proofHeader = document.getElementById("proofText");
	var givenHeader = document.getElementById("givenText");
	proofHeader.innerHTML = proofTexts[proofIndex];
	if (proofIndex == 0) {
		var titles = document.getElementById('titles');
		titles.src = '../proofFiles/images/justProve.png';
	} else {
		givenHeader.innerHTML = givenTexts[proofIndex];
	}
	var statementLimit = statements[proofIndex].length;
	var reasonLimit = reasons[proofIndex].length;
	var maxLimit = Math.max(statementLimit, reasonLimit);
	
	// Draws a grid based on the number of reasons/statements in the proof.
	var wrapper = document.createElement("div");
	wrapper.style.position = "absolute";
	wrapper.style.top = "198px";
	wrapper.style.left = "8px";
	wrapper.style.width = "750px";
	wrapper.style.height = (maxLimit * 38) + "px";
	wrapper.id = "dropContainer";
	document.getElementById('contain').appendChild(wrapper);
	
	// Create tile containers.
	for (var i = 0; i < maxLimit; i++) {
		var ypos =  38 * i;
		
		// Statements Column.
		var id = "statement" + i;
		var div = document.createElement("div");
		div.style.position = "absolute";
		div.style.width = "155px";
		div.style.height = "38px";
		div.style.top = ypos + "px";
		div.style.left = "0px";
		div.style.border = "1px solid black";
		div.style.background = "#a0be64";
		div.id = id;
		div.className = "receiveStatements";
		wrapper.appendChild(div);
		
		// Reasons column.
		id = "reason" + i;
		div = document.createElement("div");
		div.style.position = "absolute";
		div.style.width = "198px";
		div.style.height = "38px";
		div.style.top = (ypos) + "px";
		div.style.left = "157px";
		div.style.border = "1px solid black";
		div.style.background = "#a0be64";
		div.id = id;
		div.className = "receiveReasons";
		wrapper.appendChild(div);
		
		// Tile Columns
		div = document.createElement("div");
		div.style.position = "absolute";
		div.style.width = "155px";
		div.style.height = "38px";
		div.style.top = ypos + "px";
		div.style.left = "357px";
		div.style.border = "1px solid black";
		div.style.background = "#f0b964";
		//div.style.padding = "1px 1px 1px 1px";
		div.className = "originStatements";
		wrapper.appendChild(div);
		
		div = document.createElement("div");
		div.style.position = "absolute";
		div.style.width = "201px";
		div.style.height = "38px";
		div.style.top = ypos + "px";
		div.style.left = "514px";
		div.style.border = "1px solid black";
		div.style.background = "#f0b964";
		//div.style.padding = "1px 1px 1px 1px";
		div.className = "originReasons";
		wrapper.appendChild(div);
	}
	
	// Create tiles.
	for (var i = 0; i < maxLimit; i++) {
		var ypos = (198 + 38 * i);
		var tile;
		var text;
		ypos++;
		
		// Adds another tile and its text if there's another statement.
		if ((statements[proofIndex].length - 1) >= i) {
			tile = document.createElement("div");
			tile.style.width = "155px";
			tile.style.position = "fixed";
			tile.style.top = ypos + "px";
			tile.style.left = "366px";
			tile.style.backgroundImage = "url('../proofFiles/images/statementBox.png')";
			tile.style.fontSize = "14px";
			tile.innerHTML = statements[proofIndex][i];
			if (bowser.name == "Firefox") {
				tile.style.paddingTop = "2px";
				tile.style.height = "35px";
			} else {
				tile.style.paddingTop = "5px";
				tile.style.height = "32px";
			}
			tile.style.textAlign = "center";
			tile.id = "statementT" + i;
			tile.data = i;
			var parClass = 'originStatements';
			tile.className = "statementTiles";
			document.getElementsByClassName(parClass)[i].appendChild(tile);
			$('#' + tile.id).data('num', i);
		}
		if ((reasons[proofIndex].length - 1) >= i) {
			tile = document.createElement("div");
			tile.style.height = "32px";
			tile.style.width = "199px";
			tile.style.position = "fixed";
			tile.style.top = ypos + "px";
			tile.style.left = "524px";
			tile.style.backgroundImage = "url('../proofFiles/images/reasonBox.png')";
			tile.innerHTML = reasons[proofIndex][i];
			if (bowser.name == "Firefox") {
				tile.style.paddingTop = "2px";
				tile.style.height = "35px";
			} else {
				tile.style.paddingTop = "5px";
				tile.style.height = "32px";
			}
			tile.style.textAlign = "center";
			tile.style.fontSize = "14px";
			tile.id = "reasonT" + i;
			tile.className = "reasonTiles";
			var parClass = 'originReasons';
			document.getElementsByClassName(parClass)[i].appendChild(tile);
			$('#' + tile.id).data('num', i);
		}
		// Yellow boxes
		var div = document.createElement("div");
		div.style.position = "absolute";
		div.style.width = "355px";
		div.style.height = "38px";
		div.style.top = ypos + 'px';
		div.style.left = "9px";
		div.style.visibility = "hidden";
		div.style.background = "linear-gradient(rgba(255, 255, 51, 0.3), rgba(255, 255, 51, 0.3))";
		div.className = "yellowBox";
		document.getElementById('contain').appendChild(div);
		ypos--;
	}
	
	// Drag abilities initialized here.
	$(".statementTiles").draggable({
		containment: '#dropContainer',
		cursor: 'pointer', 
		start: handleStart
	});
	$(".reasonTiles").draggable({
		containment: '#dropContainer',
		cursor: 'pointer',
		start: handleStart
	});
	
	// Drop abilities initialized here.
	// Containers for answers.
	$(".receiveStatements").droppable({
		accept: '.statementTiles',
		hoverClass: 'hovered',
		drop: handleDrop
	});
	$(".receiveReasons").droppable({
		accept:'.reasonTiles',
		hoverClass: 'hovered',
		drop: handleDrop
	});
	// Containers for tiles.
	$(".originStatements").droppable({
		accept:'.statementTiles',
		hoverClass: 'hovered',
		drop: handleDrop
	});
	$(".originReasons").droppable({
		accept:'.reasonTiles',
		hoverClass: 'hovered',
		drop: handleDrop
	});
	
	// Tick and X images initialized here.
	var tick;
	var tickTop = 200; 
	for (var i = 0; i < maxLimit; i++) {
		tick = document.createElement("img");
		tick.src = "../proofFiles/images/tick.png";
		tick.style.position = "absolute";
		tick.style.top = (tickTop + i * 38) + 'px';
		tick.style.left = "320px";
		tick.className = "grade";
		tick.style.visibility = 'hidden';
		document.getElementById('contain').appendChild(tick);
	}
	var topPx = parseInt(document.getElementById('dropContainer').style.top.split('px')[0]);
	topPx += parseInt(document.getElementById('dropContainer').style.height.split('px')[0]);
	$("#check").css('top', topPx + 1 + 'px');
	$("#reset").css('top', topPx + 1 + 'px');
	if (proofIndex == 1) {
		$('#diagram').css('top', 10 + 'px');
	} else if (proofIndex == 2) {
		$('#diagram').css('top', 50 + 'px');
	}
}

// Handles the drop of a draggable object when placed in a drop container.
function handleDrop(e, ui) {
	ui.draggable.css('zIndex', '0');
	if (e.target.children.length == 0) {
		ui.draggable.position({ of: $(this), my: 'left top', at: 'left top' });
		ui.draggable.draggable('option', 'revert', false);
		ui.draggable.appendTo(e.target);
		ui.draggable.css('left', ui.draggable.offset().left + 1 + 'px');
		ui.draggable.css('top', ui.draggable.offset().top + 1 + 'px');
	}
}

// Draggable helper functions:
// Handles the start of dragging.
function handleStart(e, ui) {
	jqParent = ui.helper.parent();
	ui.helper.appendTo('#dropContainer');
	revertIndex = ui.helper.data('num');
	// Define the revert function for each tile.
	// Set variables/initial zIndex.
	ui.helper.css('zIndex', dragIndex + 1);
	OGLeft = 9 + parseInt(jqParent.get(0).style.left.split('px')[0], 10);
	OGTop = 199 + parseInt(jqParent.get(0).style.top.split('px'), 10);
	var id = ui.helper.get(0).id;
	var classy = ui.helper.get(0).className.split(' ')[0];
	/* The revert function uses z-indices to prevent stacking. It increments
	   a running z-index counter every time an item is reverted, such that it
	   does not appear to be dragged/reverted underneath any other elements. 
	   If you have a better solution to this problem, please feel free to 
	   rewrite the revert function */
	ui.helper.draggable('option', 'revert', function(e, ui) {
		document.getElementById(id).style.zIndex = dragIndex + 1;
		dragIndex++;
		var $draggable = $(this);
		$draggable.animate({top: OGTop, left: OGLeft}, 'normal');
		jqParent.get(0).appendChild(document.getElementById(id));
		return false;
	});
}

// Check button event handlers
var checkButton = document.getElementById("check");

// Sets to depressed image.
checkButton.onmouseover = function() {
	checkButton.src = "../proofFiles/images/checkclick.png";
}

// Sets to regular image.
checkButton.onmouseout = function() {
	checkButton.src = "../proofFiles/images/checkreg.png";
}

// Reset button event handlers
var resetButton = document.getElementById("reset");

// Sets to depressed image.
resetButton.onmouseover = function() {
	resetButton.src = "../proofFiles/images/reset2.png";
}

// Sets to regular image.
resetButton.onmouseout = function() {
	resetButton.src = "../proofFiles/images/reset1.png";
}

// Performs a check of the user's answers.
function validate(proofIndex) {
	// Clear the interval incase someone presses the button while the validation is still going.
	clearInterval(checking);

	// Reset the user input.
	userStatements = [];
	userReasons = [];

	// Reset z-indices of tiles.
	$('.statementTiles').css('zIndex', 0);
	$('.reasonTiles').css('zIndex', 0);

	// Clear images
	$('.grade').css('visibility', 'hidden');
	$('.grade').attr('src', '../proofFiles/images/tick.png');

	// Get the amount of statements and reasons the user has submitted.
	var statementContainers = document.getElementsByClassName('receiveStatements');
	var reasonContainers = document.getElementsByClassName('receiveReasons');
	var statementCount = 0;
	var reasonCount = 0;
	for (var i = 0; i < statementContainers.length; i++) {
		statementCount += statementContainers[i].children.length;
		reasonCount += reasonContainers[i].children.length;
	}
	
	// Check for zero statements and reasons.
	if (statementCount == 0 && reasonCount == 0) {
		Alert.render("You have zero statements and reasons!");
	// Check for different amounts of statements and reasons.
	} else if (statementCount != reasonCount) {
		Alert.render("The number of statements must match the number of reasons.");
	} else {
		if (contains(userStatements, answerStatements[proofIndex].answer)) {
			clearInterval(checking);
			userStatments = [];
			userReasons = [];
			Alert.render("Your proof is correct!");
			return 1;
		} else if (statementCount <= 0) {
			clearInterval(checking);
			userStatements = [];
			userReasons = [];
			Alert.render("Your proof is incomplete!");
			return -1;
		}
		if (statementContainers[0].children[0] != undefined && reasonContainers[0].children[0] != undefined) {
			userStatements.push(statementContainers[0].children[0].innerHTML);
			userReasons.push(reasonContainers[0].children[0].innerHTML);
			var result = checker(proofIndex, 0);
			if (result == -1) {
				displayMarks(-1, 0);
				clearInterval(checking);
				return -1;
			} else if (result) {
				displayMarks(true, 0);
			} else {
				displayMarks(false, 0);
				clearInterval(checking);
				return -1;
			}
		} else {
			Alert.render("Place your tiles in order with no gaps please.");
			clearInterval(checking);
			return -1;
		}
		var i = 1;
		// Create interval to give time for animations.
		checking = setInterval(function() {
			// Check if we're done.
			if (contains(userStatements, answerStatements[proofIndex].answer)) {
				clearInterval(checking);
				userStatements = [];
				userReasons = [];
				Alert.render("Your proof is correct!");
				return 1;
			} else if (statementCount <= i) {
				clearInterval(checking);
				userStatements = [];
				userReasons = [];
				Alert.render("Your proof is incomplete!");
				return -1;
			}
			if (statementContainers[i].children[0] != undefined && reasonContainers[i].children[0] != undefined) {
				userStatements.push(statementContainers[i].children[0].innerHTML);
				userReasons.push(reasonContainers[i].children[0].innerHTML);
				var result = checker(proofIndex, i);
				if (result == -1) {
					displayMarks(-1, i);
					clearInterval(checking);
					return -1;
				} else if (result) {
					displayMarks(true, i);
				} else {
					displayMarks(false, i);
					clearInterval(checking);
					return -1;
				}
			} else {
				Alert.render("Place your tiles in order with no gaps please.");
				clearInterval(checking);
				return -1;
			}
			i++;
		}, timePerCheck);
	}
	
}

// Displays either a check or an X depending on the user's answer.
function displayMarks(isCorrect, index) {
	var box = document.getElementsByClassName('yellowBox')[index];
	var i = 0;
	animate = setInterval(function() {
		if (i == 6) {
			clearInterval(animate);
			var gradeImage = document.getElementsByClassName('grade')[index];
			if (isCorrect == -1) {
				gradeImage.src = "../proofFiles/images/wrong.png";
				Alert.render("At least one step is missing a prior necessary step.");
			} else if (!isCorrect) {
				gradeImage.src = "../proofFiles/images/wrong.png";
				Alert.render("At least one statement and reason are not related.");
			}
			gradeImage.style.visibility = 'visible';
			return 1;
		}
		if (i % 2 == 0) {
			box.style.visibility = "visible";
		} else {
			box.style.visibility = "hidden";
		}
		i++;
	}, timePerAnimate);
}

// Determines whether the user has completed the proof or not.
// Returns a boolean indicating whether the proof has been completed.
function checkForReady(proofIndex) {
	var stateKey = answerStatements[proofIndex];
	for (var i = 0; i < stateKey.mandatoryLead.length; i++) {
		if (!contains(userStatements, stateKey.mandatoryLead[i])) {
			return false;
		}
	}
	for (var i = 0; i < stateKey.mandatoryFollow.length; i++) {
		if (!contains(userStatements, stateKey.mandatoryFollow[i])) {
			return false;
		}
	}
	return true;
}

// Resets the proof to its initial state.
function resetProof(proofIndex) {
	// Get necessary lengths.
	var statementLimit = statements[proofIndex].length;
	var reasonLimit = reasons[proofIndex].length;
	var maxLimit = Math.max(statementLimit, reasonLimit);
	
	// Clear intervals.
	clearInterval(checking);
	clearInterval(animate);

	// Reset revert global variables
	OGLeft = 0;
	OGTop = 0;
	revertIndex = -1;
	jqParent = null;
	dragIndex = 0;
	
	// Reset z-indices of all tiles.
	$('.statementTiles').css('zIndex', 0);
	$('.reasonTiles').css('zIndex', 0);
	
	// Clear images associated with intervals.
	$('.grade').css('visibility', 'hidden');
	$('.grade').attr('src', '../proofFiles/images/tick.png');
	$('.yellowBox').css('visibility', 'hidden');
	
	// Reposition tiles and reappend them to their corresponding parents.
	for (var i = 0; i < maxLimit; i++) {
		var tile;
		var ypos = 199 + 38 * i;
		// Adds another tile and its text if there's another statement.
		if ((statements[proofIndex].length - 1) >= i) {
			tile = document.getElementById("statementT" + i);
			var tileParent = document.getElementsByClassName('originStatements')[i];
			tileParent.appendChild(tile);
			tile.style.left = '366px';
			tile.style.top = ypos + 'px';
		}
		// Adds another tile and its text if there's another reason.
		if ((reasons[proofIndex].length - 1) >= i) {
			tile = document.getElementById("reasonT" + i);
			var tileParent = document.getElementsByClassName('originReasons')[i];
			tileParent.appendChild(tile);
			tile.style.left = '524px';
			tile.style.top = ypos + 'px';
		}
	}
}

// helper function that checks if the element is contained in the array passed.
// Returns whether the given element is inside the given array.
function contains(array, element) {
	for (var i = 0; i < array.length; i++) {
		if (array[i] === element) {
			return true;
		}
	}
	return false;
}

// Create a custom alert that displays the passed message.
function CustomAlert() {
	this.render = function(dialog) {
		var winW = window.innerWidth;
		var winH = window.innerHeight;
		var dialogOverlay = document.getElementById('dialogoverlay');
		var dialogBox = document.getElementById('dialogbox');
		dialogOverlay.style.display = 'block';
		dialogOverlay.style.height = winH + 'px';
		dialogBox.style.left = (winW / 2) - (550 * .5) + 10 + 'px';
		dialogBox.style.top = '273px';
		dialogBox.style.height = '120px';
		dialogBox.style.display = 'block';
		document.getElementById('dialogboxhead').innerHTML = '<strong>' + dialog + '</strong>';
		document.getElementById('dialogboxfoot').innerHTML = '<img src="../proofFiles/images/ok.png" onclick="Alert.ok()"></img>';
	}
	this.ok = function() {
		document.getElementById('dialogbox').style.display = "none";
		document.getElementById('dialogoverlay').style.display = "none";
		$('.grade').css('visibility', 'hidden');
	}
}

// Checks the statement/reason pair given the proof and the index.
// Returns whether the answer was correct.
function checker(proofIndex, index) {
	var statement = userStatements[index];
	var reason = userReasons[index];
	var stateKey = answerStatements[proofIndex];
	var reasonKey = answerReasons[proofIndex];
	var numOfOptions = stateKey.optional.length;
	// Check if the statement/reason is in the answer key.
	if (!contains(stateKey.optional, statement) && !contains(stateKey.mandatoryLead, statement) && !contains(stateKey.mandatoryFollow, statement) && statement != stateKey.answer) {
		return false;
	} else if (!contains(reasonKey.optional, reason) && !contains(reasonKey.mandatoryLead, reason) && !contains(reasonKey.mandatoryFollow, reason) && reason != reasonKey.answer) {
		return false;
	} else if (contains(stateKey.optional, statement)) {
		if (!contains(reasonKey.optional, reason)) {
			return false;
		} else {
			var temp = stateKey.optional.indexOf(statement); 
			return reason == reasonKey.optional[temp];
		}
	} else if (contains(stateKey.mandatoryFollow, statement)) {
		if (!contains(reasonKey.mandatoryFollow, reason)) {
			return false;
		} else {
			var temp = stateKey.mandatoryFollow.lastIndexOf(statement);
			if (reason != reasonKey.mandatoryFollow[temp]) {
				return false;
			} else if (temp == stateKey.mandatoryLead.length) {
				for (var i = 0; i < temp; i++) {
					if (!contains(userStatements, stateKey.mandatoryLead[i])) {
						return -1;
					}
					if (!contains(userReasons, reasonKey.mandatoryLead[i])) {
						return -1;
					}
				}
				return reason == reasonKey.mandatoryFollow[temp];
			} else if (!contains(userStatements, stateKey.mandatoryLead[temp])) {
				return -1;
			} else if (!contains(userReasons, reasonKey.mandatoryLead[temp])) {
				return -1;
			} else {
				return true;
			}
		}
	} else if (contains(stateKey.mandatoryLead, statement)) {
		if(!contains(reasonKey.mandatoryLead, reason)) {
			return false;
		} else {
			var temp = stateKey.mandatoryLead.lastIndexOf(statement);
			return reason == reasonKey.mandatoryLead[temp];
		};
	} else if (statement == stateKey.answer) {
		if (reason != reasonKey.answer) {
			return false;
		} else if (!(checkForReady(proofIndex))) {
			return -1;
		} else {
			return true;
		}
	} else {
		return false;
	}
}