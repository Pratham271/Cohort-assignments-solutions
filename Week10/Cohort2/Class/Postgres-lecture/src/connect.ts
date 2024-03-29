import { Client } from "pg";

export async function getClient(){
    const client = new Client({
        connectionString: 'postgresql://postgres:mysecretpassword@localhost:5432/postgres?sslmode=disable'
    })
    
    await client.connect();
    return client;
}