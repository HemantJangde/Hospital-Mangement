const express=require("express");
const appoinmentRoute=express.Router();
const {BookedShowUser,InsertUser,showBookedUser,deleteBookedUser, updateUser,updateStatus}=require("../controllers/appoinmentController.js")


appoinmentRoute.get("/",(req,res)=>{
    res.send("Appoinment Route Connected");
})

appoinmentRoute.get("/appointments/booked-slots",BookedShowUser);// for showing ki slot avalable hai ki nahi

appoinmentRoute.post("/appointments/book",InsertUser);

appoinmentRoute.get("/appointments/bookedShow",showBookedUser);

appoinmentRoute.delete("/appointments/delete/:id",deleteBookedUser);

appoinmentRoute.put("/appointments/updateUser/:id",updateUser);
appoinmentRoute.put("/appointments/updateStatus/:id",updateStatus);



module.exports=appoinmentRoute;