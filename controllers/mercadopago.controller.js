import mercadopago from "mercadopago"

mercadopago.configure({ access_token: process.env.MP_KEY })
export const createOrder = async (req, res, next) => {
    const cart = req.body
    let preference = {
        items: [
            {
                id: 123,
                title: "Producto1",
                currency_id: "ARS",
                picture_url: "https:/www.google.com",
                quantity: 1,
                unit_price: cart.price
            }
        ],
        back_urls: {
            success: "http://localhost:3000",
            failure: "http://localhost:3000",
            pending: "http://localhost:3000"
        },
    }
    mercadopago.preferences.create(preference)
    .then((response)=>res.status(200).send({response}))
    .catch (function (error){
        console.log(error);
        return res.status(500).json({
            message: "No funca"
        })
    })
}