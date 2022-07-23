const { argv } = require("../helpers/utils");

const os = require("os");

const numCPUs = os.cpus().length;

const { request, response } = require("express");

const register = (req, res) => {
  res.send({ status: "ok", msg: "Usuario registrado" });
};

const failedRegister = (req, res) => {
  res.status(400).send({ status: "error", msg: "Registro fallido" });
};

const login = async (req = request, res = response) => {
  try {
    res.send({ status: "ok", msg: "Usuario logeado" });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "ERROR", data: { error: error?.message || error } });
  }
};

const failedLogin = (req, res) => {
  res.status(400).send({ status: "error", msg: "Credenciales incorrectas" });
};

const logout = async (req = request, res = response) => {
  try {
    req.logout((error) => {
      res.send({ msg: "logout exitoso" });
    });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "ERROR", data: { error: error?.message || error } });
  }
};

const currentSession = async (req = request, res = response) => {
  try {
    if (!req.user) {
      return res.status(400).send({ status: "error", msg: "No existe sesión" });
    }
    res.send({ status: "ok", msg: req.user });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "ERROR", data: { error: error?.message || error } });
  }
};

const serverInfo = async (req = request, res = response) => {
  try {
    const info = {
      argumentos: argv,
      plataforma: process.platform,
      nodeversion: process.version,
      memoria: (process.memoryUsage().rss / 1000000).toFixed(2),
      path: process.execPath,
      procID: process.pid,
      cwd: process.cwd(),
      procesadores: numCPUs,
    };
    res.send({ status: "ok", msg: info });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "ERROR", data: { error: error?.message || error } });
  }
};

module.exports = {
  register,
  failedRegister,
  login,
  failedLogin,
  currentSession,
  logout,
  serverInfo,
};
