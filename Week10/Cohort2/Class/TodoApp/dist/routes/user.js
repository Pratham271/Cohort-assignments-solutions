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
const express_1 = require("express");
const zod_1 = __importDefault(require("zod"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma = new client_1.PrismaClient();
const router = (0, express_1.Router)();
const schema = zod_1.default.object({
    username: zod_1.default.string().email(),
    password: zod_1.default.string()
});
router.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    try {
        const parsedData = schema.safeParse(data);
        if (!parsedData.success) {
            return res.status(411).json({
                message: "wrong inputs"
            });
        }
        const user = yield prisma.user.findUnique({
            where: {
                username: data.username
            }
        });
        if (user) {
            return res.status(403).json({
                message: "user exists"
            });
        }
        yield prisma.user.create({
            data: {
                username: data.username,
                password: data.password
            }
        });
        res.status(201).json({
            message: "user created successfully"
        });
    }
    catch (error) {
        res.status(500).json({
            errorMessage: error.message
        });
    }
}));
router.post('/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    try {
        const parsedData = schema.safeParse(data);
        if (!parsedData.success) {
            return res.status(411).json({
                message: "wrong inputs"
            });
        }
        const user = yield prisma.user.findUnique({
            where: {
                username: data.username,
            }
        });
        if (!user) {
            return res.status(403).json({
                message: "user does not exists"
            });
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id }, "secret");
        res.status(200).json({
            token: token
        });
    }
    catch (error) {
        res.status(500).json({
            errorMessage: error.message
        });
    }
}));
router.get('/allusers', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield prisma.user.findMany({});
    res.status(200).json({
        users
    });
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.params.id);
    try {
        const user = yield prisma.user.findUnique({
            where: {
                id: userId
            }
        });
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        res.status(200).json({
            user
        });
    }
    catch (error) {
        res.status(500).json({
            errorMessage: error.message
        });
    }
}));
exports.default = router;
