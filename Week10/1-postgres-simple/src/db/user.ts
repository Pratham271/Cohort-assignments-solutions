import { client } from "..";

/*
 * Should insert into the users table
 * Should return the User object
 * {
 *   username: string,
 *   password: string,
 *   name: string
 * }
 */
export async function createUser(username: string, password: string, name: string) {
    try {
        // await client.connect();
        const createUserQuery = `INSERT INTO users (username, password, name)
        VALUES ($1, $2, $3);`;
        const response = await client.query(createUserQuery,[username,password,name]);
        console.log("user created: ",response)
        const userQuery = `SELECT username, password, name FROM users
        WHERE id =(SELECT max(id) FROM users);`; 
        const user = await client.query(userQuery);
        if(user.rows.length>0){
            return user.rows[0];
        }
        else {
            return "Not found"
        }
    } catch (error) {
        console.error(error)
    }
    // finally{
    //     client.end()
    // }
}

/*
 * Should return the User object
 * {
 *   username: string,
 *   password: string,
 *   name: string
 * }
 */
export async function getUser(userId: number) {
    try {
        // await client.connect();
        const findUserQuery =  `SELECT username, id, name FROM users
        WHERE id=$1;`;
        const user = await client.query(findUserQuery,[userId])
        if(user.rows.length>0){
            return user.rows[0];
        }
        else{
            return "not found"
        }
    } catch (error) {
        console.error(error);
    }
    // finally{
    //     client.end();
    // }
}
