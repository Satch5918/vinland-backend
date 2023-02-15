import axios from "axios";
import {Product} from '../models/Products.js'

const paymentController = {
    create_payment: async (req, res) => {
        const items = req.body
        console.log(items);
        const products = []
        for (const item of items) {
            const product = await Product.findById(item._id);
            products.push({
                title: product.name,
                quantity: item.quantity,
                currency_id: "ARS",
                unit_price: product.price,
                id: item._id
            })
        }
            console.log(products);
        const payload = {
            items: products,
            back_urls: {
                success: `${process.env.FRONT}/payment/success`,
                failure: `${process.env.FRONT}/payment/failure`,
                pendient: `${process.env.FRONT}/payment/pendient`
            },
            auto_return: "approved",
        }
        const mercadopagoResponse = await axios.post('https://api.mercadopago.com/checkout/preferences', payload, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
            }
        });
        return res.status(200).json({ url: mercadopagoResponse.data.init_point, success: true });  
    },
    confirm_payment: async(req, res) => {
        const id = req.query.preference_id;
        const mercadopagoResponse = await axios.get('https://api.mercadopago.com/checkout/preferences/' + id, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
            }
        });
        const items = mercadopagoResponse.data.items;
        for (const item of items) {
            const { quantity, id } = item;
            await Product.findByIdAndUpdate(id, { $inc: { stock: -quantity } });
        }
    }
}

export default paymentController