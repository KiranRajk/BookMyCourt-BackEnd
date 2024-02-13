const USERS = require("../models/userSchema")
const COURTS = require("../models/courtSchema")
const jwt = require('jsonwebtoken');
const { response } = require("../app");

const doSignUp = (req, res) =>{
    try {
        USERS({name: req.body.name,
            email:req.body.email,
            mobileNumber: req.body.number,
            password : req.body.password,
          }).save().then((resp) => {
                console.log(resp, "res after user creation");
                 res.status(200).json({message:'signup successfull'})
          })
    } catch (error) {
        console.log(error);
        res.status(403).json({message:'signup failed'})
    }
}

const doLogin = async (req, res) =>{
const userDetails=await USERS.findOne({ email: req.body.email });

if(userDetails){
    if(userDetails.password === req.body.password){
        const token = jwt.sign({userId : userDetails._id, name : userDetails.name, role : userDetails.role, email : userDetails.email },process.env.JWT_PASSWORD, {expiresIn: '2d'})
        res.status(200).json({message:'Login Successful', token, userDetails })
    }
}else{
    res.status(401).json({message:'Invalid credentials'})
}
}

const getCourtsData = (req, res) =>{
    COURTS.find().then((response)=>{
        res.status(200).json(response)
    })
    .catch((err)=>{
        res.status(500).json('Server error')
    })
}
const getCourtDatabyId =(req,res)=>{
    COURTS.findOne({_id:req.query.id}).then((response)=>{
        res.status(200).json(response)
    })
    .catch((err)=>{
        res.status(500).json('Server error')
    })
}


module.exports={doSignUp, doLogin, getCourtsData, getCourtDatabyId }