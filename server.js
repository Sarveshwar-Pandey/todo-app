const express = require('express')
const errorHandler = require('./middleware/errorHandler');
const connectDb =require('./config/dbConnection')
const env = require('dotenv').config()
const path = require('path')
const cookieParser = require("cookie-parser")
const methodOverride = require("method-override");

//humne jo DB ko connect karaya tha use call kar rahe hai
connectDb();

const app = express()

//.env code ko safe bachata hai aur hame harcoding karne se bachata hai
const PORT = process.env.PORT || 3000;

//ye hame madad karta hi, ki ye gandu template folder ya file khi bhi chupa ho hum usse easily padh sake
//idhar __dirname - nodejs ka ek global variable hai jo hume current file ka absolute path batata hai, "./templates"ye kuch bhi ho sakta hai jo batata hai ki humari current file yani server.js se kitni dur hai, aur ye relative path batata hai na ki relative
//second argument kuch bhi ho sakta hai file ya folder
//path node ka module hai aur join uska ek method jo do multiple path segment ko jodkar ek valid path banata hai
//__dirname ke baad hum kitne bhi arguments pass kar sakte hai chahe wo file ho ya folder
const templatePath = path.join(__dirname, "./templates")
 
//built in middleware - which handles body received in json format
app.use(express.json())

//ye ek npm package hai, ho incoming http request se cookie ko parse karta hai, aur unhe convert karta hai JS Object me naa ki JSON me. Iski madad se hum cookies ko easily padh sakte hai, jaise ki req.headers.cookie etc.
app.use(cookieParser());  

//app.set() express ka method hai jisse hum vibhin prakar ke application-level setting kar sakte hai.
// Ye hamesha 2 arguments leta hai - setting name and value.
//"view engine" ye express ko batata hai ki kaunsa template engine use karna hai rendering ke liye, iske aage argument me hum usse batate hai
//"hbs" ye ek prakar ka template engine hai jiska naam hai handlebars, toh jab bhi hum res.render("loda_lassan") call karenge toh yeh bkl "hbs" use render karege
app.set("view engine", "hbs")

//Express bkl by default view engine me views naam ka folder check karta hai, lekin ye thoda jhatu naam lagta hai toh agar kisi ko change karna ho woh kar sakta hai, idhar templatePath ek path hai jo humare current file -'server.js' ko 'template' folder ke sath jod raha hai jo humne upar dekha tha path.join() se toh whi humne usse var me store kara tha jo templatePath tha 
app.set("views", templatePath)

//Ye ek built in middleware hai express ka, ye parse karta hai humare URL-encoded payloads ko
//Ab tum chutiye puchoge ki ye "URL-encoded payload" kya hota hai- jab bhi hum koi form submit karte hai via HTTP POST (ab puchoge kya bas POST use hota hai toh nhi - GET bhi use hota hai jo by default hota hai agar hum mention na kare, us tarah keval do hi hote hai GET and POST baaki use karna hai toh fetch, axios, and ajax use karo JS ki madam se-ye kayi tarike se data bhej sakte hai- URL encoded, JSON etc) baaki POST url encoded form me bheje la aur GET query string bhejela jaun bhi ek tarah ke URL encoded kahal ja sakela 
//URL encode aisal hola - username=hd&password=12345 & seperate karela multiple fields ke
//ab yeme do tarah ke extended option hola - true or false 
//true- ee allow karela parsing nested objects ka using qs library
//false- ee kewal simple key-value pairs allow karela using querystring library
app.use(express.urlencoded({extended:true}))

//ee ek express middleware hai aur ee ethod external npm package hai jaunke ke install kareke padela
//ab ekar kaam hai http methods ke override kayil jaun jha client keval kuche method support karela jaise upar padhni hayi ke ki HTML form keval GET, POST support karela toh waha hum pach PUT, PATCH delete use kar sakal jaala methodOverride('_method') ke madam se
//jab bhi use kareke hola tai query ya jha jarurat pade what _method=PUT use kayil ja sakela
//ex- POST /posts/1?_method=DELETE,  same way - <input type="hidden" name="_method" value="DELETE">
app.use(methodOverride("_method"));

//Baki pata hi hai

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