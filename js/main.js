//Функция getRandomPositiveInteger, возвращающая случайное целое число из переданного диапазона включительно
function getRandomPositiveInteger (a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}
//Функция, генерирующаю число,которое не повторяется из диапазона включительно
function createRandom (min, max) {
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
const generateNumber = createRandom(1, 25);
const generateNumberComment = createRandom(0, 1000);

const MESSAGE = ['Всё отлично!',
  'В целом всё неплохо.Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают.Как можно было поймать такой неудачный момент ? !',];
const randomIndexMessage = getRandomPositiveInteger(0, MESSAGE.length - 1);

const NAME = ['Anna', 'Ivan', 'Maria', 'Bob', 'Rob',];
const randomIndexName = getRandomPositiveInteger(0, NAME.length - 1);

const IMG = ['img/avatar - 1.svg', 'img/avatar - 2.svg', 'img/avatar - 3.svg', 'img/avatar - 4.svg', 'img/avatar - 5.svg', 'img/avatar - 6.svg'];
const randomIndexImg = getRandomPositiveInteger(0, IMG.length-1);

// Функция,возвращающая объект данных- описание фотографии, опубликованной пользователем.
const createDescriptionPhotoUser = () => ({
  return :{
    id: generateNumber(),
    url: `photos/${ generateNumber() }.jpg`,
    description: 'Фото для Кекстаграма',
    likes: getRandomPositiveInteger(15,200),
    comments:[{
      id:generateNumberComment(),
      avatar:IMG[randomIndexImg],
      message:MESSAGE[randomIndexMessage],
      name: NAME[randomIndexName],
    },] ,
  }
});

//Функция, для вызова N-го количества раз
const numberPhotoUsers = Array.from({length:25},createDescriptionPhotoUser);

numberPhotoUsers();

