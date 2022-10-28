const ERROR_CODE_WRONG_DATA = 400;
const ERROR_CODE_NOT_FOUND = 404;
const ERROR_CODE_SOMETHING_IS_WRONG = 500;

const ERROR_MESSAGE = {
  USER_POST_ERROR: 'Переданы некорректные данные при создании пользователя.',
  SOMETHING_IS_WRONG: 'Ошибка по умолчанию.',
  USER_GET_ID_ERROR: 'Пользователь по указанному _id не найден.',
  USER_PATCH_PROFILE_INVALID_DATA_ERROR: 'Переданы некорректные данные при обновлении профиля.',
  USER_PATCH_ID_NOT_FOUND_ERROR: 'Пользователь с указанным _id не найден.',
  USER_PATCH_AVATAR_INVALID_DATA_ERROR: 'Переданы некорректные данные при обновлении аватара.',
  CARD_POST_ERROR: 'Переданы некорректные данные при создании карточки.',
  CARD_DELETE_ID_NOT_FOUND_ERROR: 'Карточка с указанным _id не найдена.',
  CARD_PUT_LIKE_INVALID_DATA_ERROR: 'Переданы некорректные данные для постановки/снятии лайка.',
  CARD_DELETE_LIKE_ID_NOT_FOUND_ERROR: 'Передан несуществующий _id карточки.',
  CARD_DELETE_ID_INCORRECT: 'Передан некорректный _id.'
};

module.exports = { ERROR_CODE_WRONG_DATA, ERROR_CODE_NOT_FOUND, ERROR_CODE_SOMETHING_IS_WRONG, ERROR_MESSAGE }