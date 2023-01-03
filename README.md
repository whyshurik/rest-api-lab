# rest-api-lab
endpoints:
POST /adduser
GET /users
POST /categories/addcategory
GET /categories
POST /records/addrecord/
GET /records/getuser/1520
GET /records/getcategory?userid=value1&categoryid=value2*
* - instead of value1 and value2 you enter your parameters


ВАРІАНТ #3 ОБЛІК ДОХОДІВ - СУТНІСТЬ BALANCE
У файлі .env описані дані рядку підключення. Для підключення до бази даних локально потрібно тільки створити нову базу даних у pgAdmin та
помістити дані цієї БД у змінних в файлі .env. Після запуску програми у терміналі за допомогою "npm run start" база даних ініціалізується та виведе повідомлення про це.
