const express = require('express');
const dotenv = require('dotenv')

const connectDB = require('./database/database')

dotenv.config()

const port = 6000;
const uri = process.env.DB_URI;

const app = express();

app.use(express.json());
app.use(express.urlencoded());

connectDB(uri);

app.get("/", function(req, res){
    res.send("<h1>Ecommerce Backend</h1>");
})

app.listen(port, () => {
    console.log("Server started on port " + port);
})