"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const password_1 = require("../src/utils/password");
const prisma = new client_1.PrismaClient();
async function main() {
    const adminEmail = 'admin@example.com';
    const existingAdmin = await prisma.user.findUnique({
        where: { email: adminEmail }
    });
    if (!existingAdmin) {
        const hashedPassword = await (0, password_1.hashPassword)('Admin123!');
        await prisma.user.create({
            data: {
                name: 'Administrador Principal',
                email: adminEmail,
                password: hashedPassword,
                role: 'admin',
                permissions: {
                    create: {
                        canAddBookings: true,
                        canEditBookings: true,
                        canDeleteBookings: true,
                        canAddExpenses: true,
                        canAssignMonitors: true,
                        canViewRevenueSummary: true,
                        canViewOtherBookings: true,
                        canEditBuses: true,
                        canClosePrices: true,
                        canEditPastDays: true,
                        canManageCommercials: true,
                        canViewOperations: true
                    }
                }
            }
        });
        console.log('✅ Default admin user created (admin@example.com / Admin123!)');
    }
    else {
        console.log('ℹ️ Admin user already exists.');
    }
}
main()
    .catch(e => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
