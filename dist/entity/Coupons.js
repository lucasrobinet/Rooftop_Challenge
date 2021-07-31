"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Coupons = void 0;
var typeorm_1 = require("typeorm");
var Coupons = /** @class */ (function () {
    function Coupons() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Coupons.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Coupons.prototype, "code", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Coupons.prototype, "expires_at", void 0);
    __decorate([
        typeorm_1.Column({ type: "time without time zone" }),
        __metadata("design:type", Date)
    ], Coupons.prototype, "assigned_at", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Coupons.prototype, "customer_email", void 0);
    Coupons = __decorate([
        typeorm_1.Entity()
    ], Coupons);
    return Coupons;
}());
exports.Coupons = Coupons;
