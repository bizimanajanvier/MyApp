console.log("welcome janvier in node js pplication");
const express=require("express");
const http=require("http");
//const bcrypt = require('bcrypt js');
const jwt = require('jsonwebtoken');
//const routeruser=require("../routers/userrouters")
const app=express();
const bodyparser=require("body-parser");
const mysql=require("mysql2");
const port= process.env.port || 8080;
const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"StageNode1!",
    database:"Product"
})
db.connect((err)=>{
    if (err) {
    console.log(err)        
    }
    else{
        console.log({message:"connection successfully"})
    }
})
app.use(bodyparser.json())
app.post("/post",
   (req,res)=>{
    let id =req.body.id;
    let name =req.body.name;
    let description= req.body.description;
    let price =req.body.price;
    let typed =req.body.typed;
    let createdat= req.body.createdat;
    if(!name || name==""){
        res.send({message:"name is required"})
    }
    if(!price || price==""){
        res.send({message:"price is required"})
    }
       
            db.query("INSERT INTO  product_detail values(?,?,?,?,?,?)",
                [id,name,description,price,typed,createdat],(err,result)=>{
                    if(err){
                        res.send(err)
                    }
                    else{
                        res.send({message:"data inserted into database"})
                    }
                }
            )
            
        
    })

    
    

   
    app.put("/update/:id", (req, res) => {
        let id = req.params.id;
        let name = req.body.name;
        let description = req.body.description;
        let price = req.body.price;
        let typed = req.body.typed;
        let createdat = req.body.createdat;
      
        // Update query
        db.query(
          "UPDATE product_detail SET name=?, description=?, price=?, typed=?, createdat=? WHERE id=?",
          [name, description, price, typed, createdat, id],
          (err, result) => {
            if (err) {
              res.send(err);
            } else {
              res.send({ message: "Product updated successfully" });
            }
          }
        );
      });
      
    app.get("/list",(req,res)=>{
        let id = req.params.id;
        db.query("SELECT * FROM product_detail",
            (err,result)=>{
                if(err){
                  return(res.status(404).send(err))  
                }
                else{
                   return(res.status(200).send(result)) 
                }
            }
        )
    })
    app.delete("/delete/:id", (req, res) => {
        let id = req.params.id; // Capture the dynamic ID from the URL
        // First, check if the product exists
        db.query("SELECT * FROM product_detail WHERE id = ?", [id], (err, result) => {
            if (err) {
                return res.status(500).send(err);  // Internal server error
            }
            if (result.length > 0) {
                // Product exists, proceed to delete
                db.query("DELETE FROM product_detail WHERE id = ?", [id], (err, deleteResult) => {
                    if (err) {
                        return res.status(500).send(err);  // Internal server error
                    }
                    return res.status(200).send({ message: "Product deleted successfully" });
                });
            } else {
                // Product not found
                return res.status(404).send({ message: "Product not found" });
            }
        });
    });

const users=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"StageNode1!",
    database:"Product"
})
users.connect((err)=>{
    if(err){
        console.log(err)
    }
    else{
        console.log({message:"user connect successfully"})
    }
})
const bcrypt = require('bcryptjs');  // Make sure bcryptjs is required
const { hash } = require("crypto");


app.post("/adduser", async (req, res) => {
    let { id, names, email, password, isadmin, createdat } = req.body;

    // Validate input fields
    if (!names || names === "") {
        return res.send({ message: "PLEASE ENTER YOUR NAME. IT IS REQUIRED." });
    }
    if (!email || email === "") {
        return res.send({ message: "PLEASE ENTER YOUR EMAIL. IT IS REQUIRED." });
    }
    if (!password || password === "") {
        return res.send({ message: "PLEASE ENTER YOUR PASSWORD. IT IS REQUIRED." });
    }
   
        
    // Insert the user into the database
        users.query("INSERT INTO user  VALUES (?, ?, ?, ?, ?, ?)", 
            [id, names, email, isadmin, createdat, password], (err, result) => {
                if (err) {
                    console.error("Database error:", err);  // Log DB errors
                    return res.send({ message: "Database error: " + err });
                } else {
                    return res.send({ message: "User has been inserted successfully." });
                }
            });
        


})


app.get("/select",(req,res)=>{
    let id = req.params.id;
        db.query("SELECT * FROM user",
            (err,result)=>{
                if(err){
                  return(res.status(404).send(err))  
                }
                else{
                   return(res.status(200).send(result)) 
                }
            }
        )
})
app.put("?/updateuser",(req,res)=>{
    let id = req.params.id;
        let names = req.body.names;
        let email = req.body.email;
        let isadmin= req.body.isadmin;
        let createdat = req.body.createdat;
        let password= req.body.password
// Update query
db.query(
    "UPDATE user SET names=?, email=?, isadmin=?, createdat=?,password=? WHERE id=?",
    [names,email, isadmin, createdat,password, id],
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send({ message: "user updated successfully" });
      }
    }
  );
});



    
app.listen(port,()=>{
    console.log("app is listen on port 3000")
})