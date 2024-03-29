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
const middlewares_1 = __importDefault(require("../middlewares"));
const zod_1 = __importDefault(require("zod"));
const router = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
const schema = zod_1.default.object({
    title: zod_1.default.string().min(3),
    description: zod_1.default.string().min(3)
});
router.post('/create', middlewares_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const userId = req.userId;
    try {
        const parsedData = schema.safeParse(data);
        if (!parsedData.success) {
            return res.status(411).json({
                message: "Invalid inputs"
            });
        }
        yield prisma.todo.create({
            data: {
                title: data.title,
                description: data.description,
                userId: userId
            }
        });
        res.status(201).json({
            message: "todo successfully created"
        });
    }
    catch (error) {
        res.status(500).json({
            errorMessage: error.message
        });
    }
}));
router.get('/', middlewares_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    try {
        const todos = yield prisma.todo.findMany({
            where: {
                userId: userId
            },
            select: {
                title: true,
                description: true
            }
        });
        res.status(200).json({
            todos
        });
    }
    catch (error) {
        res.status(500).json({
            errorMessage: error.message
        });
    }
}));
exports.default = router;
