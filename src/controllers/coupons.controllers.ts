import {Request, Response} from 'express'
import {Code, getRepository} from "typeorm"
import {Coupons} from '../entity/Coupons'

export const getCoupons = async (req:Request, res: Response): Promise<void> => {

    const code:string = (req.query.code as string);
    const email:string = (req.query.email as string); 
    const cupon = await getRepository(Coupons).find({code , customer_email: email });  // paasar a ingles
    if(cupon.length > 0 ) {
        res.status(200).send("Email not available")
    } else {
        res.status(404).send("Email available")
    }
    /*const avalible = await getRepository(Coupons)
    .createQueryBuilder("coupon")
    .where("coupons.code = :code AND coupons.customer_email = :email", { id: "code", name: "email" })
    .getOneOrFail();*/
}





/*
    const page:number = parseInt(req.query.page as any) || 1;
    const limit = 10;
    const cupon = await getRepository(Coupons).find();
    skip: (page - 1) * limit,
    take: limit
        */