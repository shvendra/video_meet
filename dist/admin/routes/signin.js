"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signinRouter = void 0;
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = express_1.default.Router();
exports.signinRouter = router;
router.get('/admin/signin', (req, res) => {
    res.render('adminPages/signin');
});
router.post('/admin/signin', (req, res) => {
    // check if email and password match up if they do create a jwt
    // and store int in cookie
    const { email, password } = req.body;
    if ((email !== process.env.USERNAME) || (password !== process.env.PASSWORD)) {
        res.render('adminPages/signin', { error: 'Invalid credentials' });
    }
    // generate JWT
    const userJwt = jsonwebtoken_1.default.sign({
        email: email,
    }, process.env.JWT_KEY);
    // store it on session object
    req.session = {
        jwt: userJwt,
    };
    res.redirect('../admin/stream');
});
