
const express = require("express")

const app = express()

app.set('view engine' ,'ejs')

app.get("/", (req,res) => {
    console.log("hello")
   // res.send("hi")
 //  let k = res.status(500).json({message:"Error"});
  // res.download("server.js")
  res.render("index", {text:"world"})
})
const userRouter = require('./routes/users')

app.use('/users', userRouter);

app.listen(3000)

