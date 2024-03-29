import { getClient } from "./connect";

async function getUser(email:string){
    const client = await getClient();
    try {
        const findQuery = "SELECT * FROM users WHERE email = $1;";
        const result = await client.query(findQuery, [email])
        if(result.rows.length>0){
            console.log("user found", result.rows[0]);
            // return result.rows[0];
        }
        else{
            console.log("No user found with this email")
        }
    } catch (error) {
        console.error(error)
    }
    finally{
        client.end();
    }
}

getUser("second1user@gmail.com")