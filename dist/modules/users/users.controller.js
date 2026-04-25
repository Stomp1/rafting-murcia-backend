"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const users_service_1 = require("./users.service");
class UsersController {
    static async getAll(req, res, next) {
        try {
            const users = await users_service_1.UsersService.getAllUsers();
            res.status(200).json({ success: true, data: users });
        }
        catch (error) {
            next(error);
        }
    }
    static async getById(req, res, next) {
        try {
            const { id } = req.params;
            const user = await users_service_1.UsersService.getUserById(id);
            res.status(200).json({ success: true, data: user });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.UsersController = UsersController;
