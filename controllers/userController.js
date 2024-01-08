const USERS = require("../models/userSchema")

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

module.exports={doSignUp}