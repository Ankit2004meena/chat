import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
const useSignup = () => {
    const [loading, setLoading] = useState(false);
	const { setAuthUser } = useAuthContext();
    const signup =async({fullName, username, password, confirmPassword, gender})=>{
        const isallok=checkingfunc({fullName, username, password, confirmPassword, gender});
        if(!isallok){
            return;
        }
        setLoading(true);
        try {
            const res = await fetch("/api/auth/signup", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ fullName, username, password, confirmPassword, gender }),
			});
            // console.log("i am in signup hook");
            const data = await res.json();
            
if (data.error) {
    console.log("Error at signup hook");
    console.log(data);
    
    // Display error message in the toast
    toast.error(data.error ); // Use data.error for the error message
} else {
    // Display success message in the toast
    toast.success("Ho gya registration");
}

        localStorage.setItem("chat-user",JSON.stringify(data));
        setAuthUser(data);
        } catch (error) {
            toast.error(error.message);
        }
        setLoading(false);

    }
    return {loading,signup};

}
export default useSignup;
function checkingfunc({fullName, username, password, confirmPassword, gender}){
    if(!fullName||!username||!password||!confirmPassword||!gender){
        toast.error("Please don't submit without filling");
        console.log("Please don't submit without filling");
        return false;
    }
    if(password!== confirmPassword){
        toast.error("password not matched");
        console.log("password not matched");
        return false;
    }
    if(password.length <6){
        toast.error("Password must be of  atleast 6 char");
        console.log("Password must be of  atleast 6 char");
        return false;
    }
    return true;
}

