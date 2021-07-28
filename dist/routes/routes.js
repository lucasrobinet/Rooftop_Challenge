"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = express_1.Router();
var coupons_controllers_1 = require("../controllers/coupons.controllers");
// recurso Cupones
router.get("/coupons", coupons_controllers_1.getCoupons);
/*router.post("/coupons/:code", );

router.patch("/coupons", );

router.delete("/coupons/:code", );


// recurso Tiendas
router.get("/stores", );

router.post("/stores", );

router.delete("/stores", );


// recurso Stats
router.get("/stats", );*/
exports.default = router;
