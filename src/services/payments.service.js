import checkoutRepository from '../repositories/payments.repositort.js';

const checkoutService = async (filter) => {
    try {
        const response = await checkoutRepository(filter);
        return response;
    } catch (error) {
        
        throw new Error(`Error in checkoutService: ${error.message}`);
    }
};

export default checkoutService;
