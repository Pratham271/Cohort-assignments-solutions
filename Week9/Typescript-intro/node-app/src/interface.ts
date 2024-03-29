interface Person{
    name: string,
    age: number,
    // greet(phase:string):void
    greet:(phase:string)=> void
}

class Employee implements Person{
    name: string;
    age: number;

    constructor(n: string, a:number){
        this.name = n;
        this.age = a;
    }

    greet: (phase:string)=>void = (phase)=> {
        console.log(phase)
    }

//     greet(phase:string):void {
//         console.log("hello"+phase)
//    }

}