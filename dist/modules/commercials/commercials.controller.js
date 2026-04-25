"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCommercial = exports.updateCommercial = exports.createCommercial = exports.getCommercials = void 0;
const prisma_1 = __importDefault(require("../../config/prisma"));
const getCommercials = async (req, res) => {
    try {
        const commercials = await prisma_1.default.commercial.findMany();
        res.json(commercials);
    }
    catch (error) {
        res.status(500).json({ error: 'Error fetching commercials' });
    }
};
exports.getCommercials = getCommercials;
const createCommercial = async (req, res) => {
    try {
        const commercial = await prisma_1.default.commercial.create({ data: req.body });
        res.status(201).json(commercial);
    }
    catch (error) {
        res.status(500).json({ error: 'Error creating commercial' });
    }
};
exports.createCommercial = createCommercial;
const updateCommercial = async (req, res) => {
    try {
        const { id } = req.params;
        const commercial = await prisma_1.default.commercial.update({
            where: { id },
            data: req.body
        });
        res.json(commercial);
    }
    catch (error) {
        res.status(500).json({ error: 'Error updating commercial' });
    }
};
exports.updateCommercial = updateCommercial;
const deleteCommercial = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma_1.default.commercial.delete({ where: { id } });
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ error: 'Error deleting commercial' });
    }
};
exports.deleteCommercial = deleteCommercial;
