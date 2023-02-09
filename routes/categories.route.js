import controller from "../controllers/categories.controller.js"
import express from 'express'
const router = express.Router()

const { get_categories } = controller

router.get('/', get_categories)

export default router