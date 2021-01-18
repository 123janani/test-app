const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express()

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
    res.render('index', {recipie: null, error: null});
})

app.post('/', function (req, res) {
    var foods = req.body.food;

    var url = 'https://api.edamam.com/search'+foods;

    request(url, function(err, response, body) {
        if(err) {
            res.render('index', {recipie: null, error: url});
        }else {
            var resipie = JSON.stringify(body)

            if (resipie.main == undefined) {
                res.render('index', {recipie: null, error: 'Error 2'});
            }else {
                var foodText = 'Its'+ recipie;
                res.render('index', {recipie: foodText, error: null});
            }
        }
    });


})

app.listen(3000, function() {
    console.log('Example app listening on port 3000');
});