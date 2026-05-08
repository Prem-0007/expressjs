import { users } from "../utils/constants.mjs"

export const resolveIndexID =(req, res , next) =>{
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
