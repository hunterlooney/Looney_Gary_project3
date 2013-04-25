//Gary W. Hunter Looney
//Project 3
//Add Character Java
//Term 1304

var cname = document.getElementById("cname");
var sex = document.getElementById("sex");
var birthdate = document.getElementById("birthdate");
var race = document.getElementById("race");
var height = document.getElementById("height");
var submitButton = document.getElementById("submitButton");
var clearButton = document.getElementById("clearButton");
var glasses = document.getElementById("glasses");
var glassesValue = function () {
	if(glasses.checked) {
		glassesValue = "Yes";
	} else { 
		glassesValue = "No";
	}
};
var saveData = function (key) {
	if (!key){
		var id = Math.floor(Math.random()*10000001);
	} else { 
		id = key;
	}

	var item = {};
		item.name = ["Name: ", cname.value];
		item.glasses = ["Glasses: ", glassesValue.value];
		item.sex = ["Sex: ", sex.value];
		item.birthdate = ["Birthdate: ", birthdate.value];
		item.race = ["Race: ", race.value];
		item.height = ["Height: ", height.value];
	localStorage.setItem(id, JSON.stringify(item));
	alert("Character Added!");
};
var clearData = function () {
	localStorage.clear();
	alert("Data Cleared!");

};
var getTheData = function () {
	var makeDivision = document.createElement('div');
		makeDivision.setAttribute("id", "items");
	
	var links = document.createElement('li');

	var makeTheList = document.createElement('ul');
		makeDivision.appendChild(makeTheList);
		document.body.appendChild(makeDivision);
	for ( var i = 0, len = localStorage.length; i < len; i++) {
		var makeli = document.createElement('li');
			makeTheList.appendChild(makeli);
		
		var key = localStorage.key(i);
		var value = localStorage.getItem(key);
		
		var obj = JSON.parse(value);
		var makeSecondList = document.createElement('ul');
			makeli.appendChild(makeSecondList);
		for (var n in obj) {
			var makeSecondli = document.createElement('li');
				makeSecondList.appendChild(makeSecondli);
			var optSecondText = obj[n][0] + " "	+ obj[n][1];
				makeSecondli.innerHTML = optSecondText;
				makeSecondList.appendChild(links);
		}
		
		makeLinksButtons (localStorage.key(i), links);
	}
};

function makeLinksButtons (key, links) {
	var editTheLink = document.createElement('a');
	editTheLink.href = "#";
	editTheLink.key = key;
	var editTheLinkText = "Edit Character";
	editTheLink.addEventListener("click", editTheItem);
	editTheLink.innerHTML = editTheLinkText;
	links.appendChild(editTheLink);
	
	var breakBetween = document.createElement('br');
	links.appendChild(breakBetween);
	
	var deleteTheLink = document.createElement('a');
	deleteTheLink.href = "#";
	deleteTheLink.key = key;
	var deleteTheLinkText = "Delete Character";
	deleteTheLink.addEventListener("click", deleteTheItem);
	deleteTheLink.innerHTML = deleteTheLinkText;
	links.appendChild(deleteTheLink);
	
}

function deleteTheItem () {
	var askQuestion = confirm("Are you sure you want to delete this character?");
	if(askQuestion) {
		localStorage.removeItem(this.key);
		window.location.reload();
	} else {
		alert("Character was NOT deleted.")
	}
}

function editTheItem () {
	var value = localStorage.getItem(this.key);
	var item = JSON.parse(value);
	
	('cname').value = item.cname[1];
	('birthdate').value = item.birthdate[1];
	('race').value = item.race[1];
	('height').value = item.height[1];
	var radios = document.forms[0].sex;
	for(var i = 0; i<radios.length; i++) {
		if (radios[i].value == "Male" && item.sex[1] == "Male") {
			radios[i].setAttribute("checked", "checked");
		} else if (radios[i].value == "Female" && item.sex[1] == "Female") {
			radios[i].setAttribute("checked", "checked");
		}
	}
	if (item.glasses[1] == "Yes") {
		('glasses').setAttribute("checked", "checked");
	}
	
	save.removeEventListener("click", saveData);
	
	('submitButton').value = "Edit Contact";
	var editTheSubmit = ('submit');
	editTheSubmit.addEventListener("click", validate);
	editTheSubmit.key = this.key;
	
}


function validate (event) {
	var getTHEcname = ('cname');

	var messageArray = [];

	if(getTHEcname.value === ""){
		var cnameError = "Please enter a character name.";
		getTHEcname.style.border = "1px solide red";
		messageArray.push(cnameError);
	}
	
	if(messageArray.length >= 1) {
		for (var i = 0, j = messageArray.length; i< j; i++){
			var errorText = document.createElement('li');
			errorText.innerHTML = messageArray[i];
			errorMessage.appendChild(errorText);
			 
		}
		event.preventDefault();
		return false;	
	} else {
		saveData (this.key);
	}
}

var displayButton = document.getElementById('displayButton');
var errorMessage = ('error');


clearButton.addEventListener("click", clearData);
displayButton.addEventListener("click", getTheData);
submitButton.addEventListener("click", validate);