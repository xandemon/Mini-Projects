//  need to work on the cases in which answers are returned in exponent form

const form = document.getElementById('math-solver');
const input = document.getElementById('expression');
const output = document.getElementById('result');

//when the solve button is clicked
form.addEventListener('submit', (e) => {
    e.preventDefault();
    let inputExpression = input.value;
    const result = solveEqn(inputExpression);
    output.innerHTML = result;
});

//defining regexp variables for comparing with expression string
//note: \d --> digit,  \s --> whitespace,  [] --> any of the characters inside
//note: + --> multiple characters of previous type,  * --> zero to infinite number of characters
//note: ?<name> gives a name to the characters enclosed in ()
//note: \ are used to indicate reserved characters as targeted characters
const PARENTHESIS_REGEXP = /\((?<subExpression>.*)\)/;  //for innermost parenthesis: /\((?<subExpression>[^\(\)])\)/
const EXPONENT_REGEXP = /(?<operand1>[-\d]+)\s*(?<operator>\^)\s*(?<operand2>[-\d]+)/;
const MULTIPLY_DIVIDE_REGEXP = /(?<operand1>[-\d]+)\s*(?<operator>[\/\*])\s*(?<operand2>[-\d]+)/;
const ADD_SUB_REGEXP = /(?<operand1>[-\d]+)\s*(?<operator>(?<!e)[\+\-])\s*(?<operand2>[-\d]+)/;

function solveEqn(expression) {
    if (expression.match(PARENTHESIS_REGEXP)) {
        console.log("looking for parenthesis...");
        let subExpression = expression.match(PARENTHESIS_REGEXP).groups.subExpression;
        let tempValue = solveEqn(subExpression);
        let newExpression = expression.replace(PARENTHESIS_REGEXP, tempValue);
        return solveEqn(newExpression);
    }
    else if (expression.match(EXPONENT_REGEXP)) {
        console.log("looking for exponent...");
        let newExpression = generateNewExpression(expression, EXPONENT_REGEXP);
        return solveEqn(newExpression);
    }
    else if (expression.match(MULTIPLY_DIVIDE_REGEXP)) {
        console.log("looking for multiply-divide...");
        let newExpression = generateNewExpression(expression, MULTIPLY_DIVIDE_REGEXP);
        return solveEqn(newExpression);
    }
    else if (expression.match(ADD_SUB_REGEXP)) {
        console.log("looking for add, subtract...");
        let newExpression = generateNewExpression(expression, ADD_SUB_REGEXP);
        return solveEqn(newExpression);
    }
    else {
        return parseFloat(expression);
    }
}

//gets the calculated value of operation and returns a new reduced expression with replaced value
function generateNewExpression(expression, REGEXP) {
    //get the part of equation to operate on
    const subExpression = expression.match(REGEXP);
    console.log(subExpression);
    //perform a calculation
    const output = calculate(subExpression.groups);
    console.log(output);
    //replace and get the next reduced form of equation
    let newExpression = expression.replace(REGEXP, output);
    console.log(newExpression);
    //send that equation to the function again for solving
    console.log("");
    return newExpression;
}

//a function that operates on two operands according to the operator symbol
function calculate(object) {
    const value1 = parseFloat(object.operand1);
    const value2 = parseFloat(object.operand2);
    switch (object.operator) {
        case '^':
            return value1 ** value2;
        case '/':
            return value1 / value2;
        case '*':
            return value1 * value2;
        case '+':
            return value1 + value2;
        case '-':
            return value1 - value2;
    }
}