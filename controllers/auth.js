const mysql = require("mysql2");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});
/*
exports.index = async (req, res) => {

    try{

        const { email, password} = req.body;
        
        if(!email || !password ) {
            return res.status(400).render('index', {
                message: 'You need a email and password'
            })
        }

    db.query('SELECTOR = FROM users WHERE email = ?', [email], async (error, results) =>{

        if (!results || !(await bcrypt.compare(password, results[0].password)) )
        console.log(results)    
            res.status(400).render('index', {
                message: 'The eamil or password it is not correct'
            })
    })    

    } catch (error) {
        console.log(error);
    }
}
*/
exports.signup = (req, res) => {
    console.log(req.body);

    const { name, email, password, passwordConfirm } = req.body;

db.query('SELECT email FROM users WHERE email = ?', [email], async (error, results) => {
    if(error){
        console.log(error);
    }

    if( results.length > 0 ){
        return res.render('signup', {
            message: 'That email is already in use'
        })
    } else if( password !== passwordConfirm ){
        return res.render('signup', {
            message: 'Password do not match'
        });
    }

    let hashedPassword = await bcrypt.hash(password, 8);
    console.log(hashedPassword);

    db.query('INSERT INTO users SET ?', {name: name, email: email, password: hashedPassword}, (error, results) => {
        if(error) {
            console.log(error);
        } else {
            console.log(results);
            return res.render('signup', {
                message: 'User Registered'
            });
        }
    })

});



//    res.send("Form Submitted")

}