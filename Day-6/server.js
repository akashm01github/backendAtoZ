const express = require("express");
const connectDB = require("./db/db");

const app = express();



//! IN-BUILT MIDDLEWARE 
app.use(express.json());

//! MIDDLEWARE : LOGGING , AUTH , VALIDATION 

// const loggingMiddleware = (req,res,next)=>{
//     console.log("Logging......");
//     next();
// }

// app.use(loggingMiddleware)

// const authMiddleware = (req,res,next)=>{
//     console.log("Authentication......");
//     next();
// }

// app.use(authMiddleware)

// const validationMiddleware = (req,res,next)=>{
//     console.log("Validation......");
//     next();
// }

// app.use(validationMiddleware);


connectDB();

app.get('/',(req,res)=>{
    console.log(req.body);
    res.send("Get Request")
})


app.listen(3000,()=>{
    console.log('Server is Runnig on Port 3000.......')
})