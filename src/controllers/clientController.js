require("dotenv").config();
const Client=require("../models/clientModel")
const { response } = require("../app");



const clientPost = async (req, res) => {
    try {
        const { Name, Status } = req.body;
        if (!(Name && Status)) {
            res.status(400).send("All input is required");
        }
        const client = await Client.create({
            Name,
            Status,
        });
        return res.status(201).send({ error: null, data: client, message: "client data added successfully" });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: err, data: null, message: "Unable to add client" })
    }
}
const StatusPipeline= async (req,res) => {
    try {
        const {  Status } = req.body;
        if (!( Status)) {
            res.status(400).send(" input is required");
        }
        const result = await Client.aggregate()
        .match({ Status: req.body.Status });
  
        return res.status(201).send({ error: null, data: result, message: "status showed successfully" });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: err, data: null, message: "Unable to show status" })
    }
}
//read the client
const read=(req,res,next)=>{
    Client.find().then(response=>{
        res.json({response})
    }).catch(error=>{
        res.json({message:" Error occur"})
    })
}
//update an employee
const updateClient=(req,res,next)=>{
    let clientID = req.body.id
    let updatedData={
        Name:req.body.Name,
        Status:req.body.Status,
    }
Client.findByIdAndUpdate(clientID,{$set:updatedData}).then(()=>{res.json({
    message: "Client  updated successfully!"
})
})
.catch(error=>{
    res.json({message:"error occur"
    })
})
}

//delete client
const deleteClient=(req,res,next)=>{
    let clientID=req.body.id
    console.log(clientID)
    Client.findByIdAndRemove(clientID)
    .then(()=>{
        res.json({
            message:"Client deleted successfully"
        })
    })
    .catch(error=>{
        res.json({message:"error occured"})
    })
}


module.exports = { clientPost,StatusPipeline,deleteClient,updateClient,read }