const ERROR_CODE_WRONG_DATA = 400;
const ERROR_CODE_NOT_FOUND = 404;
const ERROR_CODE_DEFAULT = 500;

const ERROR_MESSAGE = {
  USER_POST: 'Переданы некорректные данные при создании пользователя.',
  SOMETHING_WRONG: 'Ошибка по умолчанию.',
  USER_GET_ID: 'Пользователь по указанному _id не найден.',
  USER_PATCH_PROFILE_INV_DATA: 'Переданы некорректные данные при обновлении профиля.',
  USER_PATCH_ID_NOT_FOUND: 'Пользователь с указанным _id не найден.',
  PATCH_AVA_INV_DATA: 'Переданы некорректные данные при обновлении аватара.',
  CARD_POST: 'Переданы некорректные данные при создании карточки.',
  CARD_DELETE_NO_ID: 'Карточка с указанным _id не найдена.',
  PUT_LIKE_INV_DATA: 'Переданы некорректные данные для постановки/снятии лайка.',
  DELETE_LIKE_NO_ID: 'Передан несуществующий _id карточки.',
  CARD_DEL_WRONG_ID: 'Передан некорректный _id.',
};

module.exports = {
  ERROR_CODE_WRONG_DATA,
  ERROR_CODE_NOT_FOUND,
  ERROR_CODE_DEFAULT,
  ERROR_MESSAGE,
};
