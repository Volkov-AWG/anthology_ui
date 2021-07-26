const express = require('express');
const {showHome, showTree, getTree, showUrl,
    getUrl, showTreebyId, showBranchbyId,
    showUrlsbyTreeId,showUrlsbyBranchId} = require('./helpers/Interface');
const app = express();


app.set('view engine', 'html')
   .use(express.urlencoded())
   .use(express.json())
   .route('/')
   .get(showHome)

app.set('view engine', 'html')
   .use(express.urlencoded())
   .use(express.json())
   .route('/treetable')
   .get(showTree)
   .post(getTree)

app.set('view engine', 'html')
    .use(express.urlencoded())
    .use(express.json())
    .route('/urltable')
    .get(showUrl)
    .post(getUrl)

app.get('/treebyid/:id', function (request, response){
        showTreebyId(request,response)
    })
app.get('/branchbyid/:id', function (request, response){
        showBranchbyId(request,response)
    })
app.get('/urlsbytreeid/:id', function (request, response){
        showUrlsbyTreeId(request,response)
    })
app.get('/urlsbybranchid/:id', function (request, response){
    showUrlsbyBranchId(request,response)
})

app.listen(4442, function(){   // порт 4444 можно указать любой свободный
    console.log('Api start')
})