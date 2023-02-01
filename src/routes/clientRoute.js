const express = require("express");
const Router = express.Router();
const{clientPost,StatusPipeline,read,updateClient,deleteClient}=require("../controllers/clientController")

Router.post("/client", clientPost);
Router.get("/status", StatusPipeline);
Router.put("/updateclient",updateClient);
Router.delete("/deleteClient",deleteClient)
Router.get("/read",read)

module.exports = Router;