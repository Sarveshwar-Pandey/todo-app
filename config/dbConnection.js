const mongoose = require('mongoose')

const dbConnect = async()=>{
  try{
  const connect =await mongoose.connect("mongodb://localhost:27017/todo-app")
  console.log("DB connected");
  }
  catch(err){
  console.log("DB Failed to connect!")
}
}
module.exports = dbConnect;