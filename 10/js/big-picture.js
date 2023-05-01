
//окно с фото
const activeImg = document.querySelector('.big-picture');
const body = document.querySelector('body');
const showFiveComments = 5;
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
const createCommentPhotoUser = (commentInfo) => {
  const commentsUsers = commentTemplate.cloneNode(true);
  commentsUsers.querySelector('img').src=commentInfo.avatar;
  commentsUsers.querySelector('img').alt=commentInfo.name;
  commentsUsers.querySelector('p').textContent=commentInfo.message;
  return commentsUsers;
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
const COMMENTS_TO_SHOW=5;
// генерация открытых превьюшек
const createBigPhoto = (miniatures, description,likes,comments) => {
  bigPictureImg.querySelector('img').src = miniatures.querySelector('.picture__img').src;
  socialCaption.textContent = description;
  likesCount.textContent=likes;
  commentsCount.textContent = miniatures.querySelector('.picture__comments').textContent;
  //загрузка первых 5 комментариев сначала
  comments.slice(0,5).forEach((comment) => {
    const newComment = createCommentPhotoUser(comment);
    commentsList.appendChild(newComment);
  });
  //если комментов до 5
  if (commentsCount.textContent <= showFiveComments) {
    socialCommentsCount.firstChild.textContent = ` ${commentsCount.textContent} из  `;
    loaderButton.classList.add('hidden'); }
  //если комментов больше 5
  if (commentsCount.textContent > showFiveComments) {
    socialCommentsCount.firstChild.textContent = ` ${showFiveComments} из  `;
    //клик по кнопке загрузить еще
    loaderButton.addEventListener('click', () => {
      //загрузка вторых 5 комментариев
      comments.slice(commentsList.children.length, COMMENTS_TO_SHOW + commentsList.children.length).forEach((comment) => {
        const newComment = createCommentPhotoUser(comment);
        commentsList.appendChild(newComment);
      });
      //если комментов 6-10 штук
      if (commentsList.children.length === Number(commentsCount.textContent)) {
        loaderButton.classList.add('hidden');
        socialCommentsCount.firstChild.textContent = ` ${commentsCount.textContent} из  `;
      }
      //если больше 10
      else { socialCommentsCount.firstChild.textContent = ` ${commentsList.children.length} из  ` ;
        loadingComments(comments);
      }
    }, { once: true }
    );

  }
  openBigPicture();
  bigPictureCansel.addEventListener('click',close);
  commentsList.removeEventListener('click', loadingComments);
};
//функция для подгрузки комментариев???
function loadingComments(comments){
}
export { createBigPhoto,createCommentPhotoUser};

