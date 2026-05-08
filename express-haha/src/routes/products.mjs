import { Router} from "express";

const router = Router();


router.get('/api/products', (req,res)=>{
    console.log(req.headers.cookie)
    console.log(req.cookies);
    console.log(req.signedCookies.hello)
    if(req.signedCookies.hello && req.signedCookies.hello === 'world' )
      return  res.send([
        {id:123, name:'Choci', price: 34.76}])
    return res.status(403).send({msg: "Sorry. You need the correct cookie"})    
})


export default router;