const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-req-err');
const ForbiddenError = require('../errors/forbidden-err');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => {
      next(err);
    });
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Не указаны обязательные поля'));
      }
      return next(err);
    });
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        return next(new NotFoundError('404 - Передан несуществующий _id карточки'));
      }
      if (card.owner.toString() !== req.user._id) {
        return next(new ForbiddenError('Вам запрещено удалять данную карточку'));
      }
      return Card.findByIdAndDelete(req.params.cardId)
        .then(() => {
          res.status(200).send({ message: 'Карточка удалена' });
        });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('400 - Некорректный id'));
      }
      return next(err);
    });
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return next(new NotFoundError('404 - Передан несуществующий _id карточки'));
      }
      return res.status(200).send({ date: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('400 - Некорректный id'));
      }
      return next(err);
    });
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return next(new NotFoundError('404 - Карточка с таким id  не найдена'));
      }
      return res.status(200).send({ date: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('400 - Некорректный id'));
      }
      return next(err);
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
