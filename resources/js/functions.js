function generateNameCombinations() {

  var rawFirstNameOptions = document.getElementById("inputtedFirstNames").value;
  var rawMiddleNameOptions = document.getElementById("inputtedMiddleNames").value;
  var rawLastNameOptions = document.getElementById("inputtedLastName").value;


  /* remove white space and commas from user input and parse into an array
  Also checks for a comma, return, or semicolon delimiter*/
  var pattern = /\s*[,;\t\n]\s*/;

  rawFirstNameOptions = rawFirstNameOptions.split(pattern);
  rawMiddleNameOptions = rawMiddleNameOptions.split(pattern);
  rawLastNameOptions = rawLastNameOptions.split(pattern);

  /* array parsing over */

  var namesOptions = aggregateNames(rawFirstNameOptions, rawMiddleNameOptions, rawLastNameOptions);
  var initialOptions = aggregateInitials(rawFirstNameOptions, rawMiddleNameOptions, rawLastNameOptions);

  var finalResult = combineNamesAndInitials(namesOptions, initialOptions);

  document.getElementById("resultNames").innerHTML = finalResult;
  /*document.getElementById("resultInitials").innerHTML = initialOptions;*/

}

function aggregateNames(rawfirstNames, rawmiddleNames, rawlastNames) {

  console.log(rawfirstNames);
  console.log(rawmiddleNames);

  var namesList = [];

  for (i=0; i < rawfirstNames.length; i++) {
    for (j=0; j < rawmiddleNames.length; j++) {
      for (k=0; k < rawlastNames.length; k++) {

        var first = rawfirstNames[i];
        var middle = rawmiddleNames[j];
        var last = rawlastNames[k];

        namesList.push(first + " " + middle + " " + last);

      }
    }
  }

  /*return namesList.join("\r\n");*/
  return namesList;
}

function aggregateInitials(rawfirstNames, rawmiddleNames, rawlastNames) {

  var initialsList = [];

  for (i=0; i < rawfirstNames.length; i++) {

    for (j=0; j < rawmiddleNames.length; j++) {

      for (k=0; k < rawlastNames.length; k++) {

        var first = rawfirstNames[i];
        var middle = rawmiddleNames[j];
        var last = rawlastNames[k];

        var firstInitial = first[0];
        var middleInitial = middle[0];
        var lastInitial = last[0];

        initialsList.push(firstInitial+middleInitial+lastInitial);
      }

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
