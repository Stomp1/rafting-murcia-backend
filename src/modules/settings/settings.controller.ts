import { Request, Response } from 'express';
import prisma from '../../config/prisma';

export const getSettings = async (req: Request, res: Response): Promise<void> => {
  try {
    let settings = await prisma.settings.findUnique({ where: { id: 'global' } });
    if (!settings) {
      settings = await prisma.settings.create({ data: { id: 'global' } });
    }
    res.json(settings);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching settings' });
  }
};

export const updateSettings = async (req: Request, res: Response): Promise<void> => {
  try {
    const updated = await prisma.settings.upsert({
      where: { id: 'global' },
      update: req.body,
      create: { id: 'global', ...req.body }
    });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Error updating settings' });
  }
};
