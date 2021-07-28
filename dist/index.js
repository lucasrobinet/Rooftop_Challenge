"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var typeorm_1 = require("typeorm");
var routes_1 = __importDefault(require("./routes/routes"));
var app = express_1.default();
//middlewares
app.use(cors_1.default());
app.use(express_1.default.json());
//routes
app.use(routes_1.default);
typeorm_1.createConnection().then(function () {
    app.listen(3000);
    console.log('Server on port', 3000);
});
