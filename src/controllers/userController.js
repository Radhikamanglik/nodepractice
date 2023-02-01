require("dotenv").config();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!(email && password)) {
            res.status(400).send("All field is required");
        }
        const user = await User.findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign(
                { user_id: user._id, email, role: user.role },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "7d",
                }
            );
            user.token = token;
            return res.status(201).send({ code: 201, data: user, error: null, message: "Logged In successfully" });
        }
        else {
            return res.status(403).send({ code: 403, message: "Wrong email ID or Password" });
        }
    } catch (err) {
        console.log(err);
        return res.status(400).send({ code: 400, error: err, data: null, message: "Unable to login" })
    }
}

const userSignup = async (req, res) => {
    console.log(req.body,"Radhika")
    try {
        const { firstName, lastname, email, password } = req.body;
        if (!(email && password && firstName && lastname)) {
            res.status(400).send("All input is required");
        }
        const oldUser = await User.findOne({ email });
        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
        }
        encryptedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            firstName,
            lastname,
            email: email.toLowerCase(), 
            password: encryptedPassword,
            role: req.body.role,
        });
        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "3h",
            }
        );
        user.token = token;
        return res.status(201).send({ error: null, data: user, message: "Signed Up successfully" });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: err, data: null, message: "Unable to signup" })
    }
}

//read the data
const read=(req,res,next)=>{
    User.find().then(response=>{
        res.json({response})
    }).catch(error=>{
        res.json({message:" Error occur"})
    })
}
//update an employee
const update=(req,res,next)=>{
    let userID = req.body.id
    console.log(userID)
    let updatedData={
        firstName:req.body.firstName,
            lastname:req.body.lastname,
            email: req.body.email, 
            password: req.body.encryptedPassword,
            role: "USER"
    }
User.findByIdAndUpdate(userID,{$set:updatedData}).then(()=>{res.json({
   updatedData:updatedData,
    message: "Employee updated successfully!"
})
})
.catch(error=>{
    res.json({message:"error occur"
    })
})
}

//delete user
const deleteUser=(req,res,next)=>{
    let userID=req.body.id
    console.log(userID)
    User.findByIdAndRemove(userID)
    .then(()=>{
        res.json({
            message:"User deleted successfully"
        })
    })
    .catch(error=>{
        res.json({message:"error occured"})
    })
}

module.exports = { userLogin, userSignup,update,read,deleteUser }