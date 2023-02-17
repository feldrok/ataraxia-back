import 'dotenv/config.js'
import '../../config/db.js'

import { Coupon } from '../Coupon.model.js'

let cupon = [
    {
        coupon: 'DESCUENTO10',
        discount: 10
    },
    {
        coupon: 'DESCUENTO20',
        discount: 20
    }
]

Coupon.insertMany(cupon)
    .then((cupon) => {
        console.log('cupones creados', cupon)
    })
    .catch((err) => console.log(err))
