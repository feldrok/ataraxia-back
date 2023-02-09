import 'dotenv/config.js'
import '../../config/db.js'

import { Product } from '../Product.model.js'

let merch = [
    {
        name: 'Polera Ataraxia',
        price: 4900,
        stock: 20,
        description: 'Una prenda para mostrarle a la gente tu estado de calma.',
        image: [
            'https://firebasestorage.googleapis.com/v0/b/ataraxiapp-50a47.appspot.com/o/polera1-m.png?alt=media&token=4e700282-0635-46a1-aef5-2ceba6ef2d43',
            'https://firebasestorage.googleapis.com/v0/b/ataraxiapp-50a47.appspot.com/o/polera1-p.png?alt=media&token=f4b1e608-8eb4-4889-b818-4b7a49282218',
        ],
        category_id: '63e29fafefdd1a4ddc316efe',
    },
    {
        name: 'Poleron Ataraxia',
        price: 5900,
        stock: 20,
        description:
            'Abrigate junto a Ataraxia y disfruta de las mejores cervezas en cualquier clima.',
        image: [
            'https://firebasestorage.googleapis.com/v0/b/ataraxiapp-50a47.appspot.com/o/polera2-m.png?alt=media&token=5098fc7e-6646-4473-b3e8-9c82af1c0032',
            'https://firebasestorage.googleapis.com/v0/b/ataraxiapp-50a47.appspot.com/o/polera2-p.png?alt=media&token=b72d42fb-d9fa-4fad-af46-3e4c4b191404',
        ],
        category_id: '63e29fafefdd1a4ddc316efe',
    },
    {
        name: 'Tazón Letras',
        price: 3900,
        stock: 20,
        description: 'Disfruta tu café con Ataraxia',
        image: [
            'https://firebasestorage.googleapis.com/v0/b/ataraxiapp-50a47.appspot.com/o/taza1.png?alt=media&token=5de1886c-9120-499f-aa31-9724a2ea1f13',
        ],
        category_id: '63e29fafefdd1a4ddc316efe',
    },
    {
        name: 'Tazón Lúpulo',
        price: 3900,
        stock: 20,
        description: 'Disfruta tu café con Ataraxia',
        image: [ 'https://firebasestorage.googleapis.com/v0/b/ataraxiapp-50a47.appspot.com/o/taza2.png?alt=media&token=4bf9c8be-b8e6-45d1-a44a-e2b6c991590a'],
        category_id: '63e29fafefdd1a4ddc316efe',
    }
]

Product.insertMany(merch)
    .then((merch) => {
        console.log('comic creados', merch)
    })
    .catch((err) => console.log(err))
