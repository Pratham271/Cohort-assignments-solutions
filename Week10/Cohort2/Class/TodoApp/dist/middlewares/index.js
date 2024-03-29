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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma = new client_1.PrismaClient();
function authMiddleware(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = req.headers.authorization;
        try {
            const words = token.split(" ")[1];
            const verified = jsonwebtoken_1.default.verify(words, "secret");
            if (!verified) {
                return res.status(411).json({
                    message: "Invalid token"
                });
            }
            const user = yield prisma.user.findUnique({
                where: {
                    id: verified.id
                }
            });
            if (!user) {
                return res.status(403).json({
                    message: "user not found"
                });
            }
            req.userId = user.id;
            next();
        }
        catch (error) {
            res.status(500).json({
                errorMessage: error.message
            });
        }
    });
}
exports.default = authMiddleware;
