type User1 = {
    firstName: string,
    lastName: string,
    age: number
}

type StringOrNumber =  string | number

function printId(id:StringOrNumber){
    console.log(id)
}

printId(21)
printId("121")