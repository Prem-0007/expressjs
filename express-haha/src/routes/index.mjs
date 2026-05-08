import {Router} from "express";
import userRouter from "./users.mjs"
import productRouter from "./products.mjs"


const router = Router()

router.use(userRouter)
router.use(productRouter)


export default router