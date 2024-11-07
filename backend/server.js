// import express from "express";
// import dotenv from "dotenv";
// import authRoutes  from "./routes/auth.routes.js";
// import mongoconn from "./mongoconnection/mongoconn.js";
// import path from "path";
// import cookieParser from "cookie-parser";
// import messagerRoutes from "./routes/messageroutes.js";
// import userroutes from "./routes/userroutes.js";

// import { app, server } from "./socket/socket.js";
// dotenv.config();
// // const app=express();
// app.use(crossOriginIsolated)
// const PORT=process.env.PORT||5000;
// app.use(express.json());
// app.use(cookieParser());
// // to parse the incoming requests with JSON payloads (from req.body)
// // app.get("/",(req,res)=>{
// //     //root route https://localhost:5000
// //     res.send("hello world");
// //     console.log(`this is basic`);
// // })
// // app.get("/hello",(req,res)=>{
// //     res.send("hi");
// //     console.log("this is hello");
// // })
// //for not writing above type of line again and again
// //we use
// app.use("/api/auth",authRoutes);
// app.use("/api/messages", messagerRoutes);
// app.use("/api/users", userroutes);

// server.listen(PORT,()=>{
//     mongoconn();
//     console.log(`server is running on port ${PORT}`);
// })
 import express from "express";
import dotenv from "dotenv";
import authRoutes  from "./routes/auth.routes.js";
import mongoconn from "./mongoconnection/mongoconn.js";
import path from "path";
import cookieParser from "cookie-parser";
import messageRoutes from "./routes/messageroutes.js";
import userRoutes from "./routes/userroutes.js";

import { app, server } from "./socket/socket.js";

dotenv.config();

const __dirname = path.resolve();
// PORT should be assigned after calling dotenv.config() because we need to access the env variables. Didn't realize while recording the video. Sorry for the confusion.
const PORT = process.env.PORT || 5000;

app.use(express.json()); // to parse the incoming requests with JSON payloads (from req.body)
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.use(express.static(path.join(__dirname, "/Frontend/dist")));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "Frontend", "dist", "index.html"));
});

server.listen(PORT, () => {
    mongoconn();
	console.log(`Server Running on port ${PORT}`);
});