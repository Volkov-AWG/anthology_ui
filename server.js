const express = require('express');
const {getTree, saveTree} = require('./helpers/Interface');
const app = express();


app.set('view engine', 'html')
   .use(express.urlencoded())
   .use(express.json())
   .route('/interface')
   .get(getTree)
   .post(saveTree)

app.listen(4442, function(){   // порт 4444 можно указать любой свободный
    console.log('Api start')
})