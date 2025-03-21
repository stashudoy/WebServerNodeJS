const express = require('express');
const router = express.Router();         //Конструктор роутеров, чтоб работать с роутерами
const Contact = require('../models/contact');
const createPath = require('../helpers/create-path');
const {getContacts} = require('../controllers/contact-controller');

router.get('/contacts', getContacts); 




module.exports = router;