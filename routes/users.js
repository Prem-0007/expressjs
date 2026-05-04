const express= require("express");
const router = express.Router();


router.get('/',(req, res) => {
 res.send("User List")
})
router.get('/new', (req,res) =>{
 res.send("User New Form")
})


router.post('/', (req,res)=>{
    res.send('Create User')
})


router
.route('/:id')
.get((req,res)=>{  res.send(` Get the user With ID ${ req.params.id}`)})
.put((req,res)=>{  res.send(` Update the user With ID ${ req.params.id}`) })
.delete((req,res)=>{ res.send(` Delete the user With ID ${ req.params.id}`) })

router.param("id", (req, res, next , id) => {
    console.log(id);
})
// router.get('/:id', (req,res)=>{  res.send(` Get the user With ID ${ req.params.id}`)})

// router.put('/:id', (req,res)=>{  res.send(` Update the user With ID ${ req.params.id}`) })


// router.delete('/:id', (req,res)=>{ res.send(` Delete the user With ID ${ req.params.id}`) })


module.exports= router;