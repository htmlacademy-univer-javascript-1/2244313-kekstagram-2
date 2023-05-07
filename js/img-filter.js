import { createRandom } from './util.js';
import { createMiniatures } from './miniatures.js';
import { debounce } from './util.js';
const pictureContainer = document.querySelector('.pictures');
//смена фильтров кнопки
const imgFilterForm = document.querySelector('.img-filters__form');
const buttonFilter = imgFilterForm.querySelectorAll('[type = "button"]');
function buttonFilterClick(){
  buttonFilter.forEach((button)=>{
    button.onclick = function () {
      const activeButtonFilter = document.querySelector('.img-filters__button--active');
      activeButtonFilter.classList.remove('img-filters__button--active');
      button.classList.add('img-filters__button--active');
    };
  });
}
buttonFilterClick();

const buttonDefault = document.querySelector('#filter-default');
const buttonRandom = document.querySelector('#filter-random');
const buttonDiscussed = document.querySelector('#filter-discussed');

//случайные фото
function generateArray(length){
  return [...new Array(length)].map(createRandom(0,24));
}

function createRandomPhotos(photos) {const arrayIndexPhotos = generateArray(10);
  const resultRandomPhoto=[];
  for (let i = 0; i < arrayIndexPhotos.length; i++) {
    for (let j = 0; j < photos.length; j++) {
      if (arrayIndexPhotos[i] === photos[j].id) {
        resultRandomPhoto.push(photos[j]);
      }
    }
  }
  return resultRandomPhoto;
}
//по-умолчанию
function createDefaultPhotos (photos) {
  return photos;
}
// обсуждаемые
function createDiscussedPhotos(photos) {
  const arrayCopyPhotos = photos.slice();
  arrayCopyPhotos.sort((a, b) => b.comments > a.comments ? 1 : -1);
  return arrayCopyPhotos;
}

function clearMiniaturesList() {
  pictureContainer.querySelectorAll('.picture').forEach((p) => p.remove());
}
function callback (cb){
  clearMiniaturesList();
  createMiniatures(cb);
}
const RERENDER_DELAY = 500;
const sort = (description) => {
  buttonRandom.addEventListener('click', debounce(() => callback(createRandomPhotos(description)), RERENDER_DELAY));
  buttonDefault.addEventListener('click', debounce(() => callback(createDefaultPhotos(description)), RERENDER_DELAY));
  buttonDiscussed.addEventListener('click', debounce(() => callback(createDiscussedPhotos(description)), RERENDER_DELAY));};

export{createRandomPhotos,createDefaultPhotos,createDiscussedPhotos,clearMiniaturesList,sort};

