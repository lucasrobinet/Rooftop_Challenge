"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = express_1.Router();
var coupons_controllers_1 = require("../controllers/coupons.controllers");
var stores_controllers_1 = require("../controllers/stores.controllers");
var stats_controllers_1 = require("../controllers/stats.controllers");
// Coupons
router.get("/coupons2", coupons_controllers_1.getCoupons2);
router.get("/coupons", coupons_controllers_1.getCoupons);
router.post("/coupons", coupons_controllers_1.createCoupon);
router.patch("/coupons", coupons_controllers_1.asignCoupon);
router.delete("/coupons/:id", coupons_controllers_1.deleteCoupon);
// Stores
router.get("/stores", stores_controllers_1.getStores);
router.post("/stores", stores_controllers_1.newStore);
router.delete("/stores/:id", stores_controllers_1.deleteStore);
// Stats
router.get("/stats", stats_controllers_1.totalCoupons);
exports.default = router;
