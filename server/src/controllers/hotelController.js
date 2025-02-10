import { getHotels, getId,createHotels } from "../services/hotelService.js";

export const getAllHotels = async (req, res) => {
  try {
    const hotels = await getHotels();
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getByIds = async (req, res) => {  
  try {
    console.log("找到ID:", req.params.id);
    const id = parseInt(req.params.id, 10); //eddy的

    if (isNaN(id)) {
      return res.status(400).json({ error: "無效的 ID 確認一下" });
    }

    const hotel = await getId(id); 
    if (!hotel) {
      return res.status(404).json({ error: `找不到 id=${id} 的旅館` });
    }

    res.json(hotel); 
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



export const createHotel = async (req, res) => {
  try {
    const hotelData = req.body;

    
    if (!hotelData.name || !hotelData.operator_id || !hotelData.address || !hotelData.phone) {
      return res.status(400).json({ error: "缺少必要欄位 (name, operator_id, address, phone)" });
    }

    const newHotel = await createHotels(hotelData); 

    res.status(201).json(newHotel);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



