const express = require('express');
const router = express.Router();         //Конструктор роутеров, чтоб работать с роутерами
const {
     getPost,
     deletePost,
     editPost,
     getPosts,
     addPost
    } = require('../controllers/api-post-controller');



// Get All posts

router.get('/api/posts', getPosts);

// Add post

router.post('/api/post', addPost);

// Change post

router.put('/api/post/:id', editPost);

// Delete post

router.delete('/api/post/:id', deletePost);

// Get post by id

router.get('/api/post/:id', getPost);




module.exports = router;
