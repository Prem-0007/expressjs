import express from 'express';

import routes from "./src/routes/index.mjs"
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport  from "passport";
// import "./src/strategies/local-strategy.mjs";
import mongoose from 'mongoose';
import MongoStore from "connect-mongo";
import { users } from "./src/utils/constants.mjs";
import "./src/strategies/discord-strategy.mjs";

/*
import  userRouter from "./src/routes/users.mjs";
import productRouter from
"./src/routes/products.mjs";
import {query, validationResult, body,matchedData , checkSchema} from "express-validator";

import { createValidationSchema } from './src/utils/validationSchema.mjs';

import { resolveIndexID } from './src/utils/middlewares.mjs';
*/

const app = express()


mongoose.connect('mongodb://localhost/express_haha')
.then(() => console.log("connected to Database"))
.catch((err) => console.log(err))



app.use(express.json())
app.use(cookieParser("helloWorld"))
app.use(session(
    {
        secret: "prem the dev",
        saveUninitialized:
        true,
        resave : false,
        cookie: {
            maxAge: 60000 * 60 , 
        },
     store: MongoStore.create({
         client: mongoose.connection.getClient()
     }
       
     )
    }
))
app.use(passport.initialize())
app.use(passport.session())
app.use(routes)
app.post('/api/auth', passport.authenticate('local'), (req,res) =>{
  res.sendStatus(200)
})

app.get('/api/auth/status', (req,res) =>{
    console.log(`Inside /auth/status endpoint`)
    console.log(req.user)
    console.log(req.session)
    return req.user ? res.send(req.user) : res.sendStatus(401)
})


app.post('/api/auth/logout' , (req,res) =>{
    if(!req.user) return res.sendStatus(401)

        req.logOut((err)=>{
         if(err) return res.sendStatus(400) ;
         res.send(200)  
        } )
})
//app.use(userRouter)  app.use(productRouter)

/*
const logging = (req,res,next) =>{
    console.log(`${req.method}-${req.url}`)
    next();
};

*/



/*
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


*/


// app.use(logging)
/*
const users = [{id:1, username:"prem", displayName:"Prem"},
    {id:2, username:"kas", displayName:"Kas"},
    {id:3, username:"than", displayName:"Than"},
     {id:4, username:"tj", displayName:"Tj"},
      {id:5, username:"hari", displayName:"Hari"}
      , {id:6, username:"charan", displayName:"Charan"}
      , {id:7, username:"manoj", displayName:"Manoj"}
 ];

*/


app.get("/",// (req, res, next )=> { console.log('BASE URL 1') next();}, (req, res, next )=> { console.log('BASE URL 2')  next()}, (req, res, next )=> {  console.log('BASE URL 3') next();},
 (req,res) =>{ 
    console.log(req.session)
    console.log(req.session.id)
    req.session.visited = true;
    res.cookie("hello", "world", {maxAge: 10000, signed:true});
    
    res.status(201).send({msg:"hello"});
})

app.post('/api/auth', (req,res) =>{
    const {body : {
        username, password
    }} = req;
   const findUser = users.find((user) => user.username === username )
   if(!findUser || findUser.password !== password) return res.status(401).send({msg: "BAD CREDENTIALS"})
   
   req.session.user = findUser;
   return res.status(200).send(findUser);
})



app.get('/api/auth/status', (req,res) => {
    req.sessionStore.get(req.sessionID, (err, session) => {
        console.log(session)
    })
   return req.session.user ? res.status(200).send(req.session.user) : res.status(401).send({msg:"Not Authenticated"})
})


app.post('/api/cart', (req,res) =>{
    if(!req.session.user) return res.sendStatus(401);

    const { body : item} = req;
    const { cart} = req.session
    if(cart){cart.push(item)

    }
    else{
        req.session.cart = [item];
    }
    return res.status(201).send(item)    
});


app.get('/api/cart', (req,res) =>{
     if(!req.session.user) return res.sendStatus(401);
     return res.send(req.session.cart ?? [])
})

/*
app.get("/api/users", query('filter').isString().notEmpty().withMessage("Must not be empty").isLength({min:3, max:10}).withMessage("Must be at least 3-10 characters"), (req, res) => {
   // console.log(req["express-validator#contexts"]);
   const resu = validationResult(req);
   console.log(resu);
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



/*
app.post('/api/users', checkSchema(createValidationSchema),
   // [body('username').notEmpty().withMessage("username cannot be empty").isLength({min:4, max:32}).withMessage("username must be at least 4 characters with a max of 32 characters").isString().withMessage("Username must be string"),
// body("displayName").notEmpty(), ], 
(req,res ) =>{
   
   //  console.log(req.body);

   const  result = validationResult(req)
   console.log(result);
   if(!result.isEmpty())
    return res.status(400).send({errors:result.array()})
   
   const data = matchedData(req)
  // console.log(data)
   // const {body} = req;

    const newUser = { id: users[users.length-1].id +1, ...data }
    users.push(newUser);
  return res.status(201).send(newUser)
 
})


*/

/*

app.get('/api/users/:id', resolveIndexID, (req,res) =>{
    const {findUserIndex} = req;
    const findUser= users[findUserIndex];
    /*
    console.log(req.params);
     const parsedId= parseInt(req.params.id);
     console.log(parsedId)
     if(isNaN(parsedId)) return res.status(400).send({msg: "Bad Request. Invalid ID. "})

        const findUser = users.find((user) => user.id === parsedId)
       
        if(!findUser) return res.sendStatus(404)
            return res.send(findUser)
})

*/


/*
app.get('/api/products', (req,res)=>{
    res.send([{id:123, name:'Choci', price: 34.76}])
})

*/


/*
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
     ---------
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
-------------
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
   return res.sendStatus(404) ---------------

users.splice(findUserIndex, 1);
return res.send(200);      
})

*/




const PORT = process.env.PORT || 3000
app.listen(PORT, () =>{
    console.log(`server running on port ${PORT}`)
})

//  client_secret = 26dM-XnK-aJJRMVkRf-kGEuRso5MlFEo
// client_id = 1502553493431648357
// redirect_url = http://localhost:3000/api/auth/discord/redirect