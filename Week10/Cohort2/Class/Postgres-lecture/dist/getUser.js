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
function getUser(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = yield (0, connect_1.getClient)();
        try {
            const findQuery = "SELECT * FROM users WHERE email = $1;";
            const result = yield client.query(findQuery, [email]);
            if (result.rows.length > 0) {
                console.log("user found", result.rows[0]);
                // return result.rows[0];
            }
            else {
                console.log("No user found with this email");
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
getUser("second1user@gmail.com");
