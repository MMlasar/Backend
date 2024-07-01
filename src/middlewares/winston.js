import winston from 'winston';

// Configuración de Winston
const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
        // Agrega otros transports aquí si es necesario
    ],
});

function winstonMiddleware(req, res, next) {
    try {
        req.logger = logger;
        const message = `${req.method} ${req.url} - ${new Date().toLocaleDateString()}`;
        req.logger.info(message);
        return next();
    } catch (error) {
        return next(error);
    }
}

export default winstonMiddleware;
export { logger }; // También exporta logger para usarlo directamente si es necesario
