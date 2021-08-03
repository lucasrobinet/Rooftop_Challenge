import { Router } from "express";
const router = Router();

import {getCoupons, createCoupon, asignCoupon, deleteCoupon, getCoupons2} from "../controllers/coupons.controllers";

import { getStores, newStore, deleteStore } from "../controllers/stores.controllers"

import {totalCoupons } from "../controllers/stats.controllers"


// Coupons
router.get("/coupons2", getCoupons2)

router.get("/coupons", getCoupons);

router.post("/coupons", createCoupon);

router.patch("/coupons", asignCoupon);

router.delete("/coupons/:id", deleteCoupon);


// Stores
router.get("/stores", getStores);

router.post("/stores", newStore );

router.delete("/stores/:id", deleteStore);


// Stats
router.get("/stats", totalCoupons);


export default router;