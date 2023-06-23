const express = require('express');
const app = express();

const port = 6000;

app.use(express.json());
app.use(express.urlencoded());

app.get("/", function(req, res){
    res.send("<h1>Ecommerce Backend</h1>");
})

app.listen(port, () => {
    console.log("Server started on port " + port);
})