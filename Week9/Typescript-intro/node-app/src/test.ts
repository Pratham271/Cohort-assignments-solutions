const doSomething: (a:number) =>void = (a) => {
    console.log("hllo there")
    return a
}

// const ans = doSomething(5)
// console.log(ans)
interface User  {
    firstName: string,
    lastName: string,
    email?: string, // ? means optional argument 
    age: number
}


const isUserLegal: (user:User)=>boolean = (user) => {
    if(user.age>18){
        return true
    }
    else{
        return false
    }
}

const ans: boolean = isUserLegal({
    firstName: "Pratham",
    lastName: "Chauhan",
    age:22
})
console.log(ans)
// function isUserLegal(user:any){

// }