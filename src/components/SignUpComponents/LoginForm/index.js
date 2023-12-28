import React, { useState } from "react";
import InputComponent from "../../Common/Inputs";
import Button from "../../Common/Button";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { setUser } from "../../../slices/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function LoginForm(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const[loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async() => {
        setLoading(true);
        if(email && password){
            try{
                const userCredential = await signInWithEmailAndPassword(auth,email,password);
                const user = userCredential.user;
                const userDoc = await getDoc(doc(db, "users", user.uid));
                const userData = userDoc.data();
    
                dispatch(setUser({
                    name: userData.name,
                    email: user.email,
                    uid: user.uid,
                }));
    
                toast.success("Login Successful!")
                setLoading(false);
                navigate("/profile");
            }catch(error){
                console.error("Error signing in:", error);
                setLoading(false);
                toast.error(error.message);
            }
        }else{
            setLoading(false);
            toast.error("Make sure email and password are not empty.")
        }
        
    }
    return(
        <div>
            <InputComponent state={email} setState={setEmail} placeholder="Email" type="text" required={true}/>
            <InputComponent state={password} setState={setPassword} placeholder="Password" type="password" required={true}/>
            <Button text={loading?"Loading...":"Login"} onClick={handleLogin} disabled={loading}/>
        </div>
    );
}
export default LoginForm;