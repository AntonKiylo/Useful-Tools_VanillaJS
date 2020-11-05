import './Calculator.css'

export default class Calculator {

  numberButtons = document.querySelectorAll("[data-number]");
  operationButtons = document.querySelectorAll("[data-operation]");
  equalButton = document.querySelector("[data-equal]");
  deleteButton = document.querySelector("[data-delete]");
  clearButton = document.querySelector("[data-clear]");
  previousOutput = document.querySelector("[data-previous-operand]");
  currentOutput = document.querySelector("[data-current-operand]");


  compute() {
    let computation = null;
    let prev = parseFloat(this.previousOutput.innerHTML);
    let current = parseFloat(this.currentOutput.innerHTML);
    let operation = this.previousOutput.innerHTML.slice(this.previousOutput.innerHTML.length - 1);

    if (isNaN(prev) || isNaN(current)) {
      return;
    }

    switch (operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "*":
        computation = prev * current;
        break;
      case "/":
        computation = prev / current;
        break;
      default:
        break;
    }

    if (isFinite(computation)) {
      this.currentOutput.innerHTML = computation;
      operation = null;
      this.previousOutput.innerHTML = null;
    } else {
      this.previousOutput.innerHTML = "Divide by zero error";
      this.currentOutput.innerHTML = null;
      operation = null;
    }
  }

  init() {

    this.numberButtons.forEach(button => {
      button.addEventListener("click", () => {
        if (button.innerHTML === "." && this.currentOutput.innerHTML.includes(".")) {
          return;
        } else {
          this.currentOutput.innerHTML += button.innerHTML
        }
      });
    });

    this.operationButtons.forEach(button => {
      button.addEventListener("click", () => {
        if (this.currentOutput.innerHTML === "" || this.currentOutput.innerHTML === ".") {
          return;
        }
        if (this.previousOutput.innerHTML !== "") {
          this.compute();
        }

        this.currentOutput.innerHTML += button.innerHTML;
        this.previousOutput.innerHTML = this.currentOutput.innerHTML;
        this.currentOutput.innerHTML = "";
      });
    });

    this.equalButton.addEventListener("click", this.compute.bind(this));

    this.clearButton.addEventListener("click", () => {
      this.previousOutput.innerHTML = null;
      this.currentOutput.innerHTML = null;
    });

    this.deleteButton.addEventListener("click", () => {
      this.currentOutput.innerHTML = this.currentOutput.innerHTML.slice(0, -1);
    });
  }
}