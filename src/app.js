require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const clientRoute=require("./routes/clientRoute")
const authRoute = require("./routes/authRoute")
const redis=require("redis");
 const redisClient=redis.createClient();
const Client=require("../src/models/clientModel")
app.use(express.json());
app.listen(process.env.API_PORT , (error) => {
    if (error) {
        console.log(error);
    }
})
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URI).then(async () => {
    console.log(`mongodb connected!`);
});
redisClient.connect();
redisClient.on("connect",function(err){
   console.log("connected redis")
   
})
app.use("/api",clientRoute)
app.use("/api/auth", authRoute)
app.get("/home",async(req,res)=>{
    let keyName="normal";
    let getCachedData=await redisClient.get(keyName);
    let result={
        id:21,
        me:"test "
    }
    let responseArray="";
    if(getCachedData){
        responseArray=getCachedData;
console.log("get cache")
    }
    else{
        console.log("set cache")
        redisClient.set(keyName,JSON.stringify(result))
        responseArray=result;
        console.log(responseArray)
    }
    console.log(getCachedData)
    res.status(200).json(responseArray)
})





module.exports = app;
