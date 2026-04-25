import { PrismaClient } from '@prisma/client';
import { hashPassword, comparePasswords } from '../../utils/password';
import { generateToken } from '../../utils/jwt';

const prisma = new PrismaClient();

export class AuthService {
  static async register(data: any) {
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      const error: any = new Error('Email is already in use');
      error.statusCode = 400;
      throw error;
    }

    const hashedPassword = await hashPassword(data.password);

    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        name: data.name || data.email.split('@')[0],
        // Role defaults to USER
      },
      select: { id: true, email: true, role: true, createdAt: true },
    });

    const token = generateToken({ userId: user.id, role: user.role });

    return { user, token };
  }

  static async login(data: any) {
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      const error: any = new Error('Invalid credentials');
      error.statusCode = 401;
      throw error;
    }

    const isMatch = await comparePasswords(data.password, user.password);

    if (!isMatch) {
      const error: any = new Error('Invalid credentials');
      error.statusCode = 401;
      throw error;
    }

    const token = generateToken({ userId: user.id, role: user.role });

    const { password, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, token };
  }
}
