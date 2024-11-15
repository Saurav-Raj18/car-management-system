const express=require('express');
const app=express();
const cors=require('cors');
const cookieParser=require('cookie-parser')

app.use(express.json());
app.use(cors({
    origin: ['http://localhost:3000', 'https://car-management-system-orpin.vercel.app'], // allowed origins
    credentials: true, // enable cookies and credentials in requests
  }));
// app.use(cors());
app.use(express.json({limit:"160kb"})) //accept json in backend
app.use(express.urlencoded({extended:true,limit:"160kb"}))//for url 
app.use(express.static("public"))
app.use(cookieParser())


//import router
const authRouter=require('./routes/auth.route.js');
const Carouter = require('./routes/car.route.js');
//console.log(authRouter)
app.use("/api/v1/auth",authRouter);
app.use("/api/v1/carpost",Carouter)

module.exports={app};
