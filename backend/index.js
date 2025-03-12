const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cors = require("cors")
const bodyParser = require("body-parser");

dotenv.config()
const PORT = process.env.PORT || 5000

const app = express()

app.use(cors())

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("Connected mongoDB successfully")
).catch((e)=> console.log("MongoDB connection error : ", e)
)

// Define routes here



app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`);
})
