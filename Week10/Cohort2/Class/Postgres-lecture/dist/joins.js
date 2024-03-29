"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const connect_1 = require("./connect");
function fetchDataTwice(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = yield (0, connect_1.getClient)();
        try {
            const userQuery = `SELECT u.id, u.username, u.email, u.password 
        FROM users u WHERE id=$1;`;
            const userDetails = yield client.query(userQuery, [userId]);
            const addressQuery = `SELECT a.city, a.country, a.street, a.pincode
        FROM addresses a WHERE user_id=$1;`;
            const addressDetails = yield client.query(addressQuery, [userId]);
            if (userDetails.rows.length > 0) {
                console.log("users: ", userDetails.rows[0]);
                console.log("addresses: ", addressDetails.rows[0]);
            }
            else {
                console.log("Nothing found");
            }
        }
        catch (error) {
            console.error(error);
        }
        finally {
            client.end();
        }
    });
}
// better approach
function joinTable(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = yield (0, connect_1.getClient)();
        try {
            const joinQuery = `SELECT u.id, u.username, u.email, u.password, a.city, a.country, a.street, a.pincode
        FROM users u LEFT JOIN addresses a ON u.id=a.user_id
        WHERE u.id=$1;`;
            const response = yield client.query(joinQuery, [userId]);
            if (response.rows.length > 0) {
                console.log("Final output: ", response.rows[0]);
            }
            else {
                console.log("Not found");
            }
        }
        catch (error) {
            console.error(error);
        }
        finally {
            client.end();
        }
    });
}
joinTable("1");
// fetchDataTwice("2")
