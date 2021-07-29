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

 export const asignCoupon = async (req:Request, res:Response): Promise<void> => {

    const email = req.body.customer_email;
    const code = req.body.code;
    const emailCoupon = await getRepository(Coupons).find({customer_email: email }); 
    const coupon = await getRepository(Coupons).findOne({code}); 
    const validation = Joi.string().email().required().validate(req.body.customer_email);
    if (validation.error){
        res.status(422).send("Invalid email")
    }
    else if (emailCoupon.length >= 1) {
        res.status(422).send("This email already has a coupon assigned")
    }  else if(coupon != null){
        coupon.customer_email = email
        await getRepository(Coupons).save(coupon)
        res.status(201).send("Coupon asigned successfully!")
    } else {
        res.status(422).send("Code not found")
    }
 }

    
 export const deleteCoupon = async (req:Request, res:Response): Promise<void> => {

    const coupon = await getRepository(Coupons).findOne(req.params.id);
    if(!coupon) {
        res.status(404).send("Invalid ID")
    }
    else if(coupon?.customer_email ) {
        res.status(404).send("Coupon already assigned. Cannot be deleted")
    } else {
        await getRepository(Coupons).delete(req.params.id);
        res.status(201).send("Coupon deleted!")
    }
 }