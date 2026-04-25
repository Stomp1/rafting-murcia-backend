import { Request, Response } from 'express';
import prisma from '../../config/prisma';

export const getBookings = async (req: Request, res: Response): Promise<void> => {
  try {
    const { date } = req.query;
    const filter: any = {};
    if (date) filter.date = String(date);

    const bookings = await prisma.booking.findMany({
      where: filter,
      include: {
        commercial: true,
        monitors: true,
        extraExpenses: true
      }
    });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching bookings' });
  }
};

export const createBooking = async (req: Request, res: Response): Promise<void> => {
  try {
    const { monitors, extraExpenses, ...bookingData } = req.body;

    const booking = await prisma.booking.create({
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
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating booking' });
  }
};

export const updateBooking = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { monitors, extraExpenses, commercial, ...bookingData } = req.body;

    // Delete existing relations to replace them
    if (monitors !== undefined) {
      await prisma.monitorAssignment.deleteMany({ where: { bookingId: id } });
    }
    if (extraExpenses !== undefined) {
      await prisma.extraExpense.deleteMany({ where: { bookingId: id } });
    }

    const booking = await prisma.booking.update({
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
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating booking' });
  }
};

export const deleteBooking = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await prisma.booking.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error deleting booking' });
  }
};
