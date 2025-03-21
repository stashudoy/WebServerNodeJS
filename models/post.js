//Внутри этого файла опишем схему нашего поста

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({

    text: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    

}, {timestamps: true});


const Post = mongoose.model('Post', postSchema);    //Post - имя модели

module.exports = Post;


