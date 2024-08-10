const displayHistory = document.querySelector(".display-history");
const displayInput = document.querySelector(".display-input");
const tempResult = document.querySelector(".temp-result");
const numbers = document.querySelectorAll(".number");
const operations = document.querySelectorAll(".operation");
const equal = document.querySelector(".equal");
const clearAll = document.querySelector(".all-clear");
const clearLast = document.querySelector(".last-entity-clear");

let di1Num = "";
let di2Num = "";
let result = null;
let lastOperation = "";
let haveDot = false;

numbers.forEach((number) => {
    number.addEventListener("click", (e) => {
        if (e.target.innerText === "." && !haveDot) {
            console.log(e.target.innerText)
            haveDot = true
        } else if (e.target.innerText == "." && haveDot) {
            return;
        }
        di2Num += e.target.innerText;
        displayInput.innerText = di2Num;
    })
})

operations.forEach((operation) => {
    operation.addEventListener("click", (e) => {
        if (!di2Num) return;
        haveDot = false;
        const operationName = e.target.innerText;
        if (di1Num && di2Num && lastOperation) {
            mathOperation();
        } else {
            result = parseFloat(di2Num);
        }
        console.log(operationName);
        clearVar(operationName);
        lastOperation = operationName;
        console.log(result);
    })
})

function clearVar(name = "") {
    di1Num += di2Num + " " + name + " ";
    displayHistory.innerText = di1Num;
    displayInput.innerText = "";
    di2Num = "";
    tempResult.innerText = result;
}

function mathOperation() {
    if (lastOperation === "x") {
        result = parseFloat(result) * parseFloat(di2Num)
    } else if (lastOperation === "+") {
        result = parseFloat(result) + parseFloat(di2Num)
    } else if (lastOperation === "-") {
        result = parseFloat(result) - parseFloat(di2Num)
    } else if (lastOperation === "/") {
        result = parseFloat(result) / parseFloat(di2Num)
    } else if (lastOperation === "%") {
        result = parseFloat(result) % parseFloat(di2Num)
    }
}

equal.addEventListener("click", (e) => {
    if (!di1Num|| !di2Num ) return;
    haveDot = false;
    mathOperation();
    clearVar();
    displayInput.innerText = result;
    displayHistory.innerText += di2Num + " =";
    tempResult.innerText = "";
    di2Num = result;
    di1Num = "";
});

clearAll.addEventListener("click", (e) => {
    di1Num = "";
    di2Num = "";
    displayInput.innerText = "";
    displayHistory.innerText = "";
    tempResult.innerText = "";
    result = "";
    lastOperation = "";
})

clearLast.addEventListener("click", (e) => {
    displayInput.innerText = "";
    di2Num = "";
    tempResult.innerText = "";
})

window.addEventListener("keydown", (e) => {
    if (e.key === "0" || 
        e.key === "1" || 
        e.key === "2" || 
        e.key === "3" || 
        e.key === "4" ||
        e.key === "5" || 
        e.key === "6" || 
        e.key === "7" || 
        e.key === "8" || 
        e.key === "9")
    {
        clickButton(e.key);
    } else if (e.key === "+" || 
        e.key === "-" || 
        e.key === "/" || 
        e.key === "%" || 
        e.key === "x")
    {
        clickOperation(e.key);
    } else if (e.key === ".") {
        clickButton(e.key);
    } else if (e.key === "Enter" || e.key === "=") {
        clickEqual(e.key);
    } else if (e.key === "Backspace") {
        clickClearAll(e.key);
    }
})

function clickButton(key) {
    numbers.forEach((button) => {
        if (button.innerText === key) {
            button.click();
        }
    })
}

function clickOperation(key) {
    operations.forEach((button) => {
        if (button.innerText === key) {
            button.click();
        }
    })
}

function clickEqual() {
    equal.click();
}

function clickClearAll() {
    clearLast.click();
}