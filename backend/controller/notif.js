import { notification } from "../novu/novu.js";

export const notifController = async (req,res) => {
    const{description} = req.body;
    try {
        await notification(description)
        res.status(201).json({message:"Subscriber created successfully"});
    } catch (error) {
        console.log("notifController error:",error);
        res.status(500).json({message: error.message})
    }
}

