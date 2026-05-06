const express= require("express");
const router = express.Router();

router.use(logger)
router.get('/',(req, res) => {
   console.log(req.query.name)
 res.send("User List")
})
router.get('/new', (req,res) =>{
 res.render("users/new", {firstName:"Test"})
})


router.post('/', (req,res)=>{
  //  res.send('Create User')
  const isValid = true
  if(isValid){
  users.push({firstName:req.body.firstName})
  res.redirect(`/users/${users.length-1}`)
  } else{
    console.log('Error')
    res.render('users/new', {firstName:req.body.firstName})
  }
 // console.log(req.body.firstName)
 // res.send("hi");
})


router
.route('/:id')
.get((req,res)=>{ 
     console.log(req.user) 
    res.send(` Get the user With ID ${ req.params.id}`)})
.put((req,res)=>{  res.send(` Update the user With ID ${ req.params.id}`) })
.delete((req,res)=>{ res.send(` Delete the user With ID ${ req.params.id}`) })


const users =  [{name:" Prem"},{name:"Kas"}]
router.param("id", (req, res, next , id) => {
    req.user=users[id];
   next()
})
// router.get('/:id', (req,res)=>{  res.send(` Get the user With ID ${ req.params.id}`)})

// router.put('/:id', (req,res)=>{  res.send(` Update the user With ID ${ req.params.id}`) })


// router.delete('/:id', (req,res)=>{ res.send(` Delete the user With ID ${ req.params.id}`) })
function logger(req,res,next){
   console.log(req.originalUrl)
   next()
}

module.exports= router;