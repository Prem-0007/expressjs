import { Router} from "express";

const router = Router();


router.get('/api/products', (req,res)=>{
    res.send([{id:123, name:'Choci', price: 34.76}])
})


export default router;