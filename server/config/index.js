"use strict";
exports.__esModule = true;
var dotenv = require("dotenv");
dotenv.config();
console.log(process.env.PORT);
var config = {
    PORT: process.env.PORT
};
exports["default"] = config;
