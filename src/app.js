const express = require('express');
const app = express();
const mongoose = require('mongoose');
const apiRouter = require('./routes');
var bodyParser = require('body-parser')
const errorHandler = require('./middlewares/errorHandling');
require('dotenv').config();

mongoose.connect(
  `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}.mongodb.net/?retryWrites=true&w=majority`, 
  ).then(() => {
    console.log("successfully connect to database")
}).catch(err=>console.log(err))
  
app.use("/api/v1", apiRouter)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(errorHandler);

app.listen(process.env.PORT, function () {
    
    console.log("Server launch : localhost:3000/api/v1/");
}); 