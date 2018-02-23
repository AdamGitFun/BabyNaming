function generateNameCombinations() {

  // google analytics tracking
  gtag('event','generateNameCombinations');

  var rawFirstNameOptions = document.getElementById("inputtedFirstNames").value;
  var rawMiddleNameOptions = document.getElementById("inputtedMiddleNames").value;
  var rawLastNameOptions = document.getElementById("inputtedLastName").value;

  scrollToResult();
  // check for presence of inputs //
  if (rawFirstNameOptions == "" || rawLastNameOptions == "") {
    alert("Please input at least one first name and one last name");
    return;
  }

  // its okay to run without middle names but we are checking to make sure the user knows they did this //
  if (rawMiddleNameOptions == "") {
    if (confirm("Do you want to continue without any middle names?") == true) {
      // continues without issue
      rawMiddleNameOptions == "";
    } else {
      return;
    }
  }

  //remove white space and commas from user input and parse into an array
  //Also checks for a comma, return, or semicolon delimiter*/

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

function scrollToResult() {

  //var button_bounding_rectangle = document.getElementById("generateButton").getBoundingClientRect();
  var button_bounding_rectangle = document.getElementById("resultNames").getBoundingClientRect();

  var button_y_position = button_bounding_rectangle.bottom;
  var button_x_position = button_bounding_rectangle.right - button_bounding_rectangle.left;
  console.log(button_bounding_rectangle.bottom);

  window.scrollTo(button_x_position,button_y_position);
}

function aggregateNames(rawfirstNames, rawmiddleNames, rawlastNames) {

  var namesList = [];

  for (i=0; i < rawfirstNames.length; i++) {
    for (j=0; j < rawmiddleNames.length; j++) {
      for (k=0; k < rawlastNames.length; k++) {

        var first = rawfirstNames[i];
        var middle = rawmiddleNames[j];
        var last = rawlastNames[k];

        if (middle == "") {
          namesList.push(first + " " + last);
        } else {
          namesList.push(first + " " + middle + " " + last);
        }


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

        if (middle == "") {
          initialsList.push(firstInitial+lastInitial);
        } else {
          initialsList.push(firstInitial+middleInitial+lastInitial);
        }

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

  return namesAndInitialsResult.join("\n");
}

function download() {

  // google analytics tracking
  gtag('event','downloadCSV');

  if (document.getElementById("resultNames").innerHTML) {
    text = document.getElementById("resultNames").innerHTML;
    console.log('text is: ');
    console.log(typeof text);
    console.log(text.includes("\r"));
    console.log(text.includes("\n"));
  } else {
    text = "No names have been generated.";
  }

  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', "Name-Combinations.txt");

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

/* Test Data
Adam, Frank, Steve, Silvestor, Mohan, Derrick
Barney, Sebastian, Phillip, Jemal, Lennie
Johnson, Williams, Johnson-Williams

*/
