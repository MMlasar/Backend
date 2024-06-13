import Stripe from 'stripe';
import CheckoutProduct from '../dto/checkout.dto.js';
import cartsManager from "../data/mongo/orders.mongo.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const checkoutRepository = async (filter) => {
    try {
        let productsOnCart = await cartsManager.read(filter);
        productsOnCart = productsOnCart.map(each=> new CheckoutProduct(each));
        const line_items = productsOnCart;
        const intent = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items,
            mode: 'payment',
            success_url: 'http://localhost:8080/thanks.handlebars',
            cancel_url: 'http://localhost:8080/cancel.html',
        });

        return intent;
    } catch (error) {
        throw new Error(`Error in checkoutRepository: ${error.message}`);
    }
};

export default checkoutRepository;
