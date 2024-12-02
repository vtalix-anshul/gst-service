const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./config/db");
const {errorHandler, notFound} = require("./middlewares/errorHandler");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



// connect to db
const testConnection = async ()=>{
    try{
        await sequelize.authenticate();
        console.log("connected to db");
    }
    catch(err){
        console.log("error in db connect: ",err);
        throw new Error("Internal Server Error");
    }
}
testConnection();

//setting the routes here.
app.use("/api/v1/gst", require("./routes/v1/"));

app.use(notFound);
app.use(errorHandler);

module.exports = app;