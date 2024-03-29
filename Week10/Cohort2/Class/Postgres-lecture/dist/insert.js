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
function insertUsersTable() {
    return __awaiter(this, void 0, void 0, function* () {
        const client = yield (0, connect_1.getClient)();
        try {
            const insertQuery = "INSERT INTO users (username, email, password) VALUES ($1, $2, $3 );";
            const values = ['thirdUser', 'thirduser@gmail.com', 'secretpassword'];
            const result = yield client.query(insertQuery, values);
            console.log("Insertion success: ", result);
        }
        catch (error) {
            console.error('Error during the insertion:', error);
        }
        finally {
            yield client.end();
        }
    });
}
function insertAddressesTable() {
    return __awaiter(this, void 0, void 0, function* () {
        const client = yield (0, connect_1.getClient)();
        try {
            const insertQuery = `INSERT INTO addresses (user_id, city, country, street, pincode) 
        VALUES ($1, $2, $3, $4, $5);`;
            const values = [1, 'Chicago', 'USA', '123 Thinway St', '10005'];
            const response = yield client.query(insertQuery, values);
            console.log(response);
        }
        catch (error) {
            console.error(error);
        }
        finally {
            yield client.end();
        }
    });
}
insertAddressesTable();
