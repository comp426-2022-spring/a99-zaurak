const express = require('express');
const path = require('path');
const secret = require("./secret");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser"); 
const db = require("./database"); 
const transporter = require("./mail")
const { body, validationResult } = require('express-validator');
const app = express();
const port = 3000; 


//Middleware used to turn fetch json data into JS object
app.use(express.json())
//Middleware used to parse cookies passed along HTTP request as JS object
app.use(cookieParser())


//Redirects requests to dashboard
app.get("/", (req, res) => {
    res.redirect("/app/dashboard")
});

app.get("/styles", (req, res) => {
    res.sendFile(path.join(__dirname, "public/styles.css"))
})


//Dashboard Logic
app.get("/app/dashboard", (req, res) => {
    //Checks for cookie object holding access_token
    const token = req.cookies.access_token
    //If the cookie does not exists, the user hass not signed in yet
    if (token === undefined) {
        return res.redirect("/app/login")
    }
    //The cookie exists, verify the token inside is legitimate
    try {
        const data = jwt.verify(token, secret.SECRET);
        return res.status(200).sendFile(path.join(__dirname, "/public/prototype.html"))
    //The token is not legit
    } catch {
        return res.status(301).redirect("/app/login"); 
    }
});


//Login Logic
app.get("/app/login", (req, res) => {
    //Returns login.html
    res.status(200).sendFile(path.join(__dirname, "/public/login-v2.html"))
});


//Account logic
app.get("/app/account", (req, res) => {
    res.status(200).sendFile(path.join(__dirname, "/public/account.html"))
})

//Signup Logic
app.get("/app/signup", (req, res) => {
    //Returns login.html
    res.status(200).sendFile(path.join(__dirname, "/public/signup.html"))
});



//Middleware for /sign-in route. Checks if fields passed in HTTP Body satisfy required lengths.
app.use("/user/sign-in", body('username').isLength( {min: 6} ), body('password').isLength({ min: 6 }), (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
});


//Second Middleware for /sign-in route. Checks if username and password combo exists in database.
app.use("/user/sign-in", (req, res, next) => {
    const user = db.prepare("SELECT * FROM userdata WHERE username = ? AND password = ?").get(req.body.username, req.body.password);
    if (user === undefined) {
        return res.status(400).json({errors: "Username and password is not valid"});
    }; 
    next()
});


//Sign-in Logic
app.post("/user/sign-in", (req, res) => {
    //Make an access_token
    const token = jwt.sign({username: req.body.username}, secret.SECRET)
    //Place access token in cookie and gift it to user
    res.cookie("access_token", token, {
        httpOnly: true,
    })
    .status(301)
    .redirect("/app/dashboard")
});


//Middleware for /sign-up route. Checks if fields passed in HTTP Body satisfy required lengths.
app.use("/user/sign-up", body('username').isLength( {min: 6} ), body('email').isEmail(), body('password').isLength({ min: 6 }), (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
});


//Second Middleware for /sign-up route. Checks if username exists in database. If so, the user must choose another username. 
app.use("/user/sign-up", (req, res, next) => {
    const results = db.prepare("SELECT * FROM userdata WHERE username = ?").get(req.body.username);
    if (results !== undefined) {
        console.log("strange errors")
        return res.status(400).json({ errors: "Username already exists" }); 
    }
    next()
}); 


//Sign-up logic. 
app.post("/user/sign-up", (req, res) => {
    try {
        const results = db.prepare("INSERT INTO userdata (username, password, email) VALUES (?, ?, ?)").run(req.body.username, req.body.password, req.body.email); 
        return res.status(301).redirect('/app/login')
    }
    catch {
        return res.status(400).json({ errors: "Signup Unsuccessful" })
    }
})

app.use("/user/send-password-reset", body('email').isEmail(), (req, res) => {
    const errors = validationResults(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() })
    }
    next()
})

app.use("/user/send-password-reset", (req, res) => {
    const user = db.prepare('SELECT * FROM userdata WHERE email = ?').get(req.body.email);
    if (user === undefined) {
        res.status(400).json({ errors: "No User With That Email Found." });
    }
    next()
})


app.post("/user/send-password-reset"), async (req, res) => {
    try {
        const code = Math.random() * 10000
        const info = await transporter.sendMail({
            to: req.body.email,
            from: "zaurakapp@gmail.com",
            subject: "Here's a temporary password.",
            text: code,
        });
        db.prepare('UPDATE userdata SET password = ? WHERE email = ?').run(code, req.body.email)
        return res.status(200); 
    }
    catch {
        res.status(400).json({ errors: 'Error sending reset code.' })
    }
}


// app.post("/user/", (req, res) => {
    
// })



//Clears cookie from user and returns them to sign-in page. 
app.get("/user/sign-out", (req, res) => {
    const token = req.cookies.access_token
    if (token === undefined) {
        return res.status(301).redirect("/app/login")
    }
    res.clearCookie('access_token').status(301).redirect("/app/login")
});


app.use((req, res) => {
    res.status(404).send('Not Found'); 
})


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
