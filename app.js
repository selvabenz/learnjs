const express = require("express");
const path = require("path");
const mysql = require("mysql2");
const dotenv = require('dotenv');
const hbs = require("hbs");
const cookieParser = require("cookie-parser");

dotenv.config({ path: './.env'});
const app = express();
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})

const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set('view engine', 'hbs');

db.connect((error) => {
    if(error) {
        console.log(error);
    } else {
        console.log("MySql Connected!");
    }
})

app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));

/*
app.get("/", (req,res) => {
 //   res.send("<h1> Happy to start the project</h1>")
    res.render("index")
});

app.get("/signup", (req,res) => {
    //   res.send("<h1> Happy to start the project</h1>")
       res.render("signup")
   });   
*/
app.listen(7000, () => {
    console.log("Server started on Port 7000");

})