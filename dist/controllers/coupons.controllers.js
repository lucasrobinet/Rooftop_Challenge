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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCoupon = exports.asignCoupon = exports.createCoupon = exports.getCoupons = void 0;
var typeorm_1 = require("typeorm");
var Coupons_1 = require("../entity/Coupons");
var joi_1 = __importDefault(require("joi"));
// Show a coupon if are asigned to an email
var getCoupons = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var code, email, coupon;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                code = req.query.code;
                email = req.query.email;
                return [4 /*yield*/, typeorm_1.getRepository(Coupons_1.Coupons).find({ code: code, customer_email: email })];
            case 1:
                coupon = _a.sent();
                if (coupon.length > 0) {
                    res.status(200).send("Email not available");
                }
                else {
                    res.status(404).send("Email available");
                }
                return [2 /*return*/];
        }
    });
}); };
exports.getCoupons = getCoupons;
// Create a new coupon
var createCoupon = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var codeCoupon, actualCoupon, newCoupon, coupon;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                codeCoupon = req.body.code;
                return [4 /*yield*/, typeorm_1.getRepository(Coupons_1.Coupons).findOne({ code: codeCoupon })];
            case 1:
                actualCoupon = _a.sent();
                if (!(codeCoupon.length != 8 || actualCoupon)) return [3 /*break*/, 2];
                res.status(422).send("Invalid coupon or coupon already created");
                return [3 /*break*/, 4];
            case 2:
                newCoupon = new Coupons_1.Coupons();
                newCoupon.code = codeCoupon;
                newCoupon.expires_at = req.body.expires_at;
                return [4 /*yield*/, typeorm_1.getRepository(Coupons_1.Coupons).save(newCoupon)];
            case 3:
                coupon = _a.sent();
                res.status(201).send("Created coupon successfully!");
                _a.label = 4;
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.createCoupon = createCoupon;
// Asign a coupon to an email
var asignCoupon = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var email, code, emailCoupon, coupon, validation;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                email = req.body.customer_email;
                code = req.body.code;
                return [4 /*yield*/, typeorm_1.getRepository(Coupons_1.Coupons).find({ customer_email: email })];
            case 1:
                emailCoupon = _a.sent();
                return [4 /*yield*/, typeorm_1.getRepository(Coupons_1.Coupons).findOne({ code: code })];
            case 2:
                coupon = _a.sent();
                validation = joi_1.default.string().email().required().validate(req.body.customer_email);
                if (!validation.error) return [3 /*break*/, 3];
                res.status(422).send("Invalid email");
                return [3 /*break*/, 7];
            case 3:
                if (!(emailCoupon.length >= 1)) return [3 /*break*/, 4];
                res.status(422).send("This email already has a coupon assigned");
                return [3 /*break*/, 7];
            case 4:
                if (!(coupon != null)) return [3 /*break*/, 6];
                coupon.customer_email = email;
                coupon.assigned_at = new Date();
                return [4 /*yield*/, typeorm_1.getRepository(Coupons_1.Coupons).save(coupon)];
            case 5:
                _a.sent();
                res.status(201).send("Coupon asigned successfully!");
                return [3 /*break*/, 7];
            case 6:
                res.status(422).send("Code not found");
                _a.label = 7;
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.asignCoupon = asignCoupon;
// Delete a coupon by id
var deleteCoupon = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var coupon;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Coupons_1.Coupons).findOne(req.params.id)];
            case 1:
                coupon = _a.sent();
                if (!coupon)
                    return [2 /*return*/, res.status(404).send("Invalid ID")];
                if (coupon === null || coupon === void 0 ? void 0 : coupon.customer_email)
                    return [2 /*return*/, res.status(404).send("Coupon already assigned. Cannot be deleted")];
                return [4 /*yield*/, typeorm_1.getRepository(Coupons_1.Coupons).delete(req.params.id)];
            case 2:
                _a.sent();
                return [2 /*return*/, res.status(201).send("Coupon deleted!")];
        }
    });
}); };
exports.deleteCoupon = deleteCoupon;
/*         coupon.customer_email = email
        await getRepository(Coupons).save(coupon)
        res.status(201).send("Coupon asigned successfully!") */ 
