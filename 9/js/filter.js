const effectList = document.querySelectorAll('.effects__item input ');

const img = document.querySelector('.img-upload__preview img');
const slider = document.querySelector('.effect-level__slider');
const sliderValue = document.querySelector('.effect-level__value');
//const sliderElement = document.querySelector('.effect-level');

const filterUpdate = {
  none: [0, 100, 1, '', ''],
  chrome: [0, 1, 0.1, 'grayscale', ''],
  sepia: [0, 1, 0.1, 'sepia', ''],
  marvin: [0, 100, 1, 'invert', '%'],
  phobos: [0, 3, 0.1, 'blur', 'px'],
  heat: [0, 3, 0.1, 'brightness', '']
};

noUiSlider.create(slider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
});

function effectСhoice(value,update){
  img.className='';
  img.classList.add(`effects__preview--${value}`);
  slider.noUiSlider.updateOptions({
    range: {
      min: update[0],
      max:update[1],
    },
    start: 100,
    step: update[2],
    connect: 'lower',
  });
  sliderUpdateFilter(update);
}

function sliderUpdateFilter(val){
  slider.noUiSlider.on('update', () => {
    sliderValue.value = slider.noUiSlider.get();
    img.style.filter =`${val[3]}(${val[1]}+${val[4]})`;
    console.log(sliderValue.value);
  });
}

function effectUser(){
  effectList.forEach((Element)=>{
    const effectClick = String(Element.value);
    Element.addEventListener( 'change',() =>{
      effectСhoice(effectClick,filterUpdate[effectClick]);
    },);
  });
}
effectUser();

