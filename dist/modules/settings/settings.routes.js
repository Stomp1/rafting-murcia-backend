"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const settings_controller_1 = require("./settings.controller");
const authMiddleware_1 = require("../../middlewares/authMiddleware");
const router = (0, express_1.Router)();
// Protect all settings routes
router.use(authMiddleware_1.authenticate);
router.get('/', settings_controller_1.getSettings);
router.put('/', settings_controller_1.updateSettings);
exports.default = router;
