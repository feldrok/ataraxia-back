import { createOrder } from "../controllers/mercadopago.controller.js"
import express from "express"

const router = express.Router()

router.post("/", createOrder)

export default router