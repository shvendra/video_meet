"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signoutRouter = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.signoutRouter = router;
router.post('/admin/signout', (req, res) => {
    req.session = null;
    res.redirect(200, '../admin/signin');
});
