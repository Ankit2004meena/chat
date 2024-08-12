import express from "express";
import dotenv from "dotenv";
import authRoutes  from "./routes/auth.routes.js";
import mongoconn from "./mongoconnection/mongoconn.js";
import path from "path";
import cookieParser from "cookie-parser";
import messagerRoutes from "./routes/messageroutes.js";
import userroutes from "./routes/userroutes.js";
dotenv.config();
const app=express();
const PORT=process.env.PORT||5000;
app.use(express.json());// to parse the incoming requests with JSON payloads (from req.body)
// app.get("/",(req,res)=>{
//     //root route https://localhost:5000
//     res.send("hello world");
//     console.log(`this is basic`);
// })
// app.get("/hello",(req,res)=>{
//     res.send("hi");
//     console.log("this is hello");
// })
//for not writing above type of line again and again
//we use
app.use("/api/auth",authRoutes);
app.use("/api/messages", messagerRoutes);
app.use("/api/users", userroutes);

app.listen(PORT,()=>{
    mongoconn();
    console.log(`server is running on port ${PORT}`);
})
