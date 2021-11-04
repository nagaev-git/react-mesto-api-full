const express = require("express");
const mongoose = require("mongoose");
const { celebrate, Joi, errors } = require("celebrate");
const regExp = require("./regexp/regexp");
const NotFoundError = require("./errors/not-found-err");

const app = express();
const { PORT = 3000 } = process.env;

const { login, createUser } = require("./controllers/users");
const auth = require("./middlewares/auth");
const errorHandler = require("./middlewares/error");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/mestodb", {
  useNewUrlParser: true,
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
  createUser,
);

app.post(
  "/signin",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  }),
  login,
);

app.use(auth);

app.use("/", require("./routes/users"));
app.use("/", require("./routes/cards"));

app.use("*", (req, res, next) => next(new NotFoundError("Ресурс не найден.")));

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Ссылка на сервер: http://localhost:${PORT}`);
});
