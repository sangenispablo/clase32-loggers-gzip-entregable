// dotenv para leer los archivos .env
require("dotenv").config();

const cluster = require("cluster");
const os = require("os");

const numCPUs = os.cpus().length;

// parametros
const { argv } = require("./helpers/utils");

// express y express-session
const express = require("express");
const session = require("express-session");

// gzip con compression
const compression = require("compression");

// persistir la session en mongodb
const MongoStore = require("connect-mongo");

// passport
const passport = require("passport");

// inicializo los middlewares
const { initializePassport } = require("./middlewares/passport.config");

// mongo
const { dbConnection } = require("./database/config");

// rutas
const serverRouter = require("./routes/serverRouter");
const apiRouter = require("./routes/apiRouter");

// env port
const PORT = Number(argv.p || process.env.PORT || 8080);

const app = express();

// desde aca hago todo el tema del cluster

if (cluster.isPrimary && (argv.m || process.env.MODE || "FORK") === "CLUSTER") {
  console.log(`Primary Server ${process.pid} is running`);
  // creo los subprocesos para cada worker
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  // Cuando algun cluster die
  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork();
    console.log("Worker restored");
  });
} else {
  initializePassport();

  app.use(
    session({
      store: MongoStore.create({ mongoUrl: process.env.MONGODB_CNN_LOCAL }),
      secret: process.env.SECRET,
      cookie: {
        httpOnly: false,
        secure: false,
        maxAge: Number(process.env.TIME_SESSION),
      },
      rolling: true,
      resave: true,
      saveUninitialized: false,
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());

  // gzip
  app.use(compression({ level: 9 }));

  app.use(express.json());
  app.use(express.static("src/public"));
  app.use(express.urlencoded({ extended: true }));

  // implemento el logger a cada ruta
  const {
    middleLogger,
    middleLoggerWarm,
  } = require("./middlewares/middleLogger");

  // mis rutas
  app.use("/", middleLogger, serverRouter);
  app.use("/api", middleLogger, apiRouter);
  app.use("*", middleLoggerWarm);

  // conecto a Mongo
  dbConnection();

  // start server
  app.listen(PORT, () => {
    console.log(`API esta escuchando el puerto: ${PORT}`);
  });
}
