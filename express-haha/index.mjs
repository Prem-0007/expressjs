import express from 'express';

const app = express()


const users = [{id:1, username:"prem", displayName:"Prem"},
    {id:2, username:"kas", displayName:"Kas"},
    {id:3, username:"than", displayName:"Than"},
     {id:4, username:"tj", displayName:"Tj"},
      {id:5, username:"hari", displayName:"Hari"}
      , {id:6, username:"charan", displayName:"Charan"}
      , {id:7, username:"manoj", displayName:"Manoj"}
 ]


app.get("/", (req, res)=> {
   // res.send(`HELLO, WORLD!`)
   res.status(201).send({msg:"hello"});
})

app.get("/api/users", (req, res) => {
    const { filter, value } = req.query;

    if (!filter || !value) {
        return res.send(users);
    }

    const result = users.filter(user =>
        String(user[filter])?.includes(value)
    );

    return res.send(result);
});


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