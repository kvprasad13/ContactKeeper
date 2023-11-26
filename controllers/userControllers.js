
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const User = require("../models/userModel.js");
const jwt = require("jsonwebtoken");
//@description Register a user
//@route Get /api/users/register
//@access public

const registerUser = asyncHandler(async (req, res) => {

    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory.");
    }
    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
        res.status(400);
        throw new Error("User already registered.");

    }
    //Hash Password
    const hashedPassword = await bcrypt.hash(password,10);
    console.log("Hashed Password:", hashedPassword);
    const user = await User.create({
        username,
        email,
        password:hashedPassword
    });
    if (user) {
        res.status(201).send( {_id:user.id,email:user.email});

    }
    else {
        res.send(401);
        throw new Error("User data is invalid");
    }
    res.json({ message: "Register the user" });
    console.log(`user created ${user}`);

});
//@description login user
//@route Get /api/users/login
//@access public

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const user = await User.findOne({ email });
    // compare with hashed password

    if (user && (await bcrypt.compare(password, user.password)))
    {
        const access_token = jwt.sign({user: {
            username: user.username,
            email: user.email,
            id: user.id
            
        },
        }, process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: "15m"}
        );
        
        res.status(200).json({access_token});
    }
    else {
        res.status(401);
        throw new Error("Email or password is invalid.");
    }
    res.json({ message: "login user" });

});
//@description get all contacts
//@route Get /api/users/current
//@access private

const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user);

});
module.exports ={ registerUser,loginUser,currentUser};