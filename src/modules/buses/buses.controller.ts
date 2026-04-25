import { Request, Response } from 'express';
import prisma from '../../config/prisma';

export const getBuses = async (req: Request, res: Response): Promise<void> => {
  try {
    const { date, shift } = req.query;
    const filter: any = {};
    if (date) filter.date = String(date);
    if (shift) filter.shift = String(shift);

    const buses = await prisma.shiftBuses.findMany({ where: filter });
    res.json(buses);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching buses' });
  }
};

export const updateBuses = async (req: Request, res: Response): Promise<void> => {
  try {
    const { date, shift } = req.body;
    if (!date || !shift) {
      res.status(400).json({ error: 'Date and shift are required' });
      return;
    }

    const buses = await prisma.shiftBuses.upsert({
      where: {
        date_shift: { date, shift }
      },
      update: req.body,
      create: req.body
    });
    res.json(buses);
  } catch (error) {
    res.status(500).json({ error: 'Error updating buses' });
  }
};
