import { getClient } from "./connect";

async function insertUsersTable(){
    const client = await getClient();
    try {
    const insertQuery = "INSERT INTO users (username, email, password) VALUES ($1, $2, $3 );"
    const values = ['thirdUser', 'thirduser@gmail.com','secretpassword']
    const result = await client.query(insertQuery,values);

    console.log("Insertion success: ",result);
    } catch (error) {
        console.error('Error during the insertion:', error);
    }
    finally{
        await client.end();
    }
}

async function insertAddressesTable(){
    const client = await getClient();
    try {
        const insertQuery = `INSERT INTO addresses (user_id, city, country, street, pincode) 
        VALUES ($1, $2, $3, $4, $5);`
        const values = [1, 'Chicago', 'USA', '123 Thinway St', '10005'];
        const response = await client.query(insertQuery,values);
        console.log(response)
    } catch (error) {
        console.error(error)
    }
    finally{
        await client.end()
    }
}

insertAddressesTable();