//Внутри этого файла опишем схему нашего поста

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const contactSchema = new Schema({

    name: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
  
    

}, {timestamps: true});


const Contact = mongoose.model('Contact', contactSchema);    //Post - имя модели

module.exports = Contact;


