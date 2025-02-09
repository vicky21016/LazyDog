import { getHotels } from "../services/hotelService.js";

export const getAllHotels = async (req, res) => {
  try {
    const hotels = await getHotels();
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default getAllHotels;
