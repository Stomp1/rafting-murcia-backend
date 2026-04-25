"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSettings = exports.getSettings = void 0;
const prisma_1 = __importDefault(require("../../config/prisma"));
const getSettings = async (req, res) => {
    try {
        let settings = await prisma_1.default.settings.findUnique({ where: { id: 'global' } });
        if (!settings) {
            settings = await prisma_1.default.settings.create({ data: { id: 'global' } });
        }
        res.json(settings);
    }
    catch (error) {
        res.status(500).json({ error: 'Error fetching settings' });
    }
};
exports.getSettings = getSettings;
const updateSettings = async (req, res) => {
    try {
        const updated = await prisma_1.default.settings.upsert({
            where: { id: 'global' },
            update: req.body,
            create: { id: 'global', ...req.body }
        });
        res.json(updated);
    }
    catch (error) {
        res.status(500).json({ error: 'Error updating settings' });
    }
};
exports.updateSettings = updateSettings;
