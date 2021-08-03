import {Request, Response} from 'express'
import {Code, createQueryBuilder, getRepository, Timestamp, getConnection} from "typeorm"
import {Coupons} from '../entity/Coupons'
import Joi from 'joi';



// Show if a coupon are asigned to an email and show the email (ONLY CODE REQUIRED)
export const getCoupons = async (req:Request, res: Response): Promise<Response> => {

    const code:string = (req.query.code as string);
    const coupon = await getRepository(Coupons).findOne({code: code});
    if(coupon == undefined) return res.status(404).send("Code Invalid");
    if(coupon != undefined && coupon.customer_email == null) return res.status(200).send("Coupon avalaible");
    return res.status(404).send("Coupon assigned  to: " + coupon.customer_email)
};


// Show if a coupon are asigned to an email
export const getCoupons2 = async (req:Request, res: Response): Promise<Response> => {

    const code:string = (req.query.code as string);
    const email:string = (req.query.email as string); 
    const coupon = await getRepository(Coupons).find({code, customer_email: email});
    if(!code && !email) {
        const total = await getRepository(Coupons).count()
        const page:number = (parseInt(req.query.page as any) || 1)
        const limit = 10;
        const coupons = await getRepository(Coupons).find({
            order: {
                id: "ASC"
            },
        skip: (page - 1) * limit,
        take: limit
    })
        return res.status(200).json({total,coupons})
    }
    if(!code || !email) return res.status(404).send("Invalid Code or Email")
    if(coupon.length <= 0) return res.status(404).send("Coupon not assigned or Invalid Email")
    return res.status(200).json(coupon)   
    
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
        let coupon = await getRepository(Coupons).save(newCoupon)  // se puede borrar el let coupon (PROBAR)
        res.status(201).send("Created coupon successfully!")
    };

 };


// Asign a coupon to an email
 export const asignCoupon = async (req:Request, res:Response): Promise<Response> => {

    const email = req.body.customer_email;
    const code = req.body.code;
    const emailCoupon = await getRepository(Coupons).find({customer_email: email }); 
    const coupon = await getRepository(Coupons).findOne({code}); 
    const validation = Joi.string().email().required().validate(req.body.customer_email);

    if (validation.error) return res.status(422).send("Invalid Email")
    if (code.length != 8 ) return res.status(422).send("Invalid Code")
    if (emailCoupon.length >= 1) return res.status(422).send("This email already has a coupon assigned")
    if (coupon == null) return res.status(422).send("Code not found")
    
    coupon.customer_email = email
    coupon.assigned_at = new Date()
    await getRepository(Coupons).save(coupon)
    return res.status(201).send("Coupon asigned successfully!")
    
 };


// Delete a coupon by id
 export const deleteCoupon = async (req:Request, res:Response): Promise<Response> => {

    const coupon = await getRepository(Coupons).findOne(req.params.id);

    if(!coupon)  return res.status(404).send("Invalid ID");

    if(coupon?.customer_email )  return res.status(404).send("Coupon already assigned. Cannot be deleted");

    await getRepository(Coupons).delete(req.params.id);
    return res.status(201).send("Coupon deleted!");

};