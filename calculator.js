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
	txt.placeholder = "DD/MM/YYYY";

	calculatorDiv.appendChild(label);
	calculatorDiv.appendChild(txt);
	calculatorDiv.appendChild(submit);

	// get button id and run function when clicked
	const button = document.getElementById("submit");
	button.onclick = buttonClick;
}

function buttonClick() {
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
	newparsedInput = moment(input, "DD/MM/YYYY");
	let dateValid = newparsedInput.isValid();

	// removes the slashes
	input = input.replace(/[^0-9\.]+/g, "");
	// checks if the user input is an integer and displays the user input in a div, otherwise pop an alert
	if (dateValid != true) {
		displayDate("Not a valid date");
	} else {
		splitInput = noSlashInput.split(" ", 3);
		makeDateDisplay(calculator);
		calculate(splitInput, oldInput);
	}
}

function calculate(date, yearInput) {
	let year = parseInt(date[2]);
	let month = date[1];
	let day = date[0];
	console.log(month);
	calculateYear(year);
	calculateDate(month, day, calculateYear(year), yearInput);
}

function calculateYear(year) {
	// calculate the doomsday for the specific century
	const centPat = [2, 0, 5, 3];
	let century = Math.floor(year / 100);
	let division = Math.floor(century / 4);
	division = division * 4;
	let subtract = century - division;
	let doomsday = centPat[subtract];

	// check the total leap years
	let leap = 0;
	let difference = year - century * 100;
	if (difference >= 4) {
		leap = difference / 4;
		leap = Math.floor(leap);
	}

	let seven = 7;

	// calculate the doomsday for the filled year
	let sum = difference + leap + doomsday;
	let totalSeven = sum / 7;
	totalSeven = Math.floor(totalSeven);
	seven = seven * totalSeven;
	sum = sum - seven;

	// check if the filled year was a leap year or not
	let yearInString = year.toString();
	yearInString = yearInString.split("");
	yearInString.splice(0, 2);
	yearInString = yearInString.join("");
	let lastTwoChar = parseInt(yearInString);
	let checkLeap = lastTwoChar / 4;
	let isLeapYear = false;
	if (checkLeap % 1 === 0) {
		isLeapYear = true;
	} else {
		isLeapYear = false;
	}
	return [sum, isLeapYear];
}

function calculateDate(month, day, yearLeap, yearInput) {
	// save the pi days in an array
	const days = [3, 28, 14, 4, 9, 6, 11, 8, 5, 10, 7, 12];

	// save the doomsday in 'year' and if the leap year is true or false in 'leap
	let leap = yearLeap[1];
	let year = yearLeap[0];
	// if there is a leap year, change 2 pi days
	if (leap == true) {
		days[0] = 4;
		days[1] = 29;
	}

	// calculates the result
	let difference = day - days[month - 1];
	console.log(
		"difference in between the day and the checkpoint is " + difference
	);
	let sum = year + difference;
	console.log("sum is " + sum);
	if (sum < 0) {
		console.log("the sum was a negative number : " + sum);
		sum = Math.abs(sum);
		console.log(
			"the negative number has been turn into a positive number:" + sum
		);
		console.log(sum + " - 7 = ");
		sum = 7 - sum;
		console.log(sum);
	}
	if (sum > 7) {
		let division = sum / 7;
		division = Math.floor(division);
		division = division * 7;
		sum = sum - division;
	}
	console.log(sum);
	displayResult(displayDay(sum), yearInput);
}

function displayDay(result) {
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

function displayResult(day, yearInput) {
	const div = document.getElementById("dateDisplay");
	div.innerHTML = yearInput + " is a " + day;
}
