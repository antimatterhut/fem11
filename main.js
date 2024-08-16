//buttons

const five = document.querySelector(".b1");
const ten = document.querySelector(".b2");
const fifteen = document.querySelector(".b3");
const twenty = document.querySelector(".b4");
const twentyFive = document.querySelector(".b5");
const custom = document.querySelector(".b6");
const allButtoms = document.querySelectorAll(".op");

// 0 error elements

const numOfPeople = document.querySelector(".num-of-people"); //input for num of people
const errorMessage = document.querySelector(".error-message");

//updating tip amount

const tipAmount = document.querySelector(".tip-amount");
const priceAmount = document.querySelector(".price-amount");

//default value for nums
let billValue = 0;
let tipValue = 0;
let numOfPersons = 1; //cannot be 0
let tipPercent = 0;

//getting the inputs for the calculation
const billNum = document.querySelector(".bill-num");

//Code for keeping the tip buttons their color

const chooseTipButton = (event) => {
  allButtoms.forEach((element) => {
    if (element != event.currentTarget && !element.classList.contains("b6")) {
      element.style.backgroundColor = "hsl(183, 100%, 15%)";
    }
  });

  if (!event.currentTarget.classList.contains("b6")) {
    event.currentTarget.style.backgroundColor = "hsl(172, 67%, 45%)";

    text = event.currentTarget.textContent;

    let result = text.replace(/%/, "");

    let resultNum = Number(result);

    tipPercent = 1 + resultNum / 100;
  }

  doCalc();
};

const customChoice = (event) => {
  text = custom.value;

  // console.log(text);

  let result = text.replace(/%/, "");

  let resultNum = Number(result);

  tipPercent = 1 + resultNum / 100;

  doCalc();
};

//adding the event listeners to every button
allButtoms.forEach((element) => {
  element.addEventListener("click", chooseTipButton);
});

custom.addEventListener("input", customChoice);

//Code for zero error

const handleZeroError = (event) => {
  console.log(numOfPeople.value);
  if (numOfPeople.value == "0") {
    errorMessage.style.visibility = "visible";
    numOfPeople.style.border = "1.5px solid red";
  } else {
    errorMessage.style.visibility = "hidden";
    numOfPeople.style.outline = "none";
    numOfPeople.style.border = "none";
  }

  doCalc();
};

numOfPeople.addEventListener("input", handleZeroError);

// Code for the calculation

//function for getting value from button

const doCalc = (event) => {
  //get value of BILL
  //get value of TIP PERCENT
  //get value of persons

  // append this function to other functions

  billValue = Number(billNum.value);

  numOfPersons = Number(numOfPeople.value);

  let tipPerPerson = Number(
    ((billValue * (tipPercent - 1)) / numOfPersons).toFixed(2)
  );

  console.log(tipPerPerson);

  let payPerPerson = (billValue / numOfPersons + tipPerPerson).toFixed(2);

  console.log(payPerPerson);

  tipAmount.textContent = tipPerPerson;

  priceAmount.textContent = payPerPerson;
};

//code for reset button
