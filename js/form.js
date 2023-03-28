const imgOverlay = document.querySelector('.img-upload__overlay');
const start = document.querySelector('.img-upload__start input');

const photoUser = document.querySelector('#upload-file');
const input = document.querySelector('.text__hashtags');//относится к хештегу!

const body=document.querySelector('body');


start.onchange = function () {
  // input.onfocus = function (event) { console.log('ff'); event.stopPropagation(); };
  imgOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  imgPreview.src = photoUser.value;
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

//валидация хештегов
const form = document.querySelector('.img-upload__form');
const pristine = new Pristine(form);

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (input.value !== '') {
    hashtagsValid();
  }
  else {
    showSuccessMessageModal();
    imgOverlay.classList.add('hidden');
    body.classList.remove('modal-open');
    photoUser.value = '';//позволяет загрузить одну и ту же фотку
    input.value = '';
  }

}
);
//валидация
function hashtagsValid(){
  const hashtagSplit = input.value.split(' ');
  const hashtags = [];
  for (let i = 0; i <= hashtagSplit.length - 1; i++) {
    const re = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
    //проверкана валидность 1 хештега
    if (re.test(hashtagSplit[i]) === true) {
      hashtags.push(hashtagSplit[i]);
    }
  }
  if (hashtags.length === hashtagSplit.length && hashtagSplit.length <= 5) {
    const isValid = pristine.validate();
    if (isValid) {
      showSuccessMessageModal();
      imgOverlay.classList.add('hidden');
      body.classList.remove('modal-open');
      photoUser.value = '';//позволяет загрузить одну и ту же фотку
      input.value = '';
    }
    else {
      showErrorMessageModal();
    }
  }
}
// escape и хештеги с коментами
/*function focusEscape() {
  console.log('f');
}
focusEscape();
input.addEventListener('focus', focusEscape, true);
//*/
