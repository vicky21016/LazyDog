import express from 'express'

import { getHotelsImages } from '../controllers/hotelImagesController.js'
const router = express.Router()

router.get('/', getHotelsImages)
// router.get("/:id",)
// router.post("/",)
// router.patch("/:id",)
// router.delete("/:id",)

export default router
