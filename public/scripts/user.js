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

  const displayPost = (post) => {
    const div = document.createElement('div');
    const img = document.createElement('img');
    const caption = document.createElement('p');
    div.setAttribute('data-post-id', post.id);
    img.src= post.img;
    caption.innerText = post.caption_text;
    div.append(img, caption);
    postContainer.append(div);

    img.style.width = '300px';
    img.style.paddingTop = '25px';

  }

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
    console.log(url, caption)
    const [res, _err] = await handleFetch('/posts', getFetchOptions({ url, caption}));
    console.log(res, _err)
    displayPost(res);
  });

  // let viewComments = document.querySelector('#view-comments-btn')

  // viewComments.addEventListener('click', commentHelper)

  // function commentHelper(){
    
  // }


};

main();
