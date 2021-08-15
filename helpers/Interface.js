const fs = require("fs");
const axios = require ('axios');
let body = "", htmlData_tree = "", htmlData_url = "";

const  showHome = async (request, response) => {
    fs.readFile("./views/home.html", "utf-8", (error, data) => {

        response
            .status(200)
            .end(data);
    })
}

const showTree = async (request, response) => {
    fs.readFile("./views/tree_table.html", "utf-8", (error, data) => {

        data = data.replace("{selectResult}", htmlData_tree);
        htmlData_tree = "";
        response
            .status(200)
            .end(data);
    })
}
const getTree = async (request, response) => {
    body = "", htmlData_tree = "";
    let name = encodeURIComponent(request.body.name);
    let desc = encodeURIComponent(request.body.desc)
    const reqToHost = async () => {
        try {
            return await axios.get(`http://10.7.0.4:4402/ui/anthology?name=${name}&desc=${desc}`);
        } catch (error) {
            console.error(error)
        }
    }
    body = await reqToHost();

    let htmlData_buffer = "";
    Object.values(body.data).forEach(item => {
        htmlData_buffer += `<tr> <td>${item.id}</td> <td><a href='/branchbyid/${item.id}'>${item.name}</a></td> <td>${item.description}</td> 
        <td>${JSON.stringify(item.content)}</td><td><a href='/urlsbytreeid/${item.id}'>Список документов</a></td></tr>`
    } );
    htmlData_tree = "<table><tr><th>id дерева</th><th>Название</th><th>Описание</th><th>Содержание</th></tr>" + htmlData_buffer + "</table>";
}

const showUrl = async (request, response) => {
    fs.readFile("./views/url_table.html", "utf-8", (error, data) => {

        data = data.replace("{selectResult}", htmlData_url);
        htmlData_url = "";
        response
            .status(200)
            .end(data);
    })
}
const getUrl = async (request, response) => {
    body = "", htmlData_url = ""; let tid = "", bid = "", dopt = "",dopb = "";
    if (request.body.treeid !== undefined){
        dopt = "&treeid="; tid = request.body.treeid
    }
    if (request.body.branchid !== undefined){
        dopb = "&branchid="; bid = request.body.branchid
    }
    let treename = encodeURIComponent(request.body.treename);
    let keys = encodeURIComponent(request.body.keys);
    let name = encodeURIComponent(request.body.name);
    let auth = encodeURIComponent(request.body.auth);
    let jour = encodeURIComponent(request.body.jour);

    const reqToHost = async () => {
        try {
            return await axios.get(`http://10.7.0.4:4402/ui/urllist?treename=${treename}&keys=${keys}&name=${name}&auth=${auth}&jour=${jour}${dopt}${tid}${dopb}${bid}`);
        } catch (error) {
            console.error(error)
        }
    }
    body = await reqToHost();
    let htmlData_buffer = "";
    Object.values(body.data).forEach(item => {
        htmlData_buffer += `<tr>
                <td>${item.treeid}</td> 
                <td>${item.branchid}</td> 
                <td>${item.treename}</td> 
                <td>${item.keys}</td> 
                <td>${item.name}</td> 
                <td>${item.annotation}</td> 
                <td>${item.link}</td> 
                <td>${item.authors}</td>
                <td>${item.journal}</td> 
                <td>${item.journal_link}</td>
                </tr>`
    } );
    htmlData_url = "<table><tr><th>id дерева</th>" +
        "<th>id ветки</th>" +
        "<th>Название дерева</th>" +
        "<th>Ключевые слова ветки</th>" +
        "<th>Название статьи</th>" +
        "<th>Аннотация</th>" +
        "<th>Ссылка на статью</th>" +
        "<th>Авторы статьи</th>" +
        "<th>Название журнала</th>"+
        "<th>Ключевые слова ветки</th></tr>" + htmlData_buffer + "</table>";
}

const showTreebyId = async (request, response) => {

    body = "";
    const reqToHost = async () => {
        try {
            return await axios.get(`http://10.7.0.4:4402/ui/treebyid?id=${request.params.id}`);
        } catch (error) {
            console.error(error)
        }
    }
    body = await reqToHost();
    fs.readFile("./views/show_one.html", "utf-8", (error, data) => {
    let htmlData_buffer = "";
        Object.values(body.data).forEach(item => {
            htmlData_buffer = "<table><tr><th>id дерева</th><th>Название</th><th>Описание</th><th>Содержание</th></tr>" +
                `<tr> <td>${item.id}</td> <td>${item.name}</td> <td>${item.description}</td> <td>${JSON.stringify(item.content)}</td></tr>` +
                "</table>";
        } );




        data = data
                   .replace("{description}", "<p>Данные о дереве, к которому относится данная ветка</p>")
                   .replace("{selectResult}", htmlData_buffer)
        htmlData_buffer = "";
        response
            .status(200)
            .end(data);
    })
}
const showBranchbyId = async (request, response) => {

    body = "";
    const reqToHost = async () => {
        try {
            return await axios.get(`http://10.7.0.4:4402/ui/branchbyid?id=${request.params.id}`);
        } catch (error) {
            console.error(error)
        }
    }
    body = await reqToHost();

    fs.readFile("./views/show_one.html", "utf-8", (error, data) => {
        let htmlData_buffer = "";
        Object.values(body.data).forEach(item => {
            htmlData_buffer += `<tr> <td>${item.id}</td> <td>${item.treeid}</td> <td>${item.keys}</td> <td><a href='/urlsbybranchid/${item.id}'>Список документов</a></td></tr>`
        } );
        htmlData_buffer = "<table><tr><th>id ветки</th><th>id дерева</th><th>Ключевые слова</th></tr>" + htmlData_buffer + "</table>";

        data = data
            .replace("{description}", "<p>Сведения о ветках, относящихся к дереву</p>")
            .replace("{selectResult}", htmlData_buffer)
        htmlData_buffer = "";
        response
            .status(200)
            .end(data);
    })
}
const showUrlsbyTreeId = async (request, response) => {

    body = "";
    const reqToHost = async () => {
        try {
            return await axios.get(`http://10.7.0.4:4402/ui/urlsbytreeid?id=${request.params.id}`);
        } catch (error) {
            console.error(error)
        }
    }
    body = await reqToHost();

    fs.readFile("./views/show_one.html", "utf-8", (error, data) => {
        let htmlData_buffer = "";
        Object.values(body.data).forEach(item => {
            htmlData_buffer += `<tr> <td>${item.treeid}</td> <td>${item.branchid}</td> <td>${item.name}</td> <td>${item.annotation}</td> 
            <td>${item.link}</td> <td>${item.authors}</td> <td>${item.journal}</td> <td>${item.journal_link}</td></tr>`
        } );
        htmlData_buffer = "<table><tr><th>id дерева</th><th>id ветки</th><th>Название статьи</th><th>Аннотация</th><th>Ссылка на статью</th><th>Авторы</th>" +
            "<th>Название журнала</th><th>Ссылка на журнал</th></tr>" + htmlData_buffer + "</table>";

        data = data
            .replace("{description}", "<p>Список документов, относящихся к дереву</p>")
            .replace("{selectResult}", htmlData_buffer)
        htmlData_buffer = "";
        response
            .status(200)
            .end(data);
    })
}
const showUrlsbyBranchId = async (request, response) => {

    body = "";
    const reqToHost = async () => {
        try {
            return await axios.get(`http://10.7.0.4:4402/ui/urlsbybranchid?id=${request.params.id}`);
        } catch (error) {
            console.error(error)
        }
    }
    body = await reqToHost();
    fs.readFile("./views/show_one.html", "utf-8", (error, data) => {
        let htmlData_buffer = "";
        Object.values(body.data).forEach(item => {
            htmlData_buffer += `<tr> <td>${item.treeid}</td> <td>${item.branchid}</td> <td>${item.name}</td> <td>${item.annotation}</td> 
            <td>${item.link}</td> <td>${item.authors}</td> <td>${item.journal}</td> <td>${item.journal_link}</td></tr>`
        } );
        htmlData_buffer = "<table><tr><th>id дерева</th><th>id ветки</th><th>Название статьи</th><th>Аннотация</th><th>Ссылка на статью</th><th>Авторы</th>" +
            "<th>Название журнала</th><th>Ссылка на журнал</th></tr>" + htmlData_buffer + "</table>";

        data = data
            .replace("{description}", "<p>Список документов, относящихся к дереву</p>")
            .replace("{selectResult}", htmlData_buffer)
        htmlData_buffer = "";
        response
            .status(200)
            .end(data);
    })
}

module.exports = {
    showHome, showTree, getTree, showUrl,
    getUrl, showTreebyId, showBranchbyId,
    showUrlsbyTreeId, showUrlsbyBranchId
}
