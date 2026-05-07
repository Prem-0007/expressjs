import express from 'express';

const app = express()

app.use(express.json())


const logging = (req,res,next) =>{
    console.log(`${req.method}-${req.url}`)
    next();
};

const resolveIndexID =(req, res , next) =>{
      const {body, params:{id}} = req;
    const parsedId = parseInt(id);
     if(isNaN(parsedId)) return res.status(400);

     const findUserIndex = users.findIndex(
        (user) => user.id=== parsedId
     )
     if(findUserIndex===-1)
        return res.sendStatus(404)
    req.findUserIndex = findUserIndex;
    next();
}

// app.use(logging)
const users = [{id:1, username:"prem", displayName:"Prem"},
    {id:2, username:"kas", displayName:"Kas"},
    {id:3, username:"than", displayName:"Than"},
     {id:4, username:"tj", displayName:"Tj"},
      {id:5, username:"hari", displayName:"Hari"}
      , {id:6, username:"charan", displayName:"Charan"}
      , {id:7, username:"manoj", displayName:"Manoj"}
 ]


app.get("/",// (req, res, next )=> { console.log('BASE URL 1') next();}, (req, res, next )=> { console.log('BASE URL 2')  next()}, (req, res, next )=> {  console.log('BASE URL 3') next();},
 (req,res) =>{ res.status(201).send({msg:"hello"});
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
/*
app.use(logging, (req, res, next) =>{
console.log('Finished Logging...')
next();
})
*/

app.post('/api/users', (req,res ) =>{
    console.log(req.body);
    const {body} = req;
    const newUser = { id: users[users.length-1].id +1, ...body }
    users.push(newUser);
  return res.status(201).send(newUser)
 
})





app.get('/api/users/:id', resolveIndexID, (req,res) =>{
    const {findUserIndex} = req;
    const findUser= users[findUserIndex];
    /*
    console.log(req.params);
     const parsedId= parseInt(req.params.id);
     console.log(parsedId)
     if(isNaN(parsedId)) return res.status(400).send({msg: "Bad Request. Invalid ID. "})

        const findUser = users.find((user) => user.id === parsedId)
        */
        if(!findUser) return res.sendStatus(404)
            return res.send(findUser)
})

app.get('/api/products', (req,res)=>{
    res.send([{id:123, name:'Choci', price: 34.76}])
})


app.put('/api/users/:id', resolveIndexID, (req,res)=>{
    const {body, findUserIndex}= req;
    // const {body, params:{id}} = req;
   /* const parsedId = parseInt(id);
     if(isNaN(parsedId)) return res.status(400);

     const findUserIndex = users.findIndex(
        (user) => user.id=== parsedId
     )
     if(findUserIndex===-1)
        return res.sendStatus(404)
     */
    users[findUserIndex] = { id: users[findUserIndex].id, ...body};
    return res.sendStatus(200);
})


app.patch('/api/users/:id', resolveIndexID, (req, res) =>{
 const {body, findUserIndex}= req;
 // const {body, params:{id}} = req;
 /*
    const parsedId = parseInt(id);
     if(isNaN(parsedId)) return res.status(400);

     const findUserIndex = users.findIndex(
        (user) => user.id=== parsedId
     )
      if(findUserIndex===-1)
        return res.sendStatus(404);
      */
    users[findUserIndex] = {
        ...users[findUserIndex],
        ...body
    }
    return res.sendStatus(200)
})


app.delete('/api/users/:id', resolveIndexID,  (req, res) =>{
    const {findUserIndex} = req;
  //  const {params : {id}} = req;
    /*
 const parsedId = parseInt(id);
     if(isNaN(parsedId)) return res.status(400);

   const findUserIndex = users.findIndex(
        (user) => user.id=== parsedId
     )
     if(findUserIndex === -1 )
   return res.sendStatus(404) */

users.splice(findUserIndex, 1);
return res.send(200);      
})




const PORT = process.env.PORT || 3000
app.listen(PORT, () =>{
    console.log(`server running on port ${PORT}`)
})