"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMonitor = exports.updateMonitor = exports.createMonitor = exports.getMonitors = void 0;
const prisma_1 = __importDefault(require("../../config/prisma"));
const getMonitors = async (req, res) => {
    try {
        const monitors = await prisma_1.default.monitor.findMany();
        res.json(monitors);
    }
    catch (error) {
        res.status(500).json({ error: 'Error fetching monitors' });
    }
};
exports.getMonitors = getMonitors;
const createMonitor = async (req, res) => {
    try {
        const monitor = await prisma_1.default.monitor.create({ data: req.body });
        res.status(201).json(monitor);
    }
    catch (error) {
        res.status(500).json({ error: 'Error creating monitor' });
    }
};
exports.createMonitor = createMonitor;
const updateMonitor = async (req, res) => {
    try {
        const { id } = req.params;
        const monitor = await prisma_1.default.monitor.update({
            where: { id },
            data: req.body
        });
        res.json(monitor);
    }
    catch (error) {
        res.status(500).json({ error: 'Error updating monitor' });
    }
};
exports.updateMonitor = updateMonitor;
const deleteMonitor = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma_1.default.monitor.delete({ where: { id } });
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ error: 'Error deleting monitor' });
    }
};
exports.deleteMonitor = deleteMonitor;
