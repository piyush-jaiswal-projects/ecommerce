const express = require('express');
const dotenv = require('dotenv')
const cors = require('cors')

const connectDB = require('./database/database')
const authRouter = require('./routes/auth-routes')

dotenv.config()

const port = 6000;
const uri = process.env.DB_URI;

const app = express();

// Allow Cross-Origin requests
const corsOptions = {
    origin: '*', // Allow all origins
    methods: 'PUT, POST, GET, DELETE, PATCH, OPTIONS', // Allowed methods
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization', // Allowed headers
    credentials: true,
    maxAge: 800,
  };
  
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded());

connectDB(uri);

app.get("/", function(req, res){
    res.send("<h1>Ecommerce Backend</h1>");
})

app.use("/api/user", authRouter)

app.listen(port, () => {
    console.log("Server started on port " + port);
})