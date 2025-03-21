const Post = require('../models/post');
const createPath = require('../helpers/create-path');


const handlerError = (res, error) => {
              //метод асинхронный поэтому мы можем отрендерить с нашими данными
        console.log(error);
        res.render(createPath('error'), { title: 'Error'});

};

const getPost = (req, res) => {
    const title = 'Post';
    Post
        .findById(req.params.id)
        .then((post) => res.render(createPath('post'), {post, title }))
        .catch((error) => handlerError(res, error));
}


const deletePost = (req, res) => {
    const title = 'Post';
    Post
        .findByIdAndDelete(req.params.id)
        .then(result=> {
            res.sendStatus(200);
        })
        .catch((error) => handlerError(res, error));
}

const getEditPost = (req, res) => {
    const title = 'Edit Post';
    Post
        .findById(req.params.id)
        .then((post) => res.render(createPath('edit-post'), {post, title }))
        .catch((error) => handlerError(res, error));
}

const editPost = (req, res) => {
    const { title, author, text} = req.body;
    const { id } = req.params;
    Post
        .findByIdAndUpdate(id, {title, author, text})       //данный метод ищет в БД элемент по id после чего обновляет поля новыми полученными данными
        .then(result => res.redirect(`/posts/${id}`))
        .catch((error) => handlerError(res, error));
}

const getPosts = (req, res) => {
    const title = 'Post';
    Post
        .find()
        .sort({createdAt: -1})
        .then((posts) => res.render(createPath('posts'), {posts, title }))
        .catch((error) => handlerError(res, error));
}


// we use midleware in server urlencoded when send data 
const getAddPost = (req, res) => {
    const title = 'Add post';
    res.render(createPath('add-post'), {title});
};

const addPost = (req, res) => {
    const {title, author, text} = req.body;  //с помощью рекстуризации вытаскиваем данные из тела запроса.
    const post = new Post ({title, author, text});
    post
        .save()
        .then((result) => res.redirect('/posts'))
        .catch((error) => handlerError(res, error));
}


module.exports = {
    getPost,
    deletePost,
    getEditPost,
    editPost,
    getPosts,
    getAddPost,
    addPost
};