import checkoutService from '../services/payments.service.js';

const checkoutController = async (req, res, next) => {
    try {
        const { user_id } = req.user;
        const response = await checkoutService({ user_id });
        return res.status(200).json({ success: true, data: response });
    } catch (error) {
        return next(error);
    }
};

export default checkoutController;
