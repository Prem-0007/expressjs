import express from 'express';

const app = express()


const users = [{id:1, username:"prem", displayName:"Prem"},
    {id:1, username:"kas", displayName:"Kas"},
    {id:1, username:"than", displayName:"Than"}
 ]


app.get("/", (req, res)=> {
   // res.send(`HELLO, WORLD!`)
   res.status(201).send({msg:"hello"});
})

app.get("/api/users" , (req,res) =>{
 res.send(users)
})


app.get('/api/users/:id', (req,res) =>{
    console.log(req.params);
     const parsedId= parseInt(req.params.id);
     console.log(parsedId)
     if(isNaN(parsedId)) return res.status(400).send({msg: "Bad Request. Invalid ID. "})

        const findUser = users.find((user) => user.id === parsedId)
        if(!findUser) return res.sendStatus(404)
            return res.send(findUser)
})

app.get('/api/products', (req,res)=>{
    res.send([{id:123, name:'Choci', price: 34.76}])
})


const PORT = process.env.PORT || 3000
app.listen(PORT, () =>{
    console.log(`server running on port ${PORT}`)
})