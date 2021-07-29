import {Request, Response} from 'express'
import {Code, getRepository} from "typeorm" 
import {Stores} from '../entity/Stores'
import {ILike} from "typeorm";

export const getStores = async (req:Request, res: Response): Promise<void> => {  

    const name:string = (req.query.name as string);
    const where : Record<string,any> = {}
    if(name != null) {
        where.name = ILike(`${name}%`)
    }
    const page:number = (parseInt(req.query.page as any) || 1)
    const limit = 10
    const total = await getRepository(Stores).count()
    const stores = await getRepository(Stores).find({
    where,
    skip: (page - 1) * limit,
    take: limit
    });
    res.status(200).json({total, stores} )
};




