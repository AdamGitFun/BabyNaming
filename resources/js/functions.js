function generateNameCombinations() {

  var rawFirstNameOptions = document.getElementById("inputtedFirstNames").value;
  var rawMiddleNameOptions = document.getElementById("inputtedMiddleNames").value;
  var lastName = document.getElementById("inputtedLastName").value;


  /* remove white space and commas from user input and parse into an array */
  var pattern = /\s*,\s*/;

  rawFirstNameOptions = rawFirstNameOptions.split(pattern);
  rawMiddleNameOptions = rawMiddleNameOptions.split(pattern);
  /* array parsing over */

  var namesOptions = aggregateNames(rawFirstNameOptions, rawMiddleNameOptions, lastName);
  var initialOptions = aggregateInitials(rawFirstNameOptions, rawMiddleNameOptions, lastName);

  var finalResult = combineNamesAndInitials(namesOptions, initialOptions);

  document.getElementById("resultNames").innerHTML = finalResult;
  /*document.getElementById("resultInitials").innerHTML = initialOptions;*/

}

function aggregateNames(rawfirstNames, rawmiddleNames, lastName) {

  console.log(rawfirstNames);
  console.log(rawmiddleNames);

  var namesList = [];

  for (i=0; i < rawfirstNames.length; i++) {
    for (j=0; j < rawmiddleNames.length; j++) {

      var first = rawfirstNames[i];
      var middle = rawmiddleNames[j];

      namesList.push(first + " " + middle + " " + lastName);
    }
  }

  /*return namesList.join("\r\n");*/
  return namesList;
}

function aggregateInitials(rawfirstNames, rawmiddleNames, lastName) {

  var initialsList = [];

  for (i=0; i < rawfirstNames.length; i++) {

    for (j=0; j < rawmiddleNames.length; j++) {

      var first = rawfirstNames[i];
      var middle = rawmiddleNames[j];

      var firstInitial = first[0];
      var middleInitial = middle[0];
      var lastInitial = lastName[0];

      initialsList.push(firstInitial+middleInitial+lastInitial);

    }

  }

  /*return initialsList.join("\r\n");*/
  return initialsList;

}

function combineNamesAndInitials(names, initials) {

  var namesAndInitialsResult = [];

  for (i=0; i < names.length; i++) {
    namesAndInitialsResult.push(names[i] + " (" + initials[i] + ")");
  }

  return namesAndInitialsResult.join("\r\n");
}

/*
Adam, Frank, Steve, Silvestor, Mohan, Derrick
Barney, Sebastian, Phillip, Jemal, Lennie

*/
