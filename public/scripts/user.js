/* eslint-disable import/extensions */
import {
  fetchLoggedInUser,
  logOutHandler,
  updateUsernameHandler,
  setNav,
} from './global.js';

const isAuthError = (err) => (err.status === 401 || err.status === 403);
const redirectToLogin = () => window.location.assign('/login.html');
const renderUsername = (username) => {
  document.querySelector('#username').textContent = username;
};

const main = async () => {
  const user = await fetchLoggedInUser();
  if (!user) return redirectToLogin();

  const logoutForm = document.querySelector('#logout-form');
  const updateUsernameForm = document.querySelector('#username-form');

  logoutForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    logOutHandler();
  });

  updateUsernameForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const [response, err] = await updateUsernameHandler(event.target);

    if (err) return isAuthError(err) ? redirectToLogin() : alert('Something went wrong');
    renderUsername(response.username);

    event.target.reset();
  });

  updateUsernameForm.dataset.userId = user.id;

  setNav(!!user);
  renderUsername(user.username);


  const postContainer = document.querySelector('#post-container');
  const formElement = document.querySelector('#postForm');
  const urlElement = document.querySelector('#url');
  const captionElement = document.querySelector('#caption');



  const createCommentButton = () => {
    const button = document.createElement('button');
    button.innerText = 'View Comments';
    return button;
  };

  

  const createDeleteButton = () => {
    const button = document.createElement('button');
    button.innerText = 'Delete Post';
    // button.addEventListener('click', deletePost);
    return button;
  };



  const createUpdatePostButton = () => {
  const button = document.createElement('button');
  button.innerText = 'Update post';
  // button.addEventListener('click', updatePost);
  return button;
};


  const displayPost = (post) => {
    const div = document.createElement('div');
    const img = document.createElement('img');
    const caption = document.createElement('p');
    const commentButton = createCommentButton();
    const deleteButton = createDeleteButton();
    const updatePostButton = createUpdatePostButton();
    div.setAttribute('data-post-id', post.id);
    img.src= post.img;
    caption.innerText = post.caption_text;
    div.append(img, caption, commentButton, updatePostButton, deleteButton);
    postContainer.append(div);
   

    img.style.width = '300px';
    img.style.height = '250px';
    img.style.paddingTop = '25px';
    modal.style.display = "none"

    deleteButton.addEventListener('click', deletePost);
    commentButton.addEventListener('click', postComment)


  }

  function displayComments(text, comment){
    const list = document.createElement('li')
    list.innerText = text
    comment.append(list)
  }

  async function postComment(event) {
  const modal = document.getElementById("modal123");
  const span = document.getElementById("submit-btn123")[0];
  const post_button = document.querySelector("#post-comment")
  const comment = document.querySelector('#view-comments')
  const postId = event.target.parentNode.dataset.postId;
  modal.setAttribute('data-post-id', postId)
  // modal.dataset = postId
  
  const comments = await viewPost(event)
  console.log(comments)

  modal.style.display = "block"
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
  // span.addEventListener('click', closed) 
  // function closed(){
    
  // }
  
  comments.forEach( text => {
    displayComments(text.comment_text, comment)
    // const list = document.createElement('li')
    // list.innerText = text.comment_text
    // comment.append(list)
  })

  post_button.addEventListener('click', postButton)


  }

const postButton = async (event) => {
  const commentElement = document.querySelector('#view-comments')
  const comment = document.querySelector('#caption123')
  const postId = event.target.parentNode.parentNode.parentNode.attributes[2].value
  
  console.log(event)
  
    const options = {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({comment_text:comment.value, post_id:postId}),
      headers: { 'Content-Type': 'application/json' }
    };
    
    const response = await fetch(`/comments`, options);
    const data = await response.json()
    if (!response.ok) {
      console.error('Failed to make post');
      alert('Failed to post');
      return;
    }
    displayComments(data.comment_text, commentElement)
    comment.value = null;
    
    
}







  const viewPost = async (event) => {
    const postId = event.target.parentNode.dataset.postId;
    const options = {
      method: 'GET',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' }
    };
    const response = await fetch(`/comments/${postId}`, options);
  
    if (!response.ok) {
      console.error('Failed to delete post');
      alert('Failed to delete post');
      return;
    }
    const data = await response.json()
    return data
  
  };


  const deletePost = async (event) => {
    const postId = event.target.parentNode.dataset.postId;
    const options = {
      method: 'DELETE',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' }
    };
    const response = await fetch(`/posts/${postId}`, options);
  
    if (!response.ok) {
      console.error('Failed to delete post');
      alert('Failed to delete post');
      return;
    }
    event.target.parentNode.remove();
  };


  const getPosts = async () => {
    const options = { method: 'GET', credentials: 'include', headers: { 'Content-Type': 'application/json' }};
    const [res, _err] = await handleFetch('/posts', options);
    console.log(res, _err);
    res.forEach(post => displayPost(post));
  }

  getPosts();

  formElement.addEventListener('submit', async (e) => {
    e.preventDefault();
    const url = urlElement.value;
    const caption = captionElement.value;
    // console.log(url, caption)
    const [res, _err] = await handleFetch('/posts', getFetchOptions({ url, caption}));
    console.log(res, _err)
    displayPost(res);
  });

  // Creates the modal and closes it
  const modal = document.getElementById("modal");
  const btn = document.getElementById("open-modal-btn");
  const span = document.getElementById("submit-btn")[0];

  btn.onclick = function() {
    urlElement.value = null
   captionElement.value = null
    modal.style.display = "block";
  }

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
  span.addEventListener('click', closed) 
  
  function closed(){
    
  }
};

main();
