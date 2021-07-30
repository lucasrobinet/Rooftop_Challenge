import {Request, Response} from 'express'
import {getRepository} from "typeorm"
import {Coupons} from '../entity/Coupons'

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


