makeContainer();

// create container
function makeContainer() {
	let div = document.createElement("div");
	div.id = "container";
	document.body.appendChild(div);

	// get container id and create div in container
	const calcContainer = document.getElementById("container");
	makeDiv(calcContainer);
}

// create div in container
function makeDiv(containerDiv) {
	let div = document.createElement("div");
	div.id = "calculator";
	div.innerHTML = "Doomsday Calculator" + "<br>";
	div.className = "calculator";
	containerDiv.appendChild(div);
	// get div id and create small form in div
	const calculator = document.getElementById("calculator");
	makeLabelInputSubmit(calculator);
}

// create a small form
function makeLabelInputSubmit(calculatorDiv) {
	let txt = document.createElement("input");
	let label = document.createElement("label");
	let submit = document.createElement("button");

	// create label
	label.innerHTML = "Write a date" + "<br>";
	label.setAttribute("for", "date");

	// create submit button
	submit.type = "submit";
	submit.id = "submit";
	submit.innerHTML = "submit";

	// create text input
	txt.id = "userInput";

	calculatorDiv.appendChild(label);
	calculatorDiv.appendChild(txt);
	calculatorDiv.appendChild(submit);

	// get button id and run function when clicked
	const button = document.getElementById("submit");
	button.onclick = buttonClick;
}

function buttonClick() {
	const calculator = document.getElementById("calculator");
	let date = document.querySelector("input").value;
	validateInput(date);
}

function makeDateDisplay(calculator) {
	let div = document.createElement("div");
	div.id = "dateDisplay";
	calculator.appendChild(div);
}

function displayDate(date) {
	const display = document.getElementById("dateDisplay");
	display.innerHTML = date;
}

function validateInput(input) {
	// saves the userinput in a variable
	let oldInput = input;
	// removes all the slashes and replaces it with a space and saves it to a variable
	let noSlashInput = input.replace(/[^0-9\.]+/g, " ");

	// converts the user input into milliseconds to see if the input is a valid date
	parsedInput = Date.parse(input);
	console.log("date parsed is " + parsedInput);

	// removes the slashes
	input = input.replace(/[^0-9\.]+/g, "");
	// checks if the user input is an integer and displays the user input in a div, otherwise pop an alert
	if (isNaN(parsedInput)) {
		console.log("false");
		displayDate("Not a valid date");
	} else {
		console.log("true");
		splitInput = noSlashInput.split(" ", 3);
		makeDateDisplay(calculator);
		displayDate(oldInput);
		calculate(splitInput);
	}
}

function calculate(date) {
	let year = parseInt(date[2]);
	let month = date[0];
	let day = date[1];
	calculateYear(year);
	calculateMonthDay(month, day, calculateYear(year));
}

function calculateYear(year) {
	// calculate the doomsday for the specific century
	const centPat = [2, 0, 5, 3];
	let century = Math.floor(year / 100);
	let division = Math.floor(century / 4);
	division = division * 4;
	let subtract = century - division;
	let doomsday = centPat[subtract];

	let leap = 0;
	let difference = year - century * 100;
	if (difference >= 4) {
		leap = difference / 4;
		leap = Math.floor(leap);
	}

	let sum = difference + leap + doomsday;
	let seven = 7;
	let totalSeven = sum / 7;
	totalSeven = Math.floor(totalSeven);
	seven = seven * totalSeven;
	sum = sum - seven;

	let yearInString = year.toString();
	yearInString = yearInString.split("");
	yearInString.splice(0, 2);
	yearInString = yearInString.join("");
	console.log(yearInString);
	let lastTwoChar = parseInt(yearInString);
	let checkLeap = lastTwoChar / 4;
	console.log("year divided by 4 = " + checkLeap);
	let isLeapYear = false;
	if (checkLeap % 1 === 0) {
		console.log("there are no fractions");
		isLeapYear = true;
	} else {
		isLeapYear = false;
		console.log("there are fractions");
	}
	return [sum, isLeapYear];
}

function calculateMonthDay(month, day, yearLeap) {
	const days = [3, 28, 14, 4, 9, 6, 11, 8, 5, 10, 7, 12];
	let leap = yearLeap[1];
	console.log(leap);
	let year = yearLeap[0];
	if (leap == true) {
		days[0] = 4;
		days[1] = 29;
	}
	let difference = day - days[month - 1];
	console.log(difference);
	console.log("doomsday for " + year + " = " + year);
	let sum = year + difference;
	console.log(sum);
	if (sum < 0) {
		sum = Math.abs(sum);
		console.log(sum);
		sum = 7 - sum;
	}
	if (sum > 7) {
		let division = sum / 7;
		division = Math.floor(division);
		division = division * 7;
		console.log(division);
		sum = sum - division;
	}

	displayResult(displayDay(sum));
}

function displayDay(result) {
	const div = document.getElementById("dateDisplay");
	let dayResult;
	if (result < 0) {
		dayResult = "negative";
		console.log("result = negative");
	}
	if (result == 0 || result == 7) {
		dayResult = "sunday";
	}
	if (result == 1) {
		dayResult = "monday";
	}
	if (result == 2) {
		dayResult = "tuesday";
	}
	if (result == 3) {
		dayResult = "wednesday";
	}
	if (result == 4) {
		dayResult = "thursday";
	}
	if (result == 5) {
		dayResult = "friday";
	}
	if (result == 6) {
		dayResult = "saturday";
	}

	return dayResult;
}

function displayResult(day) {
	const div = document.getElementById("dateDisplay");
	div.innerHTML = day;
}
