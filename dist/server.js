"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const env_1 = require("./config/env");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const startServer = async () => {
    try {
        // Check DB connection
        await prisma.$connect();
        console.log('✅ Database connected successfully');
        app_1.default.listen(env_1.env.PORT, () => {
            console.log(`🚀 Server running in ${env_1.env.NODE_ENV} mode on port ${env_1.env.PORT}`);
            console.log(`📘 Docs available at http://localhost:${env_1.env.PORT}/api-docs`);
        });
    }
    catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
};
startServer();
