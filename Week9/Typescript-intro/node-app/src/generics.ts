

// const arrayFirst: (arr:[])=>number = (arr) => {
//     return arr[0];
// }

type Input = number|string

// function arrayFirst<T>(arr:T[]){
//     return arr[0];
// }


// const arrayFirst<T>:(arr:T[])=>T = (arr) => {
//     return arr[0]
// }

// const arrayFirst = <T>(arr:T[]) => {
//     return arr[0]
// }

const arrayFirst:<T>(arr:T[])=>T = (arr) => {
    return arr[0]
}

const value = arrayFirst<string>(["Pratham","Chauhan"])
console.log(value.toUpperCase())
