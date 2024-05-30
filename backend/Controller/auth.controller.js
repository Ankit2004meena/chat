export const login =(req,res)=>{
    console.log("loginPage");
    res.send("hello");
}
export const signup =async(req,res)=>{
    try{
        const{fullName,username,password,confirmPassword,gender}=req.body;
    }
    catch(error){

    }
    console.log("signup");
    res.send("hi");
    
}
export const logout =(req,res)=>{
    console.log("logout");
    
}