import { Router } from "express";
const router = Router();

import {getCoupons, createCoupon, asignCoupon, deleteCoupon} from "../controllers/coupons.controllers";

import { getStores, newStore, deleteStore } from "../controllers/stores.controllers"

import {totalCoupons, } from "../controllers/stats.controllers"

// recurso Coupons
router.get("/coupons", getCoupons);

router.post("/coupons", createCoupon);

router.patch("/coupons", asignCoupon);

router.delete("/coupons/:id", deleteCoupon);


// recurso Stores
router.get("/stores", getStores);

router.post("/stores", newStore );

router.delete("/stores/:id", deleteStore);


// recurso Stats
router.get("/stats", totalCoupons);


export default router;