import { useState } from "react";
import { toast } from "react-toastify";
import { useAuthContext } from "../context/AuthContext";

const useLogin = () => {
    const [loading,setLoading]=useState(false);
    const { setAuthUser } = useAuthContext()
    const login=async(username,password)=>{
        const success = handleInputErrors(username, password);
		if (!success) return;
        setLoading(true);
        try{
        const res=await fetch("/api/auth/login",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({username,password})
        })
        const data=await res.json();

        if(data.error){
        console.log("Error at signup hook");
        console.log(data);
        // Display error message in the toast
        toast.error(data.error); 
        // Use data.error for the error message
        }
        else {
            toast("Login Done");
        }
        localStorage.setItem("chat-user", JSON.stringify(data));
			setAuthUser(data);
            console.log(data);
           
    }
        catch(error){
            console.log("error in loging",error);
        }
        finally{
            setLoading(false);
        }
    }
  return {loading,login};
}
function handleInputErrors(username, password) {
	if (!username || !password) {
		toast.error("Please fill in all fields");
		return false;
	}

	return true;
}
export default useLogin
