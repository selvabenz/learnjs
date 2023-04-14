const mysql = require("mysql2");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { promisify } = require('util');

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).render("login", {
          message: "Please Enter Your Email and Password"
        });
      }
  
      db.query(
        "select * from users where email=?",
        [email],
        async (error, result) => {
          console.log(result);
          if (result.length <= 0) {
            return res.status(401).render("login", {
              message: "Please Enter Your Email and Password"
            });
          } else {
            if (!(await bcrypt.compare(password, result[0].password))) {
              return res.status(401).render("login", {
                message: "Please Enter Your Email and Password"
              });
            }else{
                const id = result[0].id;
                const token = jwt.sign({id: id},process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES_IN,
                });
                console.log("the Token is " + token);
                const cookieOptions = {
                    expires: new Date(
                        Date.now() +
                            process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                    ),
                    httpOnly: true,
                };
                res.cookie("benz", token, cookieOptions);
                res.status(200).redirect("/home");
            } 
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

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
        });
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

};

exports.isLoggedIn = async (req, re, next) => {
   // req.name="Check Login"
  // console.log(req.cookies);
   if(req.cookies.benz){
    try {
        const decode=await promisify(jwt.verify)(
        req.cookies.benz,
        process.env.JWT_SECRET
    );
        //console.log(decode);
        db.query("select * from users where id=?", [decode.id],(err, results) => {
               // console.log(results);
                if (!results) {
                  return next();
                }
                req.user = results[0];
                return next();
        });
    } catch (error) {
        console.log(error);
        return next();
    }

   }else{
    next();

   }
};