exports.getallusers=(req,res)=>{
res.send({message:"user retrived successfull",users})
}
exports.adduser=(req,res)=>{
    res.send({massage:"user added successfull",users})
}
exports.updateuser=(req,res)=>{
    res.send({massage:"user update successfull",users})
}
exports.deleteuser=(req,res)=>{
    res.send({massage:"user deleted successfull",users})
}

