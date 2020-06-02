const bodyParser= require('body-parser')
const express = require('express');
const app = express();
const fs = require('fs');

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.listen(3000, function() {
    console.log('listening on 3000')
})

var users
var searchUsers = []

app.get('/', (req, res) => {
    fs.readFile('users.json', (err, data) => {
        users = JSON.parse(data)
        res.render('index.ejs', { users: users})
    })
})

app.post('/users', (req, res) => {
    var username = req.body.name.trim()

    if(username != "") {
        searchUsers = []

        users.forEach(function(user) {
            if(user.name == username) {
                searchUsers.push(user)
            }
         })
         res.render('search.ejs', { searchUsers: searchUsers})
    }
    else {
        res.render('index.ejs', { users: users})
    }
})