const http = require('http');
const fs = require('fs');           //модуль для работы с файловой системой
const path = require('path');       //модуль для формирования корректного пути

/*Создаем сервер с помощью колбэк ф-ии, которая будет запускаться каждый раз, когда
к серверу идет какое нибудь обращение. 
- Ф-ия получает два аргумента: объект запроса и объект ответа*/



const PORT = 3000;


const server = http.createServer((req, res) => {

  /*Логирование запроса: каждый раз когда идет обращение к серверу, 
  мы будем отправлять сообщ в консолль */

  console.log('Server request');  
  console.log(req.url, req.method);

  /* Отправим что-нибдуь в ответ с сервера для этого воспользуемся объектом response -> res, у которого есть 2 метода, write() и end()
  p.s. setHeader() указывает тип возвращаемого контента  */

  res.setHeader('Content-Type', 'text/html');

  //__dirname - Глобальный объект, с помощью которого можно получить путь до исполняемого скрипта. 
  // модуль pass справляется с различиями где разные файловые системы используют как / так и \

  const createPath = (page) => path.resolve(__dirname, 'views', `${page}.html`);

  let basePath = '';
  
  switch(req.url){
    case '/home':
    case '/index.html':     
    case '/':
        basePath = createPath('index');
        res.statusCode = 200;
        break;
    case '/about-us':
        res.statusCode = 301;   //301 information that redirect is controled by server
        res.setHeader('Location', '/contacts');
        res.end();
        break;    
    case '/contacts':
        basePath = createPath('contacts');
        res.statusCode = 200;
        break;
    default:    
        basePath = createPath('error');
        res.statusCode = 404;
        break;
  }


fs.readFile(basePath, (err,data) => {
    if(err) {
            console.log(err);
            res.statusCode = 500;
            res.end();
        }
        else {
            res.write(data);
            res.end();
    }
        
})
  

});



//   res.write('Hello, tester');
/*Создадим массив и обернем его в JSON.stringigy 

const data = JSON.stringify([
     {name: 'Tester', age: 42},
   { name: 'Boxer', age: 42}
 ]);*/

  
  



/* Указываем порт который будет слушать серверб, по умолчанию 3000, и 3м параметром  
выводится ошика, чтоб зать что пошло не так*/

server.listen(PORT, 'localhost', (error) => {
    error? console.log(error) : console.log(`listening port ${PORT}`);
});



        
