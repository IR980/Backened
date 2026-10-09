const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken')
const bcrypt = require("bcryptjs")


async function registerUser(req, res) {
  try {
    const { username, email, password , role="user"} = req.body;

    // Check if the user already exists
    const isUserAlreadyExists = await userModel.findOne({ 
        $or: [
            { 
            username }, 
            { email }
          ]
     });

     if(isUserAlreadyExists){
        return res.status(409).json({
            message: "user All ready exist"
        })
     }

     const hash = await bcrypt.hash(password, 10)

     const user = await userModel.create({
      username,
      email,
      password: hash,
      role,
     })

     const token = jwt.sign({
      id: user._id,
      role: user.role
     }, process.env.JWT_SECRET)

     res.cookie("token",token)

     res.status(201).json({
      message: "user create successfull",
      user:{
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
     })

    } catch (err){
      res.status(400).json({
        message: "user not registerd"
      })
  }
}

// login

async function loginUser(req, res){
  try{
    const {username, email, password} = req.body;
    const user = await userModel.findOne({
      $or: [
        {username},
        {email}
      ]
    })

    if(!user){
      return res.status(401).json({
        message: "Invalid Credential"
      })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid){
      return res.status(401).json({
        message: "Invalid Password"
      })
    }

    const token = jwt.sign({
      id: user._id,
      role: user.role
    }, process.env.JWT_SECRET)

    res.cookie("token", token)

    res.status(200).json({
      message: "User login successfull",
      user:{
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    })

  } catch(err){
    console.log("invalid credintail")
    res.status(400).json({
      message: "Invalid Credential"
    })
  }
}

// logout
async function logoutUser(req, res) {
  res.clearCookie("token")
  res.status(200).json({
    message: "user logout successfully"
  })
  
}

module.exports = {registerUser, loginUser, logoutUser};