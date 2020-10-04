const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
require('dotenv').config();
const connectionString =process.env.CONNECTION_STRING;
const userRoutes = require('./routes/user');


const app = express();
const port = process.env.PORT || 8000;

const initializeMongo = async ()=>{
    try{
        await mongoose.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        console.log("Database connected");
    }
    catch (err){
        throw err;
    }
}


app.use(morgan('dev'));
app.use(bodyParser.json());
app.use('/user', userRoutes);


app.listen(port, ()=>{
    console.log("server is running");
    initializeMongo();
})