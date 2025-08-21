const AppointmentSchedulingModel=require("../models/appoinmentModel.js");

/// showing user book hai ki nahi  [/ Get booked slots by date]
const BookedShowUser=async(req,res)=>{
    const {date}=req.query;
    if(!date) return res.status(404).json({error: "Date is required" });
    try{
    const appoinment= await AppointmentSchedulingModel.find({date});
    const bookedSlots=appoinment.map((a)=>a.slot);
    res.json({ status: 1, bookedSlots })
 // ✅ Correct (matches frontend)

    }catch(err){
        res.status(500).json({status:0,message: "Error fetching slots"})
    }
}
/// show user 
const showBookedUser=async(req,res)=>{
    try{
        const showUser=await AppointmentSchedulingModel.find();
        res.status(200).json({status:1,msg:"Show User Sucessfully",userRes:showUser});

    }catch(err){
        res.status(500).json({status:0,msg:"Not Show Sucessfully"})
    }

}
/// insert Booked user Data  [// Book a new appointment]
const InsertUser = async (req, res) => {
    console.log("Body Received", req.body);
    const { userId, userName, date, slot, status = 'Pending' } = req.body;

    if (!userId || !userName || !date || !slot) {
        console.log("❌ Missing Data:", { userId, userName, date, slot });
        return res.status(400).json({ status: 0, msg: "Missing Data" });
    }

    try {
        // Check if slot already booked
        const existingData = await AppointmentSchedulingModel.findOne({ date, slot });
        if (existingData) return res.status(409).json({ status: 0, msg: "Slot Already Booked" });

        const appointment = new AppointmentSchedulingModel({
            userId,
            userName,
            date: date, // <-- String save karein, no timezone shift
            slot,
            status,
        });

        await appointment.save();
        res.status(200).json({ status: 1, msg: "Appointment Booked Successfully [Server]" });
    } catch (err) {
        res.status(500).json({ status: 0, msg: 'Booking Failed [Server]' });
    }
};


const deleteBookedUser = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if ID is provided
        if (!id) {
            return res.status(400).json({ status: 0, msg: "User ID is required" });
        }

        // Try to find and delete the user
        const deletedUser = await AppointmentSchedulingModel.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ status: 0, msg: "User not found" });
        }

        return res.status(200).json({ status: 1, msg: "User deleted successfully" });

    } catch (err) {
        console.error("Error deleting user:", err);
        return res.status(500).json({ status: 0, msg: "Internal server error" });
    }
};


const updateUser=async(req,res)=>{
    try{

        const {id}=req.params;
        const {date,slot,status }=req.body;
        const appointmentUpdate=await AppointmentSchedulingModel.findByIdAndUpdate(
            id,
            {
                date,
                slot,
                status,
            },
            {new:true},
        );
        res.status(201).json({status:1,msg:"Update Appointment Sucessfully",appointmentUpdate});
    }catch(err){
        res.status(500).json({status:0,msg:"NOt Update sucessfully"});
    }
    
}

/// uska stsuts update ke liye
const updateStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!['Pending', 'Confirmed', 'Cancelled'].includes(status)) {
        return res.status(400).json({ status: 0, msg: "Invalid status value" });
    }

    try {
        const updated = await AppointmentSchedulingModel.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );
        if (!updated) {
            return res.status(404).json({ status: 0, msg: "Appointment not found" });
        }
        return res.status(200).json({ status: 1, msg: "Status updated", data: updated });
    } catch (err) {
        return res.status(500).json({ status: 0, msg: "Failed to update status" });
    }
};




module.exports={BookedShowUser,InsertUser,showBookedUser,deleteBookedUser,updateUser,updateStatus}