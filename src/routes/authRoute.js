const express = require("express");
const Router = express.Router();

const {
    userSignup,
    userLogin,
   update,
    read,
    deleteUser,
   
} = require("../controllers/userController");
const { verifyToken,isSuperAdmin}=require("../middleware/role")
Router.post("/register", userSignup);
Router.post("/login", userLogin);
Router.put("/update",[verifyToken,isSuperAdmin],update);
Router.get("/read",read);
Router.delete("/delete",deleteUser);


module.exports = Router;