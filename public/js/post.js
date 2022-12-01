const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#post-title').value.trim();
  const body = document.querySelector('#post-body').value.trim();
  const image = document.querySelector('#image');
  const formData = new FormData(document.querySelector(".form"));

  if (title && body && image) {
    const response = await fetch(`/api/post`, {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      document.location.replace('/post');
    } else {
      alert('Failed to create post');
    }
  }
};

const deleteBtnHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');
    console.log(id)
    const response = await fetch(`/api/post/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/post');
    } else {
      alert('Not your post to delete! Woof!');
    }
  }
};

document
  .querySelector('.new-post-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.post-listz')
  .addEventListener('click', deleteBtnHandler);

