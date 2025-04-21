const express=require("express");
const router =express.Router();
const {getallusers,adduser,updateuser,deleteuser}=require("../controller/usercontroller");
router.get("/getall",getallusers);
router.post("/adduser",adduser);
router.put("/updateuser",updateuser);
router.delete("/delete",deleteuser);

module.exports=router;