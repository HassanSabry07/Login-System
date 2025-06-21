//elements for log in form
var logInEmail = document.getElementById("logInEmail");
var logInPassword = document.getElementById("logInPassword");

// Elements for sign up form
var signUpName = document.getElementById("signUpName");
var signUpEmail = document.getElementById("signUpEmail");
var signUpPassword = document.getElementById("signUpPassword");

// Elements for sign in and sign up errors
var signUpError = document.getElementById("signUpError");
var signUpEmptyError = document.getElementById("signUpEmptyError");
var loginError = document.getElementById("loginError");
var loginEmptyError = document.getElementById("loginEmptyError");
var signUpFormatError = document.getElementById("signUpFormatError");

//valid sign up
var signUpSuccess = document.getElementById("signUpSuccess");

// Buttons for sign up and log in and log out
var signUpBtn = document.getElementById("signUpBtn");
var logInBtn = document.getElementById("logInBtn");
var logOutBtn = document.getElementById("logOutBtn");

// Elements for different pages
var signup = document.getElementById("signup");
var login = document.getElementById("login");
var welcomePage = document.getElementById("welcomePage");
//nav bar
var userNav = document.getElementById("userNav");


var signUpUser=[];
var signInUser = [];

// Function to save user data to localStorage
function saveUser() {
    localStorage.setItem("signUpUser", JSON.stringify(signUpUser));
}
// Function to retrieve user data from localStorage
if (localStorage.getItem("signUpUser")) {
    signUpUser = JSON.parse(localStorage.getItem("signUpUser"));
}
else {
    signUpUser = [];
}


// Function to add a new user
function addUser(){

  var newUser = {
    name: signUpName.value,
    email: signUpEmail.value,
    password: signUpPassword.value
  }

  signUpUser.push(newUser);
  saveUser();
}

// Event listener for sign up button
signUpBtn.addEventListener("click", function () {

  
if (isEmailRegistered(signUpEmail.value)) {
    return; // Exit if email is already registered
  }
  // Check if all fields are filled
  if ( signUpName.value && signUpEmail.value && signUpPassword.value) {
    if (!isEmailValid()) {
      signUpFormatError.classList.remove("d-none");
      console.log("Invalid email format.");
      return; // Exit if email format is invalid
    }
    addUser();
    saveUser();
   console.log("user", signUpUser);
    signUpSuccess.classList.remove("d-none");
    signUpEmptyError.classList.add("d-none");
    signUpFormatError.classList.add("d-none");

    clearSignUpForm();
  }
  // If any field is empty, show error message 
  else {
    signUpEmptyError.classList.remove("d-none");
    signUpSuccess.classList.add("d-none");
    console.log("Please fill in all fields.");
  }
});


// Function to log in the user
function logINFunc(){
  var userLogIn={
    email: logInEmail.value,
    password: logInPassword.value
  }

// Check if all fields are filled
  if(userLogIn.email === "" || userLogIn.password === ""){
  // If any field is empty, show error message
    signUpEmptyError.classList.remove("d-none")
   loginEmptyError.classList.remove("d-none")
    console.log("Please fill in all fields.");
  }
  // If all fields are filled, check if the user exists
    else if (signUpUser.some(user => user.email === userLogIn.email && user.password === userLogIn.password)) {
      // If user exists, hide error messages and show welcome page
      signUpEmptyError.classList.add("d-none")
      welcomePage.classList.remove("d-none");
      login.classList.add("d-none");
      userNav.classList.remove("d-none");
      displayWelcomeMessage()
      console.log("Welcome to the page");
      loginEmptyError.classList.add("d-none")
      logInError.classList.add("d-none");

    }
    else {
      //alert("Invalid email or password.");
      logInError.classList.remove("d-none");
      loginEmptyError.classList.add("d-none")
      console.log("Invalid email or password.");
    }
  }

// Event listener for log in button
logInBtn.addEventListener("click", function () {
  logINFunc();
});
// Event listener for Enter key in log in form
logOutBtn.addEventListener("click", function () {
  welcomePage.classList.add("d-none");
  login.classList.remove("d-none");
  userNav.classList.add("d-none");
  logInEmail.value = "";
  logInPassword.value = "";
  console.log("Logged out successfully.");
});


//function to open sign up page
function openSignUp() {
  signup.classList.remove("d-none");
  login.classList.add("d-none");
  console.log("Sign up page opened.");
}

//function to open log in pages
function openLogIn() {
  signup.classList.add("d-none");
  login.classList.remove("d-none");
  console.log("Log in page opened.");
}

//function to check if email is already registered
function isEmailRegistered(email) {
  // Check if the email is already registered
  // user => is used to iterate through the signUpUser array
  if (signUpUser.some(user => user.email === email)) {
    signUpError.classList.remove("d-none")
    console.log("Email is already registered.");
    return true;
  }
  else{
   signUpError.classList.add("d-none")
  }
}

// Function to display a welcome message
function displayWelcomeMessage() {
  var user = signUpUser.find(user => user.email === logInEmail.value);
  if (user) {
    welcomePage.innerHTML = `<h1>Welcome, ${user.name}!</h1>`;
    console.log(`Welcome, ${user.name}!`);
  } 
}


//function to clear the sign up form
function clearSignUpForm() {
  signUpName.value = "";
  signUpEmail.value = "";
  signUpPassword.value = "";
}

//function for regex for email validation
function isEmailValid(){
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(signUpEmail.value);
}