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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.DeleteUsuarioController = exports.UpdateUsuarioController = exports.VerifyUsuarioController = exports.LoginUsuarioController = exports.CreateUsuarioController = void 0;
var prismaClient_1 = require("../database/prismaClient");
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var CreateUsuarioController = /** @class */ (function () {
    function CreateUsuarioController() {
    }
    CreateUsuarioController.prototype.handle = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            var _this = this;
            return __generator(this, function (_a) {
                data = req.body;
                bcryptjs_1["default"].genSalt(10, function (err, salt) {
                    if (err)
                        res.status(401).end();
                    bcryptjs_1["default"].hash(data.senha, salt, function (err, hash) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (err)
                                        return [2 /*return*/, res.status(401).end()];
                                    return [4 /*yield*/, prismaClient_1.prismaClient.usuarios.create({
                                            data: {
                                                usuario: data.usuario,
                                                nomeUsuario: data.nomeUsuario,
                                                email: data.email,
                                                senhaUsuario: hash
                                            }
                                        })];
                                case 1:
                                    _a.sent();
                                    res.status(201).send(true);
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                });
                return [2 /*return*/];
            });
        });
    };
    return CreateUsuarioController;
}());
exports.CreateUsuarioController = CreateUsuarioController;
var LoginUsuarioController = /** @class */ (function () {
    function LoginUsuarioController() {
    }
    LoginUsuarioController.prototype.handle = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var loginData, _a, senhaUsuario, user;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        loginData = req.body;
                        if (!loginData.senha || !loginData.usuario || loginData.senha === null) {
                            return [2 /*return*/, res.status(400).send(false)];
                        }
                        return [4 /*yield*/, prismaClient_1.prismaClient.usuarios.findUnique({
                                where: { usuario: loginData.usuario }
                            })];
                    case 1:
                        _a = _b.sent(), senhaUsuario = _a.senhaUsuario, user = __rest(_a, ["senhaUsuario"]);
                        bcryptjs_1["default"].compare(loginData.senha, senhaUsuario, function (err, next) { return __awaiter(_this, void 0, void 0, function () {
                            var sauce, token, resposta;
                            return __generator(this, function (_a) {
                                if (!next)
                                    return [2 /*return*/, res.status(401).send({ logged: false, data: null })];
                                sauce = process.env.saucePassword;
                                token = jsonwebtoken_1["default"].sign({ logged: true, data: user }, sauce, {
                                    expiresIn: 30000
                                });
                                resposta = jsonwebtoken_1["default"].decode(token);
                                res.status(200).json({ token: token, data: resposta });
                                return [2 /*return*/];
                            });
                        }); });
                        return [2 /*return*/];
                }
            });
        });
    };
    return LoginUsuarioController;
}());
exports.LoginUsuarioController = LoginUsuarioController;
var VerifyUsuarioController = /** @class */ (function () {
    function VerifyUsuarioController() {
    }
    VerifyUsuarioController.prototype.handle = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var token, sauce;
            return __generator(this, function (_a) {
                token = req.headers.authorization;
                sauce = process.env.saucePassword;
                jsonwebtoken_1["default"].verify(token, sauce, function (err, result) {
                    if (err) {
                        return res.status(400).send(err);
                    }
                    else {
                        var data = jsonwebtoken_1["default"].decode(token);
                        return res.status(200).json({ data: data, token: token });
                    }
                });
                return [2 /*return*/];
            });
        });
    };
    return VerifyUsuarioController;
}());
exports.VerifyUsuarioController = VerifyUsuarioController;
var UpdateUsuarioController = /** @class */ (function () {
    function UpdateUsuarioController() {
    }
    UpdateUsuarioController.prototype.handle = function (req, res) {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    return UpdateUsuarioController;
}());
exports.UpdateUsuarioController = UpdateUsuarioController;
var DeleteUsuarioController = /** @class */ (function () {
    function DeleteUsuarioController() {
    }
    DeleteUsuarioController.prototype.handle = function (req, res) {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    return DeleteUsuarioController;
}());
exports.DeleteUsuarioController = DeleteUsuarioController;
//# sourceMappingURL=UsuarioController.js.map