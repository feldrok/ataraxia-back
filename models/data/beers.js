import 'dotenv/config.js'
import '../../config/db.js'

import { Product } from '../Product.model.js'

let beers = [
    {
        name: 'Scottish Ale',
        description: 'This is a great beer',
        price: 1000,
        stock: 120,
        abv: 4.8,
        ibu: 12,
        image: 'https://firebasestorage.googleapis.com/v0/b/ataraxiapp-50a47.appspot.com/o/scottish.png?alt=media&token=c98c002a-d44a-4ca5-838c-341ca3b830da',
        category_id: '63e1a2c821d9d7561f883265',
    },
    {
        name: 'Blonde Ale',
        description: 'This is a great beer',
        price: 900,
        stock: 86,
        abv: 5.5,
        ibu: 21,
        image: 'https://firebasestorage.googleapis.com/v0/b/ataraxiapp-50a47.appspot.com/o/blondeale.png?alt=media&token=aa6626d4-3ce0-4229-b92a-449793d0109b',
        category_id: '63e1a2c821d9d7561f883265',
    },
    {
        name: 'Stout',
        description: 'This is a great beer',
        price: 1300,
        stock: 0,
        abv: 6.0,
        ibu: 18,
        image: 'https://firebasestorage.googleapis.com/v0/b/ataraxiapp-50a47.appspot.com/o/stout.png?alt=media&token=48727545-47fa-4dde-8bac-e10462240c5e',
        category_id: '63e1a2c821d9d7561f883265',
    },
    {
        name: 'IPA',
        description: 'This is a great beer',
        price: 1200,
        stock: 21,
        abv: 6.5,
        ibu: 54,
        image: 'https://firebasestorage.googleapis.com/v0/b/ataraxiapp-50a47.appspot.com/o/ipa.png?alt=media&token=3063c2e0-797e-4c05-989f-16193e208159',
        category_id: '63e1a2c821d9d7561f883265',
    },
]

Product.insertMany(beers)
    .then((beers) => {
        console.log('comic creados', beers)
    }).catch(err => console.log(err))