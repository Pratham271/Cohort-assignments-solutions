interface User1{
    id: number,
    name: string,
    age: number,
    email: string,
    password: string
}

type updateProps = Pick<User1, 'name'| 'age'| 'password'>

function updatedUser(updatedProps: updateProps){
   // hit the db to update the user 
}
