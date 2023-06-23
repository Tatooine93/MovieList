//require('dotenv').config()
require("dotenv").config({ path: "./config/.env" });

// connection à la DB
require("./config/database");

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const path = require("path");
const corsOptions = require("./config/cors");
const credentials = require("./middleware/credentials");
const errorHandlerMiddleware = require("./middleware/error_handler");
const userRoutes = require("./routes/user.routes");
const { checkUser, requireAuth } = require("./middleware/auth.middleware");

const app = express();

//allow credentials
//bloque les request, origin is not defined !!
app.use(credentials);

//CORS
app.use(cors(corsOptions));

//application.x-wwform-urlencoded
app.use(express.urlencoded({ extended: false }));

//application/json reponse
app.use(express.json());

//middleware for cookie-parser
app.use(cookieParser());

// static files
app.use("/static", express.static(path.join(__dirname, "public")));

// default error Handler
app.use(errorHandlerMiddleware);

// jwt
app.get("*", checkUser);
app.get("/jwtid", requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id);
});

//Routes
app.use("/api/user", userRoutes);
//app.use('/api/list', )
//app.use('/api/movie', )

app.all("*", (req, res) => {
  res.status(404);
});

mongoose.connection.once("open", () => {
  // server port
  app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
  });
});
