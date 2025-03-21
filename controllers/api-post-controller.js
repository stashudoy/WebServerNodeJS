const Post = require('../models/post');



const handlerError = (res, error) => {
              //метод асинхронный поэтому мы можем отрендерить с нашими данными
       res.status(500).send(error);

};

const getPost = (req, res) => {
   
    Post
        .findById(req.params.id)
        .then((post) => res.status(200).json(post))
        .catch((error) => handlerError(res, error));
}


const deletePost = (req, res) => {
   
    Post
        .findByIdAndDelete(req.params.id)
        .then(() => res.status(200).json(req.params.id))
        .catch((error) => handlerError(res, error));
}



const editPost = (req, res) => {
    const { title, author, text} = req.body;
    const { id } = req.params;
    Post
        .findByIdAndUpdate(id, {title, author, text}, {new : true})       //данный метод ищет в БД элемент по id после чего обновляет поля новыми полученными данными
        .then((post) => res.status(200).json(post))
        .catch((error) => handlerError(res, error));
}

const getPosts = (req, res) => {
    
    Post
        .find()
        .sort({createdAt: -1})
        .then((posts) => res.status(200).json(posts))
        .catch((error) => handlerError(res, error));
}



const addPost = (req, res) => {
    const {title, author, text} = req.body;  //с помощью рекстуризации вытаскиваем данные из тела запроса.
    const post = new Post ({title, author, text});
    post
        .save()
        .then((post) => res.status(200).json(post))
        .catch((error) => handlerError(res, error));
}


module.exports = {
    getPost,
    deletePost,
    editPost,
    getPosts,
    addPost
};