const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.set('port', 4000);

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

var userRouter= require("./src/routes/userRoute");
app.use("/user", userRouter);

app.listen(app.get('port'), () => {
    console.log('Listening on port ', app.get('port'));
});

app.get('/',(req, res)=>{
    res.json("HOLAAAA")
})