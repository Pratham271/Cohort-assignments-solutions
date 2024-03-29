interface User2{
    id: number,
    name: string,
    age: number,
    email: string,
    password: string
}

type updateProps1 = Pick<User2, 'age'| 'name'| 'password'>

type optionalProps1 = Partial<updateProps1>

function updateUser(updateParams: optionalProps1){
    
}