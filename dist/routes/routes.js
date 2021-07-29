"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = express_1.Router();
var coupons_controllers_1 = require("../controllers/coupons.controllers");
var stores_controllers_1 = require("../controllers/stores.controllers");
// recurso Cupones
router.get("/coupons", coupons_controllers_1.getCoupons);
router.post("/coupons", coupons_controllers_1.createCoupon);
//router.patch("/coupons", asignCoupon);
/*
router.delete("/coupons/:code", ); */
router.get("/stores", stores_controllers_1.getStores);
/*router.post("/stores", );

router.delete("/stores", );


// recurso Stats
router.get("/stats", );*/
exports.default = router;
