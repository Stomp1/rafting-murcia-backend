import { Request, Response } from 'express';
import prisma from '../../config/prisma';

export const getMonitors = async (req: Request, res: Response): Promise<void> => {
  try {
    const monitors = await prisma.monitor.findMany();
    res.json(monitors);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching monitors' });
  }
};

export const createMonitor = async (req: Request, res: Response): Promise<void> => {
  try {
    const monitor = await prisma.monitor.create({ data: req.body });
    res.status(201).json(monitor);
  } catch (error) {
    res.status(500).json({ error: 'Error creating monitor' });
  }
};

export const updateMonitor = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const monitor = await prisma.monitor.update({
      where: { id },
      data: req.body
    });
    res.json(monitor);
  } catch (error) {
    res.status(500).json({ error: 'Error updating monitor' });
  }
};

export const deleteMonitor = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await prisma.monitor.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error deleting monitor' });
  }
};
