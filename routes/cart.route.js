import controller from '../controllers/cart.controller.js'
import express from 'express'
const routerCart = express.Router()

const { createCart, addOneProduct, deleteOneProduct, emptyCart } = controller

routerCart.post('/', createCart)
routerCart.delete('/:id', deleteOneProduct)
routerCart.put('/add', addOneProduct)
routerCart.delete('/empty/all', emptyCart)

export default routerCart
