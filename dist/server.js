"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var routes_1 = require("./routes");
var cors = require("cors");
require("dotenv").config();
var cors_1 = require("./middlewares/cors");
var authentication_1 = require("./middlewares/authentication");
var app = (0, express_1["default"])();
var whiteList = [
    "http://localhost:4003",
    "http://localhost:3000",
    "127.0.0.1:4003",
    "192.185.217.9",
    "http://www.triscoengenharia.com.br",
    "http://192.168.0.127:3000",
];
var corsOptions = {
    origin: function (origin, callback) {
        console.log(origin);
        if (whiteList.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        }
        else {
            return callback(new Error("Not allowed by CORS"));
        }
    }
};
app.use(cors());
app.use(cors_1.headerConfig);
app.use(authentication_1.ensureAuth);
app.use(express_1["default"].json());
app.use(routes_1.router);
app.listen(process.env.PORT || 4003, function () { return console.log("SERVER IS RUNNING ON PORT" + process.env.PORT); });
//# sourceMappingURL=server.js.map