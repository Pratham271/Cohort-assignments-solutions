import { client } from "..";
/*
 * Function should insert a new todo for this user
 * Should return a todo object
 * {
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }
 */
export async function createTodo(userId: number, title: string, description: string) {
    try {
        // await client.connect();
        const todoQuery = `INSERT INTO todos (user_id, title, description) 
        VALUES ($1, $2, $3);`;
        const response = await client.query(todoQuery,[userId,title,description])
        console.log("Added data successfully: ",response.rows);
        
        const findQuery = `SELECT id, title, done, description FROM todos 
        WHERE id=(SELECT max(id) FROM todos);`
        const todo = await client.query(findQuery);
        if(todo.rows.length>0){
            return todo.rows[0];
        }
        else{
            return "not found";
        }
    } catch (error) {
        console.error(error)
    }
    // finally{
    //     client.end()
    // }
}
/*
 * mark done as true for this specific todo.
 * Should return a todo object
 * {
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }
 */
export async function updateTodo(todoId: number) {
    try {
        // await client.connect();
        const updateQuery = `UPDATE todos SET done=$1 WHERE id=$2;`
        const response = await client.query(updateQuery,[true,todoId])
        console.log(response)
        const updatedTodoQuery = `SELECT done FROM todos
        WHERE id=$1;`;
        const updatedTodo = await client.query(updatedTodoQuery,[todoId])
        if(updatedTodo.rows.length>0){
            return updatedTodo.rows[0];
        }
        else{
            return "not found"
        }
    } catch (error) {
        console.error(error)
    }
    // finally{
    //     client.end()
    // }
}

/*
 *  Get all the todos of a given user
 * Should return an array of todos
 * [{
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }]
 */
export async function getTodos(userId: number) {
    try {
        // await client.connect();
        const findTodoQuery = `SELECT * FROM todos
        WHERE user_id=$1;`;
        const todo = await client.query(findTodoQuery,[userId])
        if(todo.rows.length>0){
            return todo.rows;
        }
        else{
            return [];
        }
    } catch (error) {
        console.error(error)
        return [];
    }
    // finally{
    //     client.end();
    // }
}