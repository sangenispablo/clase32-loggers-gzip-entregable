const { fork } = require("child_process");

const { request, response } = require("express");

const bigRandom = (req = request, res = response) => {
  const { cant } = req.query;
  let cantidad = cant || 100000000;
  const bRand = fork("./src/controllers/bigrandom");
  bRand.send(cantidad);
  bRand.on("message", (result) => {
    res.json(result);
  });
};

module.exports = {
  bigRandom,
};
