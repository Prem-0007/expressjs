import {Router} from "express";
import {query , validationResult, checkSchema, matchedData} from "express-validator";
import { users} from "../utils/constants.mjs"
import { createValidationSchema }   from "../utils/validationSchema.mjs";
import { resolveIndexID } from "../utils/middlewares.mjs";
const router = Router();


router.get("/api/users", 
 query('filter').isString().notEmpty().withMessage("Must not be empty").isLength({min:3, max:10}).withMessage("Must be at least 3-10 characters"), (req, res) => {
   
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



router.get('/api/users/:id', resolveIndexID, (req,res) =>{
    const {findUserIndex} = req;
    const findUser= users[findUserIndex];
 
        if(!findUser) return res.sendStatus(404)
            return res.send(findUser)
})



router.post('/api/users', checkSchema(createValidationSchema),

(req,res ) =>{
   
   const  result = validationResult(req)
   console.log(result);
   if(!result.isEmpty())
    return res.status(400).send({errors:result.array()})
   
   const data = matchedData(req)
    const newUser = { id: users[users.length-1].id +1, ...data }
    users.push(newUser);
  return res.status(201).send(newUser)
 
})


router.put('/api/users/:id', resolveIndexID, (req,res)=>{
    const {body, findUserIndex}= req;
    
    users[findUserIndex] = { id: users[findUserIndex].id, ...body};
    return res.sendStatus(200);
})


router.patch('/api/users/:id', resolveIndexID, (req, res) =>{
 const {body, findUserIndex}= req;
 
    users[findUserIndex] = {
        ...users[findUserIndex],
        ...body
    }
    return res.sendStatus(200)
})


router.delete('/api/users/:id', resolveIndexID,  (req, res) =>{
    const {findUserIndex} = req;
 

users.splice(findUserIndex, 1);
return res.send(200);      
})



export default router;
