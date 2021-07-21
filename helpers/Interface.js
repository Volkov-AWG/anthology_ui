const fs = require("fs");
const jsonData = require("./selectData.json"); // тут подцепляю JSON. Но у вас JSON оявляется в рез-те выполнения SELECT
const  getTree = async (request, response) => {
    // Туту вы вызываете Select запрос и в переменную сохраняете результат запроса JSON. Не забодте приминить await

    // Читаем файл index_.html сохраняем в локальную переменную data
    /*fs.readFile("./views/home.html", "utf-8", (error, data) => {
        let htmlData = ''; // Сюда будем сохранять данные в перемешку с html кодом
        jsonData.forEach(item => { // циклом пробегаемся по каждой строчке результата запрса
            // и в переменную htmlData сохраняем строку с данными из запроса в перемешку с html тегами.
            // В данном случае используем тег <li> </li> чтобы получился маркированный спаисок
            // А внутрь li вставляем наши данные из Select запроса
            // Используйте интерполяцию- это когда строки склеиваются не знако +, а как строчка ниже.
            htmlData += `<li>${item.name} ${item.lastname}</li>`
            // Опострофы ` а англ разкладке где буква 'ё'
            // ${ тут пременная откуда данные вставлять }

        })

        let message = "Изучаем Node.js";
        let header = "First микросервис на Node JS Volkov A.A. Test v0.0000000001";
        data = data.replace("{header}", header)
                   .replace("{message}", message)
                   .replace("{selectResult}", htmlData);
        response
            .status(200)
            .end(data);
    })*/

    fs.readFile("./views/home.html", "utf-8", (error, data) => {

        response
            .status(200)
            .end(data);
    })
}

const saveTree = async (request, response) => {
   console.log(request.body);
   const data = JSON.stringify(request.body);
   response
       .status(200)
       .end(data);
}
module.exports = {
    getTree,
    saveTree
}