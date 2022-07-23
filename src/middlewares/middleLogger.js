const { request, response } = require("express");

const { logger } = require("../helpers/configLogger");

const middleLogger = (req = request, res = response, next) => {
  logger.info(`Ruta: ${req.path} Metodo: ${req.method}`);
  next();
};

const middleLoggerWarm = (req = request, res = response, next) => {
  logger.warn(`Ruta: ${req.path} Metodo: ${req.method} no encontrado`);
  next();
};

module.exports = { middleLogger, middleLoggerWarm };
