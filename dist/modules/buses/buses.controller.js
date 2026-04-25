"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBuses = exports.getBuses = void 0;
const prisma_1 = __importDefault(require("../../config/prisma"));
const getBuses = async (req, res) => {
    try {
        const { date, shift } = req.query;
        const filter = {};
        if (date)
            filter.date = String(date);
        if (shift)
            filter.shift = String(shift);
        const buses = await prisma_1.default.shiftBuses.findMany({ where: filter });
        res.json(buses);
    }
    catch (error) {
        res.status(500).json({ error: 'Error fetching buses' });
    }
};
exports.getBuses = getBuses;
const updateBuses = async (req, res) => {
    try {
        const { date, shift } = req.body;
        if (!date || !shift) {
            res.status(400).json({ error: 'Date and shift are required' });
            return;
        }
        const buses = await prisma_1.default.shiftBuses.upsert({
            where: {
                date_shift: { date, shift }
            },
            update: req.body,
            create: req.body
        });
        res.json(buses);
    }
    catch (error) {
        res.status(500).json({ error: 'Error updating buses' });
    }
};
exports.updateBuses = updateBuses;
