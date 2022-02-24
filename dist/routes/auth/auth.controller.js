"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signup = exports.updateProfile = exports.profile = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const authSchema_1 = __importDefault(require("./authSchema"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
// !Datos del perfil
const profile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.params);
    const user = yield authSchema_1.default.findById(req.params.id);
    if (!user) {
        return res.status(400).json("No user found");
    }
    res.json(user);
});
exports.profile = profile;
// !Actualizar perfil
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield authSchema_1.default.findById(req.body._id);
    if (!user) {
        return res.status(400).json("usuario no encontrado o datos incorrectos");
    }
    const correctPassword = yield user.validatePassword(req.body.oldPassword);
    if (!correctPassword) {
        return res.status(400).json("invalid password");
    }
    const newPassword = new authSchema_1.default({
        password: req.body.newPassword,
    });
    newPassword.password = yield newPassword.encryptPassword(newPassword.password);
    const userUpdated = yield authSchema_1.default.findByIdAndUpdate(req.body._id, { password: newPassword.password }, {
        new: true,
    });
    console.log(newPassword);
    if (!userUpdated)
        return res.status(204).json();
    return res.json(userUpdated);
    // return res.json("lalalalalalala");
});
exports.updateProfile = updateProfile;
// !para registar usuario
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = new authSchema_1.default({
        user: req.body.user,
        password: req.body.password,
    });
    newUser.password = yield newUser.encryptPassword(newUser.password);
    const savedUser = yield newUser.save();
    // !token
    const token = jsonwebtoken_1.default.sign({ _id: savedUser._id }, `${process.env.TOKEN_SECRET}`);
    console.log(token);
    res.header("token", token).json(savedUser);
});
exports.signup = signup;
// !Para hacer login
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const user = yield authSchema_1.default.findOne({ user: req.body.user });
    if (!user) {
        return res.status(400).json("usuario no encontrado o datos incorrectos");
    }
    const correctPassword = yield user.validatePassword(req.body.password);
    if (!correctPassword) {
        return res.status(400).json("invalid password");
    }
    const token = jsonwebtoken_1.default.sign({ _id: user._id }, "insane3000", {
        expiresIn: 60 * 60 * 24 * 30,
        //     expiresIn: 60 * 60,
    });
    res.json({ token, _id: user._id });
});
exports.login = login;
