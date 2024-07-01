// index.router.js

import CustomRouter from './customRouter.js';
import apiRouter from './api/index.router.js';
import viewsRouter from './views/index.views.js';
import sendSms from '../utils/sendsms.utils.js';

const api = new apiRouter();
const apiRouterInstance = api.getRouter();
const view = new viewsRouter();
const viewsRouterInstance = view.getRouter();

export default class IndexRouter extends CustomRouter {
    init() {
        this.router.use('/api', apiRouterInstance);
        this.router.use('/', viewsRouterInstance);

        // Define la ruta para enviar SMS
        this.router.get('/sms', async (req, res, next) => {
            try {
                await sendSms('1165003095');
                return res.json({
                    statuscode: 200,
                    message: 'enviado'
                });
            } catch (error) {
                return next(error);
            }
        });
    }
}
