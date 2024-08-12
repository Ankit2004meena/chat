import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";
export const login =async (req,res)=>{
    try{
        const {username,password}=req.body;
        const user=await User.findOne({username});
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");
       if(!user||!isPasswordCorrect){
        res.status(400).json({error:"Invalid username and password"});
       }
        console.log("generating token and cookie");
        generateTokenAndSetCookie(user._id, res);
        res.status(200).json({
            _id:user._id,
            fullName:user.fullName,
            userName:user.username

        });

    }
    catch(error){
        res.status(500).json({error:"Error in logging in"});
        console.log("error in login",error.message);
    }
    console.log("loginPage");
    // res.send("hello");
}
export const signup =async(req,res)=>{
    try{
        const{fullName,username,password,confirmPassword,gender}=req.body;
        if(password!==confirmPassword){
            return res.status(400).json({error:"Password don't match"});
        }
        const user=await User.findOne({username});
        if(user){
            return res.status(400).json({error:"UserName already exists"});
        }
        //Hashed password
        const salt =await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);
        //appvtar api link : https://avatar-placeholder.iran.liara.run/
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
		const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
        const newUser=new User({
            fullName,
            username,
            password:hashedPassword,
            gender,
            profilePic:gender=="Male"?boyProfilePic:girlProfilePic,
        });

        if(newUser){
             console.log("token need to generate");
             generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();

			res.status(200).json({
				_id: newUser._id,
				fullName: newUser.fullName,
				username: newUser.username,
				profilePic: newUser.profilePic,
                message:"Everything is ok and user is created"
			});
            console.log("We successfully able to signup");
          
        }else{
            res.status(400).json({error:"Token is not able to generate due to invalid user"});
        }
    }
    catch(error){
        console.log("Error in signup controller",error.message);
      //  res.status(500).json({ error: "Internal Server Error" });
      res.status(400).json({error:"not able to signup"});
    }
    // console.log("signup");
    // res.send("hi");
    
}
export const logout =(req,res)=>{
    try{
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message:"Logged out successfully"});
    }
    catch(error){
         console.log("Error in logout controller",error.message);
         res.status(500).json({error:"error in logging out"});
    }
    
}