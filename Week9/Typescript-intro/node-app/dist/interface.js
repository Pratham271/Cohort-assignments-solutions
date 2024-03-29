"use strict";
class Employee {
    constructor(n, a) {
        this.greet = (phase) => {
            console.log(phase);
        };
        this.name = n;
        this.age = a;
    }
}
