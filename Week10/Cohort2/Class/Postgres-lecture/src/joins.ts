import { getClient } from "./connect";

async function fetchDataTwice(userId: string){
    const client = await getClient();
    try {
        const userQuery = `SELECT u.id, u.username, u.email, u.password 
        FROM users u WHERE id=$1;`;
        const userDetails = await client.query(userQuery,[userId])

        const addressQuery = `SELECT a.city, a.country, a.street, a.pincode
        FROM addresses a WHERE user_id=$1;`;
        const addressDetails = await client.query(addressQuery,[userId])

        if(userDetails.rows.length>0){
            console.log("users: ", userDetails.rows[0])
            console.log("addresses: ", addressDetails.rows[0])
        }
        else{
            console.log("Nothing found")
        }
    } catch (error) {
        console.error(error)
    }
    finally{
        client.end()
    }
}

// better approach
async function joinTable(userId: string){
    const client = await getClient();
    try {
        const joinQuery = `SELECT u.id, u.username, u.email, u.password, a.city, a.country, a.street, a.pincode
        FROM users u LEFT JOIN addresses a ON u.id=a.user_id
        WHERE u.id=$1;`;
        const response = await client.query(joinQuery,[userId])
        if(response.rows.length>0){
            console.log("Final output: ",response.rows[0])
        }
        else{
            console.log("Not found")
        }
    } catch (error) {
        console.error(error)
    } 
    finally{
        client.end()
    }  
}

joinTable("1")
// fetchDataTwice("2")