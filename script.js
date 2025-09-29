let firstNumber = "";
let secondNumber = "";
let operator = "";
let isSwitched = false;
let isOperatorPressed = false;

const numbers = document.querySelector(".numbers");
const operators = document.querySelector(".operators");
const equal = document.getElementById("equal");
const clear = document.getElementById("clear");
const decimal = document.getElementById("decimal");
const deleteB = document.getElementById("deleteB");

let display = document.getElementById("display");

function addNumbers(num1, num2) {
    return num1 + num2;
}

function subtractNumbers(num1, num2) {
    return num1 - num2;
}

function multiplyNumbers(num1, num2) {
    return num1 * num2; 
}

function divideNumbers(num1, num2) {
    if (num2 === 0) {
        alert("Ah-ah-ah! Division by zero is not allowed!");
        return 0;
    }
    const result = num1 / num2;

    if (Number.isInteger(result)) {
        return result;
    }

    return Math.round(result * 10) / 10;
}


function operate (operator, num1, num2) {
    switch (operator) {
        case "+": 
            return addNumbers(num1, num2);
        case "-":
            return subtractNumbers(num1, num2);
        case "*": 
            return multiplyNumbers(num1, num2);
        case "/":
            return divideNumbers(num1, num2);
        case "=":
            alert("Try to start with numbers");
        default:
            alert("Cannot be identified. Please try again");
    }
}

function showOnDisplay (input) {
    if (display.innerText === "0" || isOperatorPressed) {
        display.innerText = input;
        isOperatorPressed = false;
    }
    else {
        display.innerText += input; 
    }
}

function assignNumber(number) {
    if (!isSwitched) {
        firstNumber += number;
    }
    else if (isSwitched){
        secondNumber +=  number;
    }
}


numbers.addEventListener("click", (event) => {
    const content = event.target.innerText;
    showOnDisplay(content);
    assignNumber(content);
});

operators.addEventListener("click", (event) => {
    if (operator && isSwitched && secondNumber !== "") {
        const result = operate(operator, parseFloat(firstNumber), parseFloat(secondNumber));

        display.innerHTML = result;

        firstNumber = result.toString();
        secondNumber = "";
    }
    isOperatorPressed = true;
    isSwitched = true;
    operator = event.target.innerText;

    display.innerText = firstNumber + ` ${operator}  `;
});

equal.addEventListener("click", (event) => {
    if (firstNumber !== "" && secondNumber !== "") {
        const result = operate(operator, parseFloat(firstNumber), parseFloat(secondNumber));
        display.innerHTML = result;
        firstNumber = result.toString();
        secondNumber = "";
    }
});



clear.addEventListener("click", (event) => {
    display.innerHTML = "0";
    firstNumber = "";
    secondNumber = "";
    isSwitched = false;
    isOperatorPressed = false;
    operator = "";
});

decimal.addEventListener("click", () => {
    if (isSwitched) {
        if (!secondNumber.includes(".")) {
            secondNumber += (secondNumber === "") ? "0." : ".";
            display.innerText = secondNumber;
        }
    } else {
        if(!firstNumber.includes(".")) {
            firstNumber += (firstNumber === "") ? "0." : ".";
            display.innerText = firstNumber;
        }
    }
})

deleteB.addEventListener("click", () => {
    if (!isSwitched) {
        firstNumber = firstNumber.slice(0, -1);
    } else if (isSwitched) {
        secondNumber = secondNumber.slice(0, -1);
    } else if (isSwitched && secondNumber === "") {
        operator = "";
        isSwitched = false;
    }
    display.innerText = firstNumber + (operator ? ` ${operator} ` : "") + secondNumber;
})