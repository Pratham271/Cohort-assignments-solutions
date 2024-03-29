"use strict";
const doSomething = (a) => {
    console.log("hllo there");
    return a;
};
const isUserLegal = (user) => {
    if (user.age > 18) {
        return true;
    }
    else {
        return false;
    }
};
const ans = isUserLegal({
    firstName: "Pratham",
    lastName: "Chauhan",
    age: 22
});
console.log(ans);
