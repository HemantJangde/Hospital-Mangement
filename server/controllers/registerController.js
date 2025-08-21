const registerModel = require("../models/registerModel.js");

const insertUser = async (req, res) => {
  try {
    const { name, age, gender, contact, idProof, createdAt } = req.body;
    //  console.log("Request body:", req.body);

    const existUser = await registerModel.findOne({ idProof });

    

    if (existUser) {
      return res
        .status(400)
        .json({ status: 0, msg: "User already registered" });
    }
    const user = new registerModel({
      name,
      age,
      gender,
      contact,
      idProof,
      createdAt,
    });
    const savedUser = await user.save();
    res
      .status(201)
      .json({ status: 1, msg: "Insert User sucessfully", userRes: savedUser });
  } catch (err) {
    res
      .status(500)
      .json({ status: 0, msg: "NOt Insert Sucessfullly", error: err.message });
  }
};
const showUser = async (req, res) => {
  try {
    const show = await registerModel.find();
    res
      .status(201)
      .json({ status: 1, msg: "Show User Sucessfully", userRes: show });
  } catch (err) {
    res.status(500).json({ status: 0, msg: "Not Show User Sucesfully" });
  }
};
module.exports = { insertUser, showUser };
