const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const PORT = process.env.PORT||4000

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse application/json
app.use(bodyParser.json())

const config = {
    application: {
        cors: {
            server: [
                {
                    origin: "https://apitestrecetario.onrender.com/", //servidor que deseas que consuma o (*) en caso que sea acceso libre
                    credentials: true
                }
            ]
        }
}}

app.use(cors(
    config.application.cors.server
));

//Uso de rutas
var userRouter= require("./src/routes/userRoute");
app.use("/user", userRouter);

app.listen(PORT, () => {
    console.log('Listening on port ', PORT);
});

app.get('/',(req, res)=>{
    res.json("HOLAAAA")
})