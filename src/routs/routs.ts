import express from "express";
import { creatUser, getUser,editUser } from "../controller/controller";

const router = express.Router();

router.get ('/users', getUser)

router.post('/create',creatUser)

router.put('/edit/:id',editUser)

export default router;