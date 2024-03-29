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
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient({ log: ['info', 'query'], });
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield prisma.user.findMany({});
        console.log(users);
        const user = yield prisma.user.findUnique({
            where: {
                id: 1
            },
            include: {
                posts: true
            }
        });
        console.log(user);
    });
}
main()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log("user found");
    prisma.$disconnect();
}))
    .catch((e) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(e);
    prisma.$disconnect();
    process.exit(1);
}));
