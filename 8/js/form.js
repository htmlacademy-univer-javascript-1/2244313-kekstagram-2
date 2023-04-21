import './hashtadsvalid.js';
import { input, hashtagsValid, inputComments } from './hashtadsvalid.js';
const imgOverlay = document.querySelector('.img-upload__overlay');
const start = document.querySelector('.img-upload__start input');

const photoUser = document.querySelector('#upload-file');

const body=document.querySelector('body');
//const imgPreview = document.querySelector('.img-upload__preview img');//для замены на пользовательское
start.onchange = function () {
  imgOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  // imgPreview.src = photoUser.value;
};

const cancel = document.querySelector('.img-upload__cancel');
cancel.addEventListener('click', () => {
  imgOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  photoUser.value ='';
});

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    imgOverlay.classList.add('hidden');
    body.classList.remove('modal-open');
    photoUser.value = '';
  }
});

// показ сообщения,что сообщение отправлено БЛОК РАБОТАЕТ КАК НАДО
const showSuccessMessageModal = () => {
  const successModal = document.querySelector('#success').content.querySelector('.success');
  const clonedSuccessModal = successModal.cloneNode(true);
  const closeSuccessModalButtonElement = clonedSuccessModal.querySelector('.success__button');

  closeSuccessModalButtonElement.addEventListener('click',(evt) =>{
    evt.preventDefault();
    body.removeChild(clonedSuccessModal);

  } );

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      clonedSuccessModal.remove();
    }
  });

  document.addEventListener('click',()  => {
    clonedSuccessModal.remove();
  });
  document.body.append(clonedSuccessModal);
};
//показ сообщения об ошибке БЛОК РАБОТАЕТ
const showErrorMessageModal = () =>{
  const errorModal = document.querySelector('#error').content.querySelector('.error');
  const clonedErrorModal = errorModal.cloneNode(true);
  const closeErrorModalButtonElement = clonedErrorModal.querySelector('.error__button');
  closeErrorModalButtonElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    body.removeChild(clonedErrorModal);
  });
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      clonedErrorModal.remove();
    }
  });
  document.addEventListener('click', () => {
    clonedErrorModal.remove();
  });
  document.body.append(clonedErrorModal);
};

const form = document.querySelector('.img-upload__form');
const pristine = new Pristine(form);
pristine.addValidator(document.querySelector('[name="hashtags"]'), hashtagsValid);

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (input.value==='') {
    showSuccessMessageModal();
    imgOverlay.classList.add('hidden');
    body.classList.remove('modal-open');
    photoUser.value = '';//позволяет загрузить одну и ту же фотку
    input.value = '';
    inputComments.value = '';
  }
  else if (pristine.validate()) {
    showSuccessMessageModal();
    imgOverlay.classList.add('hidden');
    body.classList.remove('modal-open');
    photoUser.value = '';
    input.value = '';
  }
  else {
    showErrorMessageModal();
    imgOverlay.classList.add('hidden');
    body.classList.remove('modal-open');
    photoUser.value = '';
  }
});

