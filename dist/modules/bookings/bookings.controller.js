"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBooking = exports.updateBooking = exports.createBooking = exports.getBookings = void 0;
const prisma_1 = __importDefault(require("../../config/prisma"));
const getBookings = async (req, res) => {
    try {
        const { date } = req.query;
        const filter = {};
        if (date)
            filter.date = String(date);
        const bookings = await prisma_1.default.booking.findMany({
            where: filter,
            include: {
                commercial: true,
                monitors: true,
                extraExpenses: true
            }
        });
        res.json(bookings);
    }
    catch (error) {
        res.status(500).json({ error: 'Error fetching bookings' });
    }
};
exports.getBookings = getBookings;
const createBooking = async (req, res) => {
    try {
        const { monitors, extraExpenses, ...bookingData } = req.body;
        const booking = await prisma_1.default.booking.create({
            data: {
                ...bookingData,
                monitors: {
                    create: monitors || []
                },
                extraExpenses: {
                    create: extraExpenses || []
                }
            },
            include: {
                commercial: true,
                monitors: true,
                extraExpenses: true
            }
        });
        res.status(201).json(booking);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creating booking' });
    }
};
exports.createBooking = createBooking;
const updateBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const { monitors, extraExpenses, commercial, ...bookingData } = req.body;
        // Delete existing relations to replace them
        if (monitors !== undefined) {
            await prisma_1.default.monitorAssignment.deleteMany({ where: { bookingId: id } });
        }
        if (extraExpenses !== undefined) {
            await prisma_1.default.extraExpense.deleteMany({ where: { bookingId: id } });
        }
        const booking = await prisma_1.default.booking.update({
            where: { id },
            data: {
                ...bookingData,
                ...(monitors !== undefined && { monitors: { create: monitors } }),
                ...(extraExpenses !== undefined && { extraExpenses: { create: extraExpenses } })
            },
            include: {
                commercial: true,
                monitors: true,
                extraExpenses: true
            }
        });
        res.json(booking);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error updating booking' });
    }
};
exports.updateBooking = updateBooking;
const deleteBooking = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma_1.default.booking.delete({ where: { id } });
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ error: 'Error deleting booking' });
    }
};
exports.deleteBooking = deleteBooking;
