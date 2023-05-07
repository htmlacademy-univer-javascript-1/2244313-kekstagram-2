import { showAlert } from './util.js';
const filterPhotosContainer = document.querySelector('.img-filters ');
const getData = (onSuccess) => {
  fetch('https://26.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((photos) => {
      onSuccess(photos);
      filterPhotosContainer.classList.remove('img-filters--inactive');
    })
    .catch(() => { showAlert('Ошибка загрузки данных');});

};

const sendData = (onSuccess,  onFail,  body) => {
  fetch(
    ' https://26.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      }
      else {
        onFail('Не удалось отправить форму. Попробуйте ещё раз');
      }
    })
    .catch(() => {
      onFail('Не удалось отправить форму. Попробуйте ещё раз');

    });
};

export { getData, sendData};
