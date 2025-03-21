const express = require('express');
const chalk = require('chalk');
const morgan = require('morgan');
const app = express();   //создаем констаннту app в которую определяем вызов express()
const mongoose = require('mongoose');
require('dotenv').config(); //никуда не присваиваем а просто добавляем в наши модули
const methodOverride = require('method-override');
const postRoutes = require('./routes/post-routes');
const postApiRoutes = require('./routes/api-post-routes');
const contactRoutes = require('./routes/contact-routes');
const createPath = require('./helpers/create-path');

// const errorMsg = chalk.bgKeyword('white').redBright;
// const successMsg = chalk.bgKeyword('green').white;


/*Подключение шаблонизатора */
//Первое подключаем ejs в качестве view engine
//Второе: изменяем ф-ию createPath -> название папки и расширение файлов
//Третье меняем в роутах файлов метод sendFile на render

app.set('view engine', 'ejs');




mongoose
    .connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((res) => console.log('Connect to DB'))
    .catch((error) => console.log(error));


app.listen(process.env.PORT,  (error) => {
    error? console.log(error) : console.log(`listening port ${process.env.PORT}`);
});

/*Cоздаем промежуточно ПО, которое должно заканчиваться на next*/
// app.use((req, res, next) => {
//     console.log(`path: ${req.path}`);
//     console.log(`method: ${req.method}`);
//     next();           
// });

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));  //промежуточное ПО, которое логирует (показывает метод и др. значения)

app.use(express.urlencoded({extended: false}));

app.use(express.static('styles'));

app.use(methodOverride('_method'));

app.use(postRoutes);

app.use(contactRoutes);

app.use(postApiRoutes);





app.get('/', (req, res) => {
    const title = 'Home';
    res.render(createPath('index'), { title });
  });  //метод get отправляет данные в брузер, испльзуя два метода rout и callback ф-ия, которая будет вызываться.



  app.get('/about-us', (req, res) => {
    
    res.redirect('/contacts');
    

});


app.use( (req, res)=> {
    const title = '404 Page not found';
    res.statusCode = 404;
    res.render(createPath('error'), {title});
    

}); //здесь мы создали midleware которое будет перехватывать запросы и выдавать ошибку