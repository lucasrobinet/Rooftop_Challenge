import { Router } from "express";
const router = Router();

import {getCoupons, createCoupon} 
from "../controllers/coupons.controllers";

import { getStores,  } from "../controllers/stores.controllers"

// recurso Cupones
router.get("/coupons", getCoupons);

router.post("/coupons", createCoupon);

//router.patch("/coupons", asignCoupon);

/*
router.delete("/coupons/:code", ); */



router.get("/stores", getStores);

/*router.post("/stores", );

router.delete("/stores", );


// recurso Stats
router.get("/stats", );*/


export default router;