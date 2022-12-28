const input = document.querySelector("#inputNumber");
const operators = ["plus", "minus", "divide", "times", "sqrt"];
const numbers = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

let firstNum = "";
let setOperator = "";
let secondNum = "";
let reservedNum = "";
let saveSolveProblem = [];
let display = document.getElementById("calculate");

document.getElementById("clear").addEventListener("click", () => {
  input.value = "0";
  firstNum = "";
  setOperator = "";
  secondNum = "";
  document.getElementById("calculate").innerHTML = "";
});

document.getElementById("back").addEventListener("click", () => {
  if (input.value != "") {
    let newInput = (input.value = String(input.value).substring(
      0,
      input.value.length - 1
    ));
    if (setOperator != "") {
      secondNum = newInput;
    } else {
      first = newInput;
    }
    if (input.value == "") {
      input.value = "0";
    }
  } else {
    console.log("there some error");
  }
});

document.getElementById("dot").addEventListener("click", () => {
  if (setOperator != "") {
    input.value = secondNum += ".";
  } else {
    input.value = firstNum += ".";
  }
});

document.getElementById("equals").addEventListener("click", () => {
  if (setOperator == "") {
    return;
  }
  if (secondNum != "" && firstNum != "") {
    calculate(Number(firstNum), setOperator, Number(secondNum), result);
  } else {
    calculate(Number(input.value), setOperator, Number(reservedNum), result);
  }
});

for (let i = 0; i < numbers.length; i++) {
  document.getElementById(numbers[i]).addEventListener("click", () => {
    if (setOperator != "") {
      input.value = secondNum += i;
    } else {
      input.value = firstNum += i;
    }
  });
}

for (let i = 0; i < operators.length; i++) {
  document.getElementById(operators[i]).addEventListener("click", () => {
    if (firstNum != "" && secondNum == "") {
      setOperator = getOperators(operators[i]);
    } else {
      firstNum = input.value;
      secondNum = "";
      setOperator = getOperators(operators[i]);
    }

    display.innerHTML = `${firstNum} ${setOperator}`;
  });
}

function saveHistory(num1, operator, num2, answer) {
  if (saveSolveProblem != []) {
    const newDiv = document.createElement("div");
    newDiv.setAttribute("id", "historyWrapper");
    newDiv.style.width = "100%";

    const newP = document.createElement("p");
    const newContentP = document.createTextNode(
      `${num1} ${operator} ${num2} =`
    );
    newP.appendChild(newContentP);

    const newH2 = document.createElement("h2");
    const newContentH2 = document.createTextNode(`${answer}`);
    newH2.style.margin = "10px";
    newH2.appendChild(newContentH2);

    newDiv.appendChild(newP);
    newDiv.appendChild(newH2);

    const currentDiv = document.getElementById("display-history");
    const latestDiv = document.getElementById("historyWrapper");
    if (currentDiv.hasChildNodes()) {
      currentDiv.insertBefore(newDiv, latestDiv);
    } else {
      currentDiv.appendChild(newDiv, currentDiv);
    }
  }
}

function getOperators(operator) {
  if (operator == "plus") {
    return "+";
  } else if (operator == "minus") {
    return "-";
  } else if (operator == "divide") {
    return "/";
  } else if (operator == "times") {
    return "x";
  } else if (operator == "sqrt") {
    input.value = Math.sqrt(input.value);
    firstNum = input.value;
    return "";
  } else {
    return alert("Error");
  }
}

function reformatDecimal(value) {
  if (value % 1 != 0) {
    return value.toFixed(1);
  } else {
    return value;
  }
}

function calculate(firstnum, operator, secondnum, result) {
  let answer;

  if (operator == "+") {
    answer = firstnum + secondnum;
  } else if (operator == "-") {
    answer = firstnum - secondnum;
  } else if (operator == "/") {
    answer = firstnum / secondnum;
  } else if (operator == "x") {
    answer = firstnum * secondnum;
  } else if (operator == "*") {
    answer = firstnum ** secondnum;
  }

  display.innerHTML = `${firstnum} ${operator} ${secondnum} =`;
  console.log(typeof answer);
  result(reformatDecimal(answer));
  saveHistory(firstnum, operator, secondnum, reformatDecimal(answer));

  firstNum = "";
  reservedNum = secondnum;
  secondNum = "";
}

function result(ans) {
  input.value = ans;
}
