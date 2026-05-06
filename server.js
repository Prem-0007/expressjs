
const express = require("express")

const app = express()
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))
app.use(express.json())
app.set('view engine' ,'ejs')
// app.use(logger)
// app.get("/",  logger, (req,res) => {
  //   console.log("hello")
   // res.send("hi")
 //  let k = res.status(500).json({message:"Error"});
  // res.download("server.js")
 //  res.render("index", {text:"world"})})
const userRouter = require('./routes/users')

app.use('/users', userRouter);


app.listen(3000)

