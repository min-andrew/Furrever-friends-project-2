let like;
function likeClick(like = 0) {

    return function (e) {

      const likeBar = e.target.closest('.like-bar');
      const likeNumber = likeBar.querySelector('p');
  
      likeNumber.textContent = ++like;
    }
  }

  const getLike = document.querySelectorAll('.like');
  
  getLike.forEach(like => like.addEventListener('click', likeClick(), false));

