//import { openWindow } from './form.js';
//окно с фото
const activeImg = document.querySelector('.big-picture');
const body = document.querySelector('body');
const socialCommentsCount = document.querySelector('.social__comment-count');
const bigPictureImg = document.querySelector('.big-picture__img');
const socialCaption = document.querySelector('.social__caption');
//комментарии
const commentsCount = document.querySelector('.comments-count');
const commentsList = document.querySelector('.social__comments');
const likesCount = document.querySelector('.likes-count');
const commentTemplateAll = document.querySelector('#comment').content;
const commentTemplate = commentTemplateAll.querySelector('li');
const bigPictureCansel = document.querySelector('#picture-cancel');
const loaderButton = document.querySelector('.comments-loader');
const commentsLoader = document.querySelector('.comments-loader');
const commentItem = document.querySelectorAll('.social__comment');
//генерация комментария
const createCommentPhotoUser = (commentsInfo) => {
  const commentFragment = document.createDocumentFragment();
  commentsInfo.forEach(({ avatar, name, message
  }) => {
    const comment = commentTemplate.cloneNode(true);
    comment.querySelector('img').src=avatar;
    comment.querySelector('img').alt=name;
    comment.querySelector('p').textContent=message;
    commentFragment.append(comment);
  });
  return commentFragment;
};

//функции взаимодействия с фото
const openBigPicture = () => {
  activeImg.classList.remove('hidden');
  body.classList.add('modal-open');
  commentItem[0].remove();
  commentItem[1].remove();
};

function close(){
  activeImg.classList.add('hidden');
  body.classList.remove('modal-open');
  commentsLoader.classList.remove('hidden');
  commentsList.innerHTML = '';
  bigPictureCansel.removeEventListener('click', close);
}
document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    activeImg.classList.add('hidden');
    body.classList.remove('modal-open');
    commentsLoader.classList.remove('hidden');
    commentsList.innerHTML = '';
  }
});
let arrayComments = [];
const COMMENTS_TO_SHOW=5;
// генерация открытых превьюшек
const createBigPhoto = (miniatures, description,likes,comments) => {
  bigPictureImg.querySelector('img').src = miniatures.querySelector('.picture__img').src;
  socialCaption.textContent = description;
  likesCount.textContent=likes;
  commentsCount.textContent = miniatures.querySelector('.picture__comments').textContent;
  arrayComments=comments;
  showFirstComments(comments);
  loaderButton.addEventListener('click', loadingCommentsClick);
  openBigPicture();
  bigPictureCansel.addEventListener('click',close);
};
//функции для загрузки комментариев
function showFirstComments(comments) {
  const firstComments = comments.slice(0, COMMENTS_TO_SHOW);
  const createFirstComments = createCommentPhotoUser(firstComments);
  socialCommentsCount.firstChild.textContent = `${firstComments.length} из  `;
  commentsList.appendChild(createFirstComments);
  if (firstComments.length === comments.length) {
    loaderButton.classList.add('hidden');
  }
}
function loadingCommentsClick() {
  const afterComments = arrayComments.slice(
    commentsList.children.length,
    commentsList.children.length + COMMENTS_TO_SHOW,
  );
  const createAfterComments = createCommentPhotoUser(afterComments);
  commentsList.appendChild(createAfterComments);
  if (arrayComments.length === commentsList.children.length) {
    loaderButton.classList.add('hidden');
  }
  socialCommentsCount.firstChild.textContent = `${commentsList.children.length} из  `;
}
export { createBigPhoto,createCommentPhotoUser};

