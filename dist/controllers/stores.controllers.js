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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStore = exports.newStore = exports.getStores = void 0;
var typeorm_1 = require("typeorm");
var Stores_1 = require("../entity/Stores");
var typeorm_2 = require("typeorm");
// Show a list of 10 stores. Search by name allowed using "name" instead of "page" 
var getStores = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var name, where, page, limit, total, stores;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                name = req.query.name;
                where = {};
                if (name != null) {
                    where.name = typeorm_2.ILike(name + "%");
                }
                page = (parseInt(req.query.page) || 1);
                limit = 10;
                return [4 /*yield*/, typeorm_1.getRepository(Stores_1.Stores).count()];
            case 1:
                total = _a.sent();
                return [4 /*yield*/, typeorm_1.getRepository(Stores_1.Stores).find({
                        where: where,
                        skip: (page - 1) * limit,
                        take: limit
                    })];
            case 2:
                stores = _a.sent();
                res.status(200).json({ total: total, stores: stores });
                return [2 /*return*/];
        }
    });
}); };
exports.getStores = getStores;
// Create a new store
var newStore = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var name, address, stores;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                name = req.body.name;
                address = req.body.address;
                return [4 /*yield*/, typeorm_1.getRepository(Stores_1.Stores).findOne({ name: name, address: address })];
            case 1:
                stores = _a.sent();
                if (name.length <= 0 || address.length <= 0)
                    return [2 /*return*/, res.status(404).send("Invalid Name or Addres")];
                if (stores)
                    return [2 /*return*/, res.status(404).send("Store existent")];
                return [4 /*yield*/, typeorm_1.getRepository(Stores_1.Stores).save(req.body)];
            case 2:
                _a.sent();
                return [2 /*return*/, res.status(201).send("Store created successfully!")];
        }
    });
}); };
exports.newStore = newStore;
// Delete a store
var deleteStore = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var store;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Stores_1.Stores).findOne(req.params.id)];
            case 1:
                store = _a.sent();
                if (!store)
                    return [2 /*return*/, res.status(404).send("Invalid ID")];
                return [4 /*yield*/, typeorm_1.getRepository(Stores_1.Stores).delete(req.params.id)];
            case 2:
                _a.sent();
                return [2 /*return*/, res.status(200).send("Store deleted!")];
        }
    });
}); };
exports.deleteStore = deleteStore;
