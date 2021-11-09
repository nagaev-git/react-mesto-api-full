const express = require("express");

const app = express();
const { PORT = 3000 } = process.env;
const mongoose = require("mongoose");
const { celebrate, Joi, errors } = require("celebrate");
const helmet = require("helmet");
const cors = require("cors");

const { login, createUser } = require("./controllers/users");
const auth = require("./middlewares/auth");
const regExp = require("./regexp/regexp");
const errorHandler = require("./middlewares/error");
const NotFoundError = require("./errors/not-found-err");
const { requestLogger, errorLogger } = require("./middlewares/logger");
require("dotenv").config();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/mestodb", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(
  cors({
    credentials: true,
    origin: [
      "http://mesto.site.nomoredomains.rocks",
      "https://mesto.site.nomoredomains.rocks",
      "http://localhost:3000",
    ],
  })
);

app.use(requestLogger);

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Сервер сейчас упадёт");
  }, 0);
});

app.post(
  "/signup",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().pattern(regExp),
      email: Joi.string().email().required(),
      password: Joi.string().required().min(8).max(35),
    }),
  }),
  createUser
);

app.post(
  "/signin",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required().min(8),
    }),
  }),
  login
);

app.use(auth);

app.use("/", require("./routes/users"));
app.use("/", require("./routes/cards"));

app.use("*", (req, res, next) => next(new NotFoundError("Ресурс не найден.")));

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Ссылка на сервер: http://localhost:${PORT}`);
});
