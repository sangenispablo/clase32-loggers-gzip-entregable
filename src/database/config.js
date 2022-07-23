const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN_LOCAL);
    console.log("MongoDB Local conectado");
  } catch (error) {
    console.log(error);
    throw new Error("Error con la base de datos");
  }
};

module.exports = {
  dbConnection,
};
