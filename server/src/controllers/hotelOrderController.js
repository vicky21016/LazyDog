import {} from "../services/hotelOrderService";

export const getOrders = async (req, res) => {
    try{
        
    }catch(err){
        res.status(500).json({error:'找不到此訂單' })
    }
};
