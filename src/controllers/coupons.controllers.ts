import {Request, Response} from 'express'
import { send } from 'process';
import {Code, getRepository} from "typeorm"
import {Coupons} from '../entity/Coupons'
import Joi from 'joi';

export const getCoupons = async (req:Request, res: Response): Promise<void> => {

    const code:string = (req.query.code as string);
    const email:string = (req.query.email as string); 
    const coupon = await getRepository(Coupons).find({code , customer_email: email });  
    if(coupon.length > 0 ) {
        res.status(200).send("Email not available")
    } else {
        res.status(404).send("Email available")
    }
};

export const createCoupon = async (req:Request, res:Response): Promise<void> => {

    let codeCoupon = req.body.code;
    if (codeCoupon.length != 8) {
        res.status(422).send("Invalid code")
    } else {
        const newCoupon = new Coupons()
        newCoupon.code =  codeCoupon
        newCoupon.expires_at = req.body.expires_at
        let coupon = await getRepository(Coupons).save(newCoupon)
        res.status(201).send("Created coupon successfully!")
    }

 }


    