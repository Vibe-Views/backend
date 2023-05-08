const express = require('express');
const userController = require('./controllers/user');
const postController = require('./controllers/post');
const commentController = require('./controllers/comment');
const addModels = require('./middleware/add-models');
const checkAuthentication = require('./middleware/check-authentication');


const Router = express.Router();
Router.use(addModels);

Router.get('/cookieCounter', (req, res) => {
  const { session } = req;
  console.log(session);
  session.viewCount = (session.viewCount || 0) + 1;
  console.log(session.viewCount);
  res.status(200).send({ count: session.viewCount });
});

// ---------USERS------------
Router.post('/users', userController.create);
Router.post('/users/login', userController.login);
Router.get('/users', userController.list);
Router.get('/users/:id', userController.show);
Router.patch('/users/:id', checkAuthentication, userController.update);
Router.delete('/users/logout', userController.logout);
Router.get('/me', userController.showMe);
Router.get('/logged-in-secret', checkAuthentication, (req, res) => {
  res.send({ msg: 'The secret is: there is no secret.' });
});

// ---------POSTS------------
// Router.post('users/posts', userController.post)
// Router.post('user/comments', userController.comment)
// Router.patch('/posts/:id', postController.update)

Router.get('/posts', postController.list)
Router.post('/posts', postController.create)
Router.delete('/posts/:id', postController.deleted)
Router.patch('/posts/:id', postController.update)





// Router.delete('/posts/:id', postController.deletePost)

// ---------COMMENTS------------
Router.post('/comments', commentController.create);
Router.delete('/comments', commentController.deleted);
Router.get('/Comments/:post_id',  commentController.list)




module.exports = Router;
