import winston from 'winston';

const logger = winston.createLogger({
  level: 'info', // Nivel de los logs, puedes ajustarlo según necesites
  format: winston.format.json(), // Formato de los logs
  transports: [
    new winston.transports.Console(), // Transporte para mostrar logs en consola
    new winston.transports.File({ filename: 'error.log', level: 'error' }) // Transporte para guardar logs de error en archivo
  ]
});

export default logger;
