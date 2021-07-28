import { Router } from "express";
const router = Router();

import {getCoupons} from "../controllers/coupons.controllers";

// recurso Cupones
router.get("/coupons", getCoupons);

/*router.post("/coupons/:code", );

router.patch("/coupons", );

router.delete("/coupons/:code", );


// recurso Tiendas
router.get("/stores", );

router.post("/stores", );

router.delete("/stores", );


// recurso Stats
router.get("/stats", );*/


export default router;