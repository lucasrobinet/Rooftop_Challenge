import {Request, Response} from 'express'
import {getRepository} from "typeorm"
import {Coupons} from '../entity/Coupons'


// Show stats from coupons like, total coupons, coupons asigned, coupons that are not asigned, coupons created in a day and coupons asigned in a day
export const totalCoupons = async (req:Request, res:Response): Promise<Response> => {
    
    let result = { 
        totalCoupons: 0,
        couponsAsigned: 0,
        couponsNotAsigned: 0,
        couponsCreatedPerDay: 0,
        couponsAsignedPerDay: 0
    };
    const count = await getRepository(Coupons).createQueryBuilder("coupon")
    .where("coupon.code IS NOT NULL")
    .getCount();

    result.totalCoupons = count

    result.couponsAsigned = await getRepository(Coupons).createQueryBuilder("coupon")
    .where("coupon.code IS NOT NULL")
    .andWhere("coupon.customer_email IS NOT NULL")
    .getCount();

    result.couponsNotAsigned = await getRepository(Coupons).createQueryBuilder("coupon")
    .where("coupon.code IS NOT NULL")
    .andWhere("coupon.customer_email IS NULL")
    .getCount();



    return res.status(200).json(result)
    
}

