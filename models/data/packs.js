import 'dotenv/config.js'
import '../../config/db.js'

import { Product } from '../Product.model.js'

let beers = [
    {
        name: '6 Pack Mixto',
        price: 5900,
        stock: 20,
        packSize: 6,
        ml: 355,
        description: '2 Scottish Ale, 2 Blonde Ale, 1 Stout, 1 IPA',
        image: 'https://imgs.search.brave.com/aMgZgo29H5xf4RMs_qH8v5juHy0vIcSSwT2xRgEqAgs/rs:fit:612:564:1/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vcGhvdG9z/L3NpeC1wYWNrLW9m/LWdsYXNzLWJvdHRs/ZWQtYmVlci1pbi1n/ZW5lcmljLWJyb3du/LWNhcnJpZXItcGlj/dHVyZS1pZDY1Mjg0/Mjc2Mj9rPTYmbT02/NTI4NDI3NjImcz02/MTJ4NjEyJnc9MCZo/PWg5WFJvTHh5dmJx/Q3V4bzdMcFhwLTBt/UFFLNmJOak9UeEZJ/ZXBXdnpYbDQ9',
        category_id: '63e2667aefdd1a4ddc316ef3',
    },
    {
        name: '12 Pack Mixto',
        price: 11900,
        stock: 20,
        packSize: 12,
        ml: 355,
        description: '4 Scottish Ale, 4 Blonde Ale, 2 Stout, 2 IPA',
        image: 'https://imgs.search.brave.com/aMgZgo29H5xf4RMs_qH8v5juHy0vIcSSwT2xRgEqAgs/rs:fit:612:564:1/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vcGhvdG9z/L3NpeC1wYWNrLW9m/LWdsYXNzLWJvdHRs/ZWQtYmVlci1pbi1n/ZW5lcmljLWJyb3du/LWNhcnJpZXItcGlj/dHVyZS1pZDY1Mjg0/Mjc2Mj9rPTYmbT02/NTI4NDI3NjImcz02/MTJ4NjEyJnc9MCZo/PWg5WFJvTHh5dmJx/Q3V4bzdMcFhwLTBt/UFFLNmJOak9UeEZJ/ZXBXdnpYbDQ9',
        category_id: '63e2667aefdd1a4ddc316ef3',
    },
    {
        name: '24 Pack Mixto',
        price: 17900,
        stock: 20,
        packSize: 24,
        ml: 355,
        description: '6 Scottish Ale, 6 Blonde Ale, 3 Stout, 3 IPA',
        image: 'https://imgs.search.brave.com/aMgZgo29H5xf4RMs_qH8v5juHy0vIcSSwT2xRgEqAgs/rs:fit:612:564:1/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vcGhvdG9z/L3NpeC1wYWNrLW9m/LWdsYXNzLWJvdHRs/ZWQtYmVlci1pbi1n/ZW5lcmljLWJyb3du/LWNhcnJpZXItcGlj/dHVyZS1pZDY1Mjg0/Mjc2Mj9rPTYmbT02/NTI4NDI3NjImcz02/MTJ4NjEyJnc9MCZo/PWg5WFJvTHh5dmJx/Q3V4bzdMcFhwLTBt/UFFLNmJOak9UeEZJ/ZXBXdnpYbDQ9',
        category_id: '63e2667aefdd1a4ddc316ef3',
    },
    {
        name: '12 Pack Scottish Ale',
        price: 11900,
        stock: 20,
        packSize: 12,
        ml: 355,
        description: '12 Scottish Ale',
        image: 'https://imgs.search.brave.com/aMgZgo29H5xf4RMs_qH8v5juHy0vIcSSwT2xRgEqAgs/rs:fit:612:564:1/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vcGhvdG9z/L3NpeC1wYWNrLW9m/LWdsYXNzLWJvdHRs/ZWQtYmVlci1pbi1n/ZW5lcmljLWJyb3du/LWNhcnJpZXItcGlj/dHVyZS1pZDY1Mjg0/Mjc2Mj9rPTYmbT02/NTI4NDI3NjImcz02/MTJ4NjEyJnc9MCZo/PWg5WFJvTHh5dmJx/Q3V4bzdMcFhwLTBt/UFFLNmJOak9UeEZJ/ZXBXdnpYbDQ9',
        category_id: '63e2667aefdd1a4ddc316ef3',
    }
]

Product.insertMany(beers)
    .then((beers) => {
        console.log('comic creados', beers)
    }).catch(err => console.log(err))