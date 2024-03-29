let x: number = 101
console.log(x)

function greet(name:string){
    console.log(`hello ${name}`)
}

function sum(a:number,b:number): number{
    return a+b;
}



function isLegal(age:number):boolean{
    if(age>18) return true
    else return false
}



function acceptCallback(callback:(name:string)=>string):void {
    
    setTimeout(()=> {
        const result = callback("Pratham")
        console.log(result)
    },1000)
}

acceptCallback((name:string)=> {
    return name
})


// const doSomething: (a:number) =>void = (a) => {
//     console.log("hllo there")
//     return a
// }

// const ans = doSomething(5)
// console.log(ans)

