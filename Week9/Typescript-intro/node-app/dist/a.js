"use strict";
let x = 101;
console.log(x);
function greet(name) {
    console.log(`hello ${name}`);
}
function sum(a, b) {
    return a + b;
}
function isLegal(age) {
    if (age > 18)
        return true;
    else
        return false;
}
function acceptCallback(callback) {
    setTimeout(() => {
        const result = callback("Pratham");
        console.log(result);
    }, 1000);
}
acceptCallback((name) => {
    return name;
});
