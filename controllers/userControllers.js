const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//@desc Register user
//@route POST /api/users/register
//access private

//asyncHandler is a middleware wrapper library also a npm package- it automatically catches errors from async functions and pass them to express error Handling
const registerUser =asyncHandler(async (req, res) => {
  console.log("The message body is: ",req.body);
  const {username, email, password} = req.body;
  if(!username || !email || !password){
    res.status(404);
    throw new Error("All field are mandatory!")
  }

  //User-mongoose model, findOne is mongoose query method
  //Ye pure mongoDb collection me search karta hai us ek document ke liye jo match kare condition 
  //Yha hum apna email pass kar rahe jo hume req.body se mila hai
  //await ka matlab pata hi hoga ki jabtak hume iska result nhi mil jata ye wala function aage nhi badhega jaise findOne ek promise return karega toh hum wait karte hai, agar naa kare toh ye hume pending promise dega original data ki jagah
  const userAvailable = await User.findOne({email});
  if(userAvailable){
    res.status(404);
    throw new Error("User already registered!")
  }

  //bcrypt- a popular ibrary used for hashing password
  //hashing != encryption. Hashing keval one way hota hai, isse hum reverse nhi kar sakte original password ke liye
  //passsword- plain string entered by user
  //10- salt rounds. Salt is a random string added to the password before hashing
  //jitne rounds utni secuirity lekin utna slow. 10 commonly used hota hai
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("Hashed password:",hashedPassword);
  
  //User.create() creates new document in db and in password we're saving hashed password
  const user = await User.create({
    username,
    email,
    password: hashedPassword
  });
  console.log(`User created ${user}`);
    if(user){
    // res.status(201).json({_id: user.id, email: user.email})
    //After successfully creating the user it redirects to another URL
    //in res.redirect([status], path) - but not necessary to pass status, we can also give "back" it sends back the user to referrer page, if there's none then back to default /
    res.redirect('/api/users/login')
  }
  else{
    res.status(400) 
    throw new Error("User data is not valid.")
  }
})
//@desc Login user
//@route POST /api/users/login
//access private
const loginUser = asyncHandler(async (req, res) => {
  const {email, password} = req.body;
  console.log(req.body);
  
  if(!email || !password){
    res.status(400)
    throw new Error("All fields are mandatory!")
  }

  //same explanation as above
  const user = await User.findOne({email})

  //first it checks the user object actually exist in dB, if user is null or undefined whole condition becomes false immediately
  //bcrypt.compare() ye check karta hai kya humara plain text humare hashed password se match kar raha ya nhi, ye bas password ko hashed_password(users.password) me convert karke check kara ja sakta hai na ki vice-versa.
  //If both true then in it proceeds further
  //aur ye asynchronous hai toh hum await use karte hai
  if(user && (await bcrypt.compare(password, user.password))) {

    //jwt.sign(payload, secretOrPrivateKey, options) 
    //payload- data jo hum token me dena chahte hai, client use karta hai isse apni identity prove karne ke liye, signautre ensure karta hai ki ye tampered hai ya nhi
    //secretKey- secret string used to sign the token(must be keep private) jaisa humne .env me store karke rakha hai
    //options - additional setting jaise ki token expiry 
    //in return we gets a jwt token 
    const accessToken = jwt.sign({
      user:{
        username: user.username,
        email: user.email,
        id: user.id
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    {expiresIn: "1h"}
  );
    console.log((accessToken));
    
    //Express method used to send a cookie from server to client 
    //res.cookie(name, value, options)
    //name- name of the cookie - "token", value- what we want to store - accessToken
    //options - settings that control cookie behaviour
    //httpOnly:true - JS can't access this code(only client side JS), browser automatically sends it with every request and can be accessed on server using req.cookie. Client side ye cookie document.cookie me expose nhi hota jo ki prevent karta hai XSS attack
    //secure:false - if true it sends through https not http
    //maxAge:3600000 - lifetime of cookie in millisec
    res.cookie("token", accessToken, {
      httpOnly: true, // prevents JS access (security)
      secure: false,  // set true if using https
      maxAge: 3600000 // 1 hour
    });

    //render html page on server and send it as response to client
    //server side rendering
    res.render("home", { user: { username: user.username, email: user.email } });
  }else{
    res.status(401)
    throw new Error("email or password is not valid!")
  }
})

// //@desc Current user information
// //@route GET /api/users/current
// //access private
// const currentUser = asyncHandler(async (req, res) => {
//   console.log(req.user);
  
//   res.status(200).json(req.user);
// })

module.exports = {registerUser, loginUser};