//Функция getRandomPositiveInteger, возвращающая случайное целое число из переданного диапазона включительно
function getRandomPositiveInteger(a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}
//Функция, генерирующаю число,которое не повторяется из диапазона включительно
function createRandom(min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomPositiveInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomPositiveInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}
//функция об ошибке отправки данных на сервер
const ALERT_SHOW_TIME = 7000;
const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = '#ff4e4e';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};
// функция блока кнопки отправки данных
const blockSubmitButton = (submitButton) => {
  submitButton.disabled = true;
  submitButton.textContent = 'Подождите';
};

const unblockSubmitButton = (submitButton) => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

function debounce(callback, timeoutDelay) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}
export { getRandomPositiveInteger, createRandom,showAlert,blockSubmitButton,unblockSubmitButton,debounce};
