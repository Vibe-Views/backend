/* eslint-disable import/extensions */
// import {
//   fetchLoggedInUser,
//   handleFetch,
//   setNav,
// } from './global.js';

// const main = async () => {
//   const user = await fetchLoggedInUser();
//   setNav(!!user);

//   const [secret, _err] = await handleFetch('/logged-in-secret');
//   console.log('secret, _err:', secret, _err);
//   if (secret) {
//     document.querySelector('#secret-message').textContent = secret.msg;
//   }

  // const postContainer = document.querySelector('#post-container');
  // const formElement = document.querySelector('#postForm');
  // const urlElement = document.querySelector('#url');
  // const captionElement = document.querySelector('#caption');

  // const displayPost = (post) => {
  //   const div = document.createElement('div');
  //   const img = document.createElement('img');
  //   const caption = document.createElement('p');
  //   img.src= post.img;
  //   caption.innerText = post.caption_text
  //   div.append(img, caption);
  //   postContainer.append(div);
  // }

  // formElement.addEventListener('submit', async (e) => {
  //   e.preventDefault();
  //   const url = urlElement.value;
  //   const caption = captionElement.value;
  //   console.log(url, caption)
  //   const [res, _err] = await handleFetch('/posts', getFetchOptions({ url, caption}));
  //   console.log(res, _err)
  //   displayPost(res);
  // });
// };

// main();

import {
  fetchLoggedInUser,
  getFetchOptions,
  handleFetch,
  setNav,
} from "./global.js";

const logoutForm = document.querySelector('#logout-form');
const redirectToLogin = () => window.location.assign("/login.html"); //go to log in page

const main = async () => {
  const user = await fetchLoggedInUser(); //gets the user information (rly just the user_id if there is a logged in user)
  if (!user) return redirectToLogin(); // if theres no user, redirect them to login (code above)
  setNav(!!user); //if there is a user, give them the logged in user nav bar(as opposed to no user nav bar (it has different links))

  //the code you wanna write (handle fetches, more dom, whatever)
}
logoutForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  logOutHandler();
});

main()
