import {Request, Response} from 'express'
import {Code, getRepository, getTreeRepository} from "typeorm" 
import {Stores} from '../entity/Stores'
import {ILike} from "typeorm";


// Show a list of 10 stores. Search by name allowed using "name" instead of "page" 
export const getStores = async (req:Request, res: Response): Promise<void> => {  

    const name:string = (req.query.name as string);
    const where : Record<string,any> = {}
    if(name != null) {
        where.name = ILike(`${name}%`)
    }
    console.log(where)
    const page:number = (parseInt(req.query.page as any) || 1)
    const limit = 10
    const total = await getRepository(Stores).count()
    const stores = await getRepository(Stores).find({
    where,
    skip: (page - 1) * limit,
    take: limit
    });
    res.status(200).json({total, stores})
};


// Create a new store
export const newStore = async (req:Request, res:Response): Promise<Response> => {  

    const name = req.body.name;
    const address = req.body.address;
    const stores = await getRepository(Stores).findOne({name, address})
    if (name.length <= 0 || address.length <= 0) return res.status(404).send("Invalid Name or Addres");
    if (stores) return res.status(404).send("Store existent")
    await getRepository(Stores).save(req.body)
    return res.status(201).send("Store created successfully!")

 }


// Delete a store
 export const deleteStore = async (req:Request, res:Response): Promise<Response> => {

    const store = await getRepository(Stores).findOne(req.params.id);

    if(!store)  return res.status(404).send("Invalid ID");

    await getRepository(Stores).delete(req.params.id);
    return res.status(200).send("Store deleted!");

}

