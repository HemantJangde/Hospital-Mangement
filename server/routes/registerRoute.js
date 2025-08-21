const express=require("express");
const registerRoute=express.Router();
const {insertUser,showUser} =require("../controllers/registerController.js")


// Base Route
registerRoute.get('/', (req, res) => {
  res.send('Register Route!');
});


registerRoute.post("/insertUser",insertUser);

registerRoute.get("/showUser",showUser)




module.exports=registerRoute;