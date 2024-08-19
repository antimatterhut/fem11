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

let tipPerPerson = 0;
let payPerPerson = 0;

//getting the inputs for the calculation
const billNum = document.querySelector(".bill-num");

//reset button

const resetButton = document.querySelector(".reset-button");

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

// code for getting the custom value option
const customChoice = (event) => {
  text = custom.value;

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

//Code for zero error, with regards to the look changing

const handleZeroError = (event) => {
  const numPeople = Number(numOfPeople.value); // Convert to number
  if (numPeople === 0) {
    errorMessage.style.visibility = "visible";
    numOfPeople.classList.add("error-border");
    tipAmount.textContent = "0.00";
    priceAmount.textContent = "0.00";
  } else {
    errorMessage.style.visibility = "hidden";
    numOfPeople.classList.remove("error-border");
    doCalc();
  }
};

numOfPeople.addEventListener("input", handleZeroError);

// Code for the calculation

//function for getting value from button

const doCalc = (event) => {
  // Get value of BILL
  // Get value of TIP PERCENT
  // Get value of persons

  if (billNum.value != "") {
    billValue = Number(billNum.value);
  } else {
    billValue = 0;
  }

  if (numOfPeople.value != "") {
    numOfPersons = Number(numOfPeople.value);
  } else {
    numOfPersons = 1;
  }

  let placeholder = tipPercent - 1;
  if (placeholder < 0) {
    placeholder = 0;
  }

  if (numOfPeople.value != 0) {
    tipPerPerson = ((billValue * placeholder) / numOfPersons).toFixed(2);
    let tipPerPersonNum = parseFloat(tipPerPerson);

    payPerPerson = (billValue / numOfPersons + tipPerPersonNum).toFixed(2);
    let payPerPersonNum = parseFloat(payPerPerson);

    tipAmount.textContent = tipPerPerson;
    priceAmount.textContent = payPerPerson; // Corrected line
  } else {
    tipAmount.textContent = "0.00";
    priceAmount.textContent = "0.00"; // Corrected line
  }
};

const handleZeroErrorinBill = (event) => {
  const billInputValue = Number(billNum.value); // Use a different name
  console.log("bill", billInputValue);
  if (billInputValue === 0) {
    errorMessage.style.visibility = "visible";
    billNum.classList.add("error-border");
    tipAmount.textContent = "0.00";
    priceAmount.textContent = "0.00";
  } else {
    errorMessage.style.visibility = "hidden";
    billNum.classList.remove("error-border");
    doCalc();
  }
};

billNum.addEventListener("input", handleZeroErrorinBill);

// billNum.addEventListener("input", doCalc);

//code for reset button

const reset = () => {
  tipAmount.textContent = "0.00";
  priceAmount.textContent = "0.00";
  billValue = 0;
  tipValue = 0;
  numOfPersons = 1; //cannot be 0
  tipPercent = 0;
  tipPerPerson = 0;
  payPerPerson = 0;
  billNum.value = "";
  numOfPeople.value = "";
  custom.value = "";
  handleZeroError();

  allButtoms.forEach((element) => {
    if (!element.classList.contains("b6")) {
      element.style.backgroundColor = "hsl(183, 100%, 15%)";
    }
  });
};

resetButton.addEventListener("click", reset);
