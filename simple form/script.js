// TODO: Select all elements needed
//    Use the HTML to figure out what classes/ids will work best for selecting each element

// TODO: Create an event listener for when the form is submitted and do the following inside of it.
//    TODO: Create an array to store all error messages and clear any old error messages
//    TODO: Define the following validation checks with appropriate error messages
//      1. Ensure the username is at least 6 characters long
//      2. Ensure the password is at least 10 characters long
//      3. Ensure the password and confirmation password match
//      4. Ensure the terms checkbox is checked
//    TODO: If there are any errors then prevent the form from submitting and show the error messages

let errArr = [];

function validateForm(e) {
  errArr = [];
  let form = document.forms["simpleForm"];
  let usrnm = form["username"].value;
  if (usrnm.length < 6) {
    errArr.push("Username must be at least 6 characters long.");
  }
  let pswd = form["password"].value;
  if (pswd.length < 10) {
    errArr.push("Password must be at least 10 characters long.");
  }
  let pswdConfm = form["password-confirmation"].value;
  if (pswdConfm != pswd) {
    errArr.push("The passwords did not match.");
  }
  let terms = form["terms"];
  if (terms.checked == false) {
    errArr.push("Please agree to the terms before continuing.");
  }
  
  if (errArr.length > 0) {
    e.preventDefault();
    clearErrors();
    showErrors();
    return false;
  } else {
    return true;
  }
}
document.getElementById("form").addEventListener("submit", validateForm);

// TODO: Define this function
// Loop through all the children of the error-list element and remove them
// IMPORTANT: This cannot be done with a forEach loop or a normal for loop since as you remove children it will modify the list you are looping over which will not work
// I recommend using a while loop to accomplish this task
// This is the trickiest part of this exercise so if you get stuck and are unable to progress you can also set the innerHTML property of the error-list to an empty string and that will also clear the children. I recommend trying to accomplish this with a while loop, though, for practice.
// Also, make sure you remove the show class to the errors container
function clearErrors() {
  let errList = document.getElementsByClassName("errors-list");
  let errBox = document.getElementsByClassName("errors");
  let listOfErr = errList[0].getElementsByTagName("li");
  let i = listOfErr.length - 1;
  while(i >= 0) {
    listOfErr[i].parentNode.removeChild(listOfErr[i]);
    i--;
  }
}

// TODO: Define this function
// Add each error to the error-list element
// Make sure to use an li as the element for each error
// Also, make sure you add the show class to the errors container
function showErrors(errorMessages) {
  let errList = document.getElementsByClassName("errors-list");
  let errBox = document.getElementsByClassName("errors");
  errBox[0].classList.add("show");
  for (let i=0; i < errArr.length; i++) {
    errList[0].innerHTML += "<li>" + errArr[i] + "</li>\n";
  }
}
