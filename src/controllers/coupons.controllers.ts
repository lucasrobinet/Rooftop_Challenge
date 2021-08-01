import {Request, Response} from 'express'
import {Code, createQueryBuilder, getRepository, Timestamp, getConnection} from "typeorm"
import {Coupons} from '../entity/Coupons'
import Joi from 'joi';
import faker from 'faker'



// Show a coupon if are asigned to an email
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


// Create a new coupon
export const createCoupon = async (req:Request, res:Response): Promise<void> => {

    let codeCoupon = req.body.code;
    const actualCoupon = await getRepository(Coupons).findOne({code: codeCoupon})
    if (codeCoupon.length != 8 || actualCoupon) {
        res.status(422).send("Invalid coupon or coupon already created")
    } else {
        const newCoupon = new Coupons()
        newCoupon.code =  codeCoupon
        newCoupon.expires_at = req.body.expires_at
        let coupon = await getRepository(Coupons).save(newCoupon)
        res.status(201).send("Created coupon successfully!")
    }

 }


// Asign a coupon to an email
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
        coupon.assigned_at = new Date()
        await getRepository(Coupons).save(coupon)
        res.status(201).send("Coupon asigned successfully!")
    } else {
        res.status(422).send("Code not found")
    }
 }


// Delete a coupon by id
 export const deleteCoupon = async (req:Request, res:Response): Promise<Response> => {

    const coupon = await getRepository(Coupons).findOne(req.params.id);

    if(!coupon)  return res.status(404).send("Invalid ID");

    if(coupon?.customer_email )  return res.status(404).send("Coupon already assigned. Cannot be deleted");

    await getRepository(Coupons).delete(req.params.id);
    return res.status(201).send("Coupon deleted!");

}
