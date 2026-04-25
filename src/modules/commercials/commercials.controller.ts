import { Request, Response } from 'express';
import prisma from '../../config/prisma';

export const getCommercials = async (req: Request, res: Response): Promise<void> => {
  try {
    const commercials = await prisma.commercial.findMany();
    res.json(commercials);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching commercials' });
  }
};

export const createCommercial = async (req: Request, res: Response): Promise<void> => {
  try {
    const commercial = await prisma.commercial.create({ data: req.body });
    res.status(201).json(commercial);
  } catch (error) {
    res.status(500).json({ error: 'Error creating commercial' });
  }
};

export const updateCommercial = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const commercial = await prisma.commercial.update({
      where: { id },
      data: req.body
    });
    res.json(commercial);
  } catch (error) {
    res.status(500).json({ error: 'Error updating commercial' });
  }
};

export const deleteCommercial = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await prisma.commercial.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error deleting commercial' });
  }
};
