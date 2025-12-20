import express from "express";
import { 
    getNhanKhau, 
    deleteNhanKhau, 
    _update, 
    addNhanKhau, 
    getdetail 
} from "../controllers/nhankhau.js";

const router = express.Router();

router.post("/get", getNhanKhau);       
router.post("/put", _update);          
router.post("/add", addNhanKhau);      
router.post("/delete", deleteNhanKhau); 
router.post("/detail", getdetail);      

export default router;