const ERROR_CODE_WRONG_DATA = 400;
const ERROR_CODE_NOT_FOUND = 404;
const ERROR_CODE_DEFAULT = 500;

const ERROR_MESSAGE = {
  USER_POST: 'Переданы некорректные данные при создании пользователя.',
  SOMETHING_IS_WRONG: 'Ошибка по умолчанию.',
  USER_GET_ID: 'Пользователь по указанному _id не найден.',
  USER_PATCH_PROFILE_INVALID_DATA: 'Переданы некорректные данные при обновлении профиля.',
  USER_PATCH_ID_NOT_FOUND: 'Пользователь с указанным _id не найден.',
  USER_PATCH_AVATAR_INVALID_DATA: 'Переданы некорректные данные при обновлении аватара.',
  CARD_POST: 'Переданы некорректные данные при создании карточки.',
  CARD_DELETE_ID_NOT_FOUND: 'Карточка с указанным _id не найдена.',
  CARD_PUT_LIKE_INVALID_DATA: 'Переданы некорректные данные для постановки/снятии лайка.',
  CARD_DELETE_LIKE_ID_NOT_FOUND: 'Передан несуществующий _id карточки.',
  CARD_DELETE_ID_INCORRECT: 'Передан некорректный _id.',
};

module.exports = {
  ERROR_CODE_WRONG_DATA,
  ERROR_CODE_NOT_FOUND,
  ERROR_CODE_DEFAULT,
  ERROR_MESSAGE,
};
