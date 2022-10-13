"use strict";


const express = require('express');
const cors = require('cors');

const app=express();
app.use(cors());
app.use(express.json());


app.get('/',(req,res)=>{
    res.status(200).json({
        message:'Home Page',
        code:200
    });
});

const start=(port)=>{
    app.listen(port,()=>console.log(`Up running on port ${port}`));
}

module.exports={
    start,
}
