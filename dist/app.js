"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const errorHandler_1 = require("./middlewares/errorHandler");
const swagger_1 = require("./config/swagger");
const auth_routes_1 = __importDefault(require("./modules/auth/auth.routes"));
const users_routes_1 = __importDefault(require("./modules/users/users.routes"));
const settings_routes_1 = __importDefault(require("./modules/settings/settings.routes"));
const commercials_routes_1 = __importDefault(require("./modules/commercials/commercials.routes"));
const monitors_routes_1 = __importDefault(require("./modules/monitors/monitors.routes"));
const buses_routes_1 = __importDefault(require("./modules/buses/buses.routes"));
const bookings_routes_1 = __importDefault(require("./modules/bookings/bookings.routes"));
const app = (0, express_1.default)();
// Middlewares
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Swagger Setup
(0, swagger_1.setupSwagger)(app);
// Routes
app.use('/api/auth', auth_routes_1.default);
app.use('/api/users', users_routes_1.default);
app.use('/api/settings', settings_routes_1.default);
app.use('/api/commercials', commercials_routes_1.default);
app.use('/api/monitors', monitors_routes_1.default);
app.use('/api/buses', buses_routes_1.default);
app.use('/api/bookings', bookings_routes_1.default);
// Health check
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});
// Error handling middleware
app.use(errorHandler_1.errorHandler);
exports.default = app;
