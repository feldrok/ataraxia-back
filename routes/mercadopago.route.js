import controller from "../controllers/mercadopago.controller.js"
import express from "express"

const { create, get_order } = controller

const router = express.Router()

router.post("/", create)
router.get("/", get_order)

export default router