"use strict";
function maxValue(arr) {
    let maxValue = 0;
    arr.map(a => {
        if (a > maxValue) {
            maxValue = a;
        }
    });
    return maxValue;
}
const max = maxValue([1, 2, 3, 4, 5]);
console.log(max);
