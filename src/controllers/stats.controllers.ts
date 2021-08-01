import {Request, Response} from 'express'
import {getRepository} from "typeorm"
import {Coupons} from '../entity/Coupons'
import { getManager } from 'typeorm';


// Show stats from coupons like, total coupons, coupons asigned, coupons that are not asigned, coupons created in a day and coupons asigned in a day
export const totalCoupons = async (req:Request, res:Response): Promise<Response> => {
    
    let result = { 
        totalCoupons: 0,
        couponsAsigned: 0,
        couponsNotAsigned: 0,
        couponsCreatedPerDay: 0,
        couponsAsignedPerDay: 0
    };
    

    result.totalCoupons = await getRepository(Coupons).createQueryBuilder("coupon")
    .where("coupon.code IS NOT NULL")
    .getCount();

    result.couponsAsigned = await getRepository(Coupons).createQueryBuilder("coupon")
    .where("coupon.code IS NOT NULL")
    .andWhere("coupon.customer_email IS NOT NULL")
    .getCount();

    result.couponsNotAsigned = await getRepository(Coupons).createQueryBuilder("coupon")
    .where("coupon.code IS NOT NULL")
    .andWhere("coupon.customer_email IS NULL")
    .getCount();

    result.couponsAsignedPerDay = await getManager()
    .query("SELECT SUM(1) total, to_char(DATE(assigned_at), 'DD-MM-YYYY') assigned_at FROM coupons WHERE assigned_at IS NOT NULL  GROUP BY date(assigned_at) ORDER BY DATE(assigned_at) DESC LIMIT 31;");
    
    result.couponsCreatedPerDay = await getManager()
    .query("SELECT SUM(1) total, to_char(DATE(created_at), 'DD-MM-YYYY') created_at FROM coupons WHERE created_at IS NOT NULL  GROUP BY date(created_at) ORDER BY DATE(created_at) DESC LIMIT 31;")
    

    return res.status(200).json(result)
    
}