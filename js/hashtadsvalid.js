const input = document.querySelector('.text__hashtags');//относится к хештегу!
const inputComments = document.querySelector('.text__description');
const MAX_HASHTAG_NUMBERS = 5;
const MAX_COMMENTS_LENGTH = 140;
//отмена escape для хештегов и комментов
input.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    evt.stopPropagation();
  }
});
inputComments.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    evt.stopPropagation();
  }
});
function commentLength (){
  const injectedСomments = inputComments.value;
  if (injectedСomments.length > MAX_COMMENTS_LENGTH){
    return false;
  }
  return true;
}

//валидация хештегов
//ПРОВЕРКА ПО СИМВОЛАМ
function isEveryHashtagSymbolsValid(elem) {
  const re = /^((#[A-Za-zА-Яа-яЁё0-9]{1,19})\s*|)+$$/;
  return re.test(elem);
}
function isHashtagSymbolsValid() {
  const hashtags = input.value.toLowerCase().trim().split(' ');
  if (hashtags.every(isEveryHashtagSymbolsValid)) { return true; }
  else { return false; }
}

//проверка что их не больше 5
function isAmountValid() {
  const hashtags = input.value.toLowerCase().split(' ');
  if (hashtags.length <= MAX_HASHTAG_NUMBERS) { return true; }
  else { return false; }
}
//прверка что каждый хештег уникален
function areHashtagsUnique() {
  const hashtags = input.value.toLowerCase().trim().split(' ');
  const uniqueHashTagArray = new Set(hashtags);
  if (hashtags.length !== uniqueHashTagArray.size) {
    return false;
  }
  else { return true; }
}

function hashtagsValid(value) {
  const hashtags = value.toLowerCase().trim().split(' ');
  const injectedСomments = input.value.toLowerCase().trim().split(' ');
  if (isAmountValid(hashtags) && areHashtagsUnique(hashtags) && isHashtagSymbolsValid(hashtags) && commentLength(injectedСomments)) {
    return true;
  }
  else { return false; }
}
export { input, hashtagsValid, inputComments, isEveryHashtagSymbolsValid, isAmountValid, areHashtagsUnique, commentLength};
