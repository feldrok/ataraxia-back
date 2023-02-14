import mercadopago from "mercadopago"

mercadopago.configure({ access_token: process.env.MP_KEY })
export const createOrder = async (req, res, next) => {
    const cart = req.body
    const product = cart.cart.cart.response[0].products
    let items = []
    product.map(item => {
        items.push(
            {
                title: item.product_id.name,
                picture_url: item.product_id.image[0],
                quantity: item.quantity,
                currency_id: "ARS",
                unit_price: item.product_id.price
            }
        )
    })
    console.log(items);
    let preference = {
        payer: {
            name: "Juan",
            surname: "Lopez",
            email: "user@email.com",
            phone: {
                area_code: "11",
                number: 44444444
            },
            identification: {
                type: "DNI",
                number: "12345678"
            },
            address: {
                street_name: "Street",
                street_number: 123,
                zip_code: "5700"
            },
        },
        back_urls: {
            success: "http://localhost:3000",
            failure: "http://localhost:3000",
            pending: "http://localhost:3000"
        },
    }
    preference.items = items

    mercadopago.preferences.create(preference)
    .then(function (response) {
        return res.status(response.status).json({
            response
        })
        })
        .catch(function (error) {
            console.log(error);
            return res.status(500).json({
                message: "Error"
            })
        })
}