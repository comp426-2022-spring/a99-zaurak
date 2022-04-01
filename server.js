const express = require('express');
const path = require('path');
const secret = require("./secret")
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser"); 
const db = require("./database"); 
const { body, validationResult } = require('express-validator')
const app = express();
const port = 3000; 


// app.use("/app", express.static('./public'));
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))

app.get("/", (req, res) => {
    res.redirect("/app")
})

app.get("/app", (req, res) => {
    const token = req.cookies.access_token
    if (token === undefined) {
        return res.redirect("/app/login")
    }
    try {
        const data = jwt.verify(token, secret.SECRET);
        return res.redirect("/app/dashboard")
    } catch {
        return res.redirect("/app/login"); 
    }
    
})


app.get("/app/dashboard", (req, res) => {
    const token = req.cookies.access_token
    if (token === undefined) {
        return res.redirect("/app/login")
    }
    res.sendFile(path.join(__dirname, "/public/index.html"))
})

app.get("/app/login", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/login.html"))
})

//Checks if fields passed to endpoint satisfy requirement
app.use("/user/sign-in", body('username').isLength( {min: 6} ), body('password').isLength({ min: 6 }), (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
})

app.use("/user/sign-in", (req, res, next) => {
    const user = db.prepare("SELECT * FROM userdata WHERE username = ? AND password = ?").get(req.body.username, req.body.password);
    if (user === undefined) {
        return res.status(400).json({errors: "Username and password is not valid"});
    }; 
    next()
})

app.post("/user/sign-in", (req, res) => {
    const token = jwt.sign({username: req.body.username}, secret.SECRET)
    res.cookie("access_token", token, {
        httpOnly: true,
    })
    .status(200)
    .redirect("/app")
})


app.use("/user/sign-up", body('username').isLength( {min: 6} ), body('email').isEmail(), body('password').isLength({ min: 6 }), (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
})


//Checks if username already exists
app.use("/user/sign-up", (req, res, next) => {
    const results = db.prepare("SELECT * FROM userdata WHERE username = ?").get(req.body.username);
    if (results !== undefined) {
        return res.status(400).json({ errors: "Username already exists"}); 
    }
    next()
})

// app.post("/app/user/sign-up", (req, res) => {
    
// })

app.get("/user/sign-out", (req, res) => {
    const token = req.cookies.access_token
    if (token === undefined) {
        return res.redirect("/app/login")
    }
    res.clearCookie('access_token').redirect("/app")
});

app.use((req, res) => {
    res.status(404).send('Not Found'); 
})


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
