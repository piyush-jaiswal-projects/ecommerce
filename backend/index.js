const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')

const connectDB = require('./database/database')
const authRouter = require('./routes/auth-routes')
const userRouter = require('./routes/user-routes')
const productRouter = require('./routes/product-routes')
const paymentRouter = require('./routes/payment-routes')

dotenv.config()

const port = 7001;
const uri = process.env.DB_URI;

const app = express();

const corsOptions = {
    origin: '*' 
  };
  
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded());

connectDB(uri);

app.get("/", function(req, res){
    res.send("<h1>Ecommerce Backend</h1>");
})

app.use("/api/auth", authRouter)
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/payment', paymentRouter)

app.listen(port, () => {
    console.log("Server started on port " + port);
})