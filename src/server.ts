import express from "express";
import { router } from "./routes";
var cors = require("cors");
require("dotenv").config();
import { headerConfig } from "./middlewares/cors";
import { ensureAuth } from "./middlewares/authentication";

const app = express();
const whiteList = [
  "http://localhost:4003",
  "http://localhost:3000",
  "127.0.0.1:4003",
  "192.185.217.9",
  "http://www.triscoengenharia.com.br",
  "http://192.168.0.127:3000",
];

var corsOptions = {
  origin: function (origin: any, callback: any) {
    console.log(origin);
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
};
app.use(cors());
app.use(headerConfig);
app.use(ensureAuth);
app.use(express.json());
app.use(router);

app.listen(process.env.PORT || 4003, () => console.log("SERVER IS RUNNING ON PORT" + process.env.PORT));
