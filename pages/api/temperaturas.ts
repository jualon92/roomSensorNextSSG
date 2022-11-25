import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/mongoose";
import Temperatura from "../../models/Temperatura";

 
 
//ALTA 
const saveTemperatura = async (req: NextApiRequest, res: NextApiResponse) => {
    //Normalizar
    try {
        console.log("print", req.body)
        const temperatura = new Temperatura(req.body); // genera item desde esquema
       console.log("temp", temperatura)
        await temperatura.save()
        res.status(200).json({message:" OK "})
        //   console.log(oportunity.id)
    } catch (e) {
        res.status(500).json({ message: 'Error al crear item' });
    }
};

 

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;
    await dbConnect();

    switch (method) {
        case 'POST':
            return saveTemperatura(req, res);
       /* case 'GET':
            return getTemperatura(req, res);*/
    
        default:
            return res.status(405).json({ message: 'Metodo no permitido' });

    }
};

export default handler;