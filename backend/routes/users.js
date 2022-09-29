const userRouter = require('express').Router();
const validator = require('validator');
const { celebrate, Joi } = require('celebrate');
const {
  getUsers, getUser, updateUser, updateAvatar, getUserInfo,
} = require('../controllers/users');

const validateURL = (value) => {
  if (!validator.isURL(value, { require_protocol: true })) {
    throw new Error('Ссылка указана некорректно');
  }
  return value;
};

userRouter.get('', getUsers);

userRouter.get('/me', getUserInfo);

userRouter.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24),
  }),
}), getUser);

userRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUser);

userRouter.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().custom(validateURL),
  }),
}), updateAvatar);

module.exports = userRouter;
