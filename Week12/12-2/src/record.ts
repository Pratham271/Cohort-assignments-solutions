type User4={
    username : string,
    password : string
}

// type users = {
//     [key: string]: User4
// }

// OR

type users = Record<string, User4>

const users: users = {
    "rand1": {
        username: "hello",
        password: " there"
    },
    "rand2": {
        username: "new",
        password: "user"
    }
}



