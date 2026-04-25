import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { errorHandler } from './middlewares/errorHandler';
import { setupSwagger } from './config/swagger';

import authRoutes from './modules/auth/auth.routes';
import usersRoutes from './modules/users/users.routes';
import settingsRoutes from './modules/settings/settings.routes';
import commercialsRoutes from './modules/commercials/commercials.routes';
import monitorsRoutes from './modules/monitors/monitors.routes';
import busesRoutes from './modules/buses/buses.routes';
import bookingsRoutes from './modules/bookings/bookings.routes';

const app = express();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger Setup
setupSwagger(app);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/commercials', commercialsRoutes);
app.use('/api/monitors', monitorsRoutes);
app.use('/api/buses', busesRoutes);
app.use('/api/bookings', bookingsRoutes);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use(errorHandler);

export default app;
