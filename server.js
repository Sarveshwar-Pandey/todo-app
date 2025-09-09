const express = require('express')
const errorHandler = require('./middleware/errorHandler');
const connectDb =require('./config/dbConnection')
const env = require('dotenv').config()
const path = require('path')
const cookieParser = require("cookie-parser")
const methodOverride = require("method-override");

connectDb();

const app = express()


const PORT = process.env.PORT || 3000;


const templatePath = path.join(__dirname, "./templates")
 
app.use(express.json())


app.use(cookieParser());  

app.set("view engine", "hbs")

app.set("views", templatePath)

app.use(express.urlencoded({extended:true}))

app.use(methodOverride("_method"));

 app.get('/', (req,res) => {
    res.render("login")
 })

  app.get('/signup', (req,res) => {
  res.render("signup")
 })

 app.get('/create_todo',(req,res) => {
  res.render("create_todo")
 })

  app.get('/update_todo',(req,res) => {
  res.render("update_todo")
 })

app.use('/api/todos', require('./routes/todoRoutes'))

app.use('/api/users', require('./routes/userRoutes'))

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`)
})