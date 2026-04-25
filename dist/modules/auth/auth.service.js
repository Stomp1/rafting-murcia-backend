"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const client_1 = require("@prisma/client");
const password_1 = require("../../utils/password");
const jwt_1 = require("../../utils/jwt");
const prisma = new client_1.PrismaClient();
class AuthService {
    static async register(data) {
        const existingUser = await prisma.user.findUnique({
            where: { email: data.email },
        });
        if (existingUser) {
            const error = new Error('Email is already in use');
            error.statusCode = 400;
            throw error;
        }
        const hashedPassword = await (0, password_1.hashPassword)(data.password);
        const user = await prisma.user.create({
            data: {
                email: data.email,
                password: hashedPassword,
                name: data.name || data.email.split('@')[0],
                // Role defaults to USER
            },
            select: { id: true, email: true, role: true, createdAt: true },
        });
        const token = (0, jwt_1.generateToken)({ userId: user.id, role: user.role });
        return { user, token };
    }
    static async login(data) {
        const user = await prisma.user.findUnique({
            where: { email: data.email },
        });
        if (!user) {
            const error = new Error('Invalid credentials');
            error.statusCode = 401;
            throw error;
        }
        const isMatch = await (0, password_1.comparePasswords)(data.password, user.password);
        if (!isMatch) {
            const error = new Error('Invalid credentials');
            error.statusCode = 401;
            throw error;
        }
        const token = (0, jwt_1.generateToken)({ userId: user.id, role: user.role });
        const { password, ...userWithoutPassword } = user;
        return { user: userWithoutPassword, token };
    }
}
exports.AuthService = AuthService;
