const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const app = express()
dotenv.config()
const bodyParser = require('body-parser')
app.use(cors())
app.use(bodyParser.json())

const port  = process.env.port || 8000

app.get('/',(req,res)=>{

    res.send('hello')   
})

app.post("/login", (req, res) => {
    const { email, password } = req.body;
  
    if (email === 'hemant@gmail.com' && password === 'hemant123') {
      return res.json({ success: true, message: "Login successful!" });
    } else {
      return res.status(401).json({ success: false, message: "Invalid User" });
    }
  });


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })