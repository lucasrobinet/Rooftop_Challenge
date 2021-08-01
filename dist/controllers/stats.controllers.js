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
exports.totalCoupons = void 0;
var typeorm_1 = require("typeorm");
var Coupons_1 = require("../entity/Coupons");
var typeorm_2 = require("typeorm");
// Show stats from coupons like, total coupons, coupons asigned, coupons that are not asigned, coupons created in a day and coupons asigned in a day
var totalCoupons = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, _a, _b, _c, _d, _e;
    return __generator(this, function (_f) {
        switch (_f.label) {
            case 0:
                result = {
                    totalCoupons: 0,
                    couponsAsigned: 0,
                    couponsNotAsigned: 0,
                    couponsCreatedPerDay: 0,
                    couponsAsignedPerDay: 0
                };
                _a = result;
                return [4 /*yield*/, typeorm_1.getRepository(Coupons_1.Coupons).createQueryBuilder("coupon")
                        .where("coupon.code IS NOT NULL")
                        .getCount()];
            case 1:
                _a.totalCoupons = _f.sent();
                _b = result;
                return [4 /*yield*/, typeorm_1.getRepository(Coupons_1.Coupons).createQueryBuilder("coupon")
                        .where("coupon.code IS NOT NULL")
                        .andWhere("coupon.customer_email IS NOT NULL")
                        .getCount()];
            case 2:
                _b.couponsAsigned = _f.sent();
                _c = result;
                return [4 /*yield*/, typeorm_1.getRepository(Coupons_1.Coupons).createQueryBuilder("coupon")
                        .where("coupon.code IS NOT NULL")
                        .andWhere("coupon.customer_email IS NULL")
                        .getCount()];
            case 3:
                _c.couponsNotAsigned = _f.sent();
                _d = result;
                return [4 /*yield*/, typeorm_2.getManager()
                        .query("SELECT SUM(1) total, to_char(DATE(assigned_at), 'DD-MM-YYYY') assigned_at FROM coupons WHERE assigned_at IS NOT NULL  GROUP BY date(assigned_at) ORDER BY DATE(assigned_at) DESC LIMIT 31;")];
            case 4:
                _d.couponsAsignedPerDay = _f.sent();
                _e = result;
                return [4 /*yield*/, typeorm_2.getManager()
                        .query("SELECT SUM(1) total, to_char(DATE(created_at), 'DD-MM-YYYY') created_at FROM coupons WHERE created_at IS NOT NULL  GROUP BY date(created_at) ORDER BY DATE(created_at) DESC LIMIT 31;")];
            case 5:
                _e.couponsCreatedPerDay = _f.sent();
                return [2 /*return*/, res.status(200).json(result)];
        }
    });
}); };
exports.totalCoupons = totalCoupons;
