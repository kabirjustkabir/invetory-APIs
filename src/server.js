const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose')
const AppError = require('./utils/appError')
const globalErrorHandler = require('./controllers/errorController')

dotenv.config('.env')
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))
//const userRoutes = require('./routes/api/index')



const db = process.env.DB_URL.replace('<password>',process.env.DB_PASS)

mongoose.connect(db).then(() =>{
    // console.log(con.connections);
    console.log("DB CONNECTED")
  })


app.use('/api',require('./routes/api/index'))

app.all("*",(req,res,next)=>{
    next(new AppError(`Can't find the ${req.originalUrl} on this server`))
  })
  
app.use(globalErrorHandler)
app.listen(8000,()=>{
    console.log("server is listening on port 8000");
})
