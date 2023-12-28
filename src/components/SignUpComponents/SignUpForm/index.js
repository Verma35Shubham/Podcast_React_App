import React, { useState } from "react";
import InputComponent from "../../Common/Inputs";
import Button from "../../Common/Button";
import {auth, db } from "../../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { setUser } from "../../../slices/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function SignUpForm(){
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const handleSignUp = async() => {
        setLoading(true);
        if(password === confirmPassword && password.length>=6 && fullName && email){
            try{
                // creating user's account.
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;

                // saving user's details.
                await setDoc(doc(db, "users", user.uid),{
                    name: fullName,
                    email: user.email,
                    uid: user.uid,
                });
                //saving data also in redux, call the redux action
                dispatch(setUser({
                    name: fullName,
                    email: user.email,
                    uid: user.uid,
                }));
                
                toast.success("User has been created!");
                setLoading(false);
                navigate("/profile");
            }catch(e){
                console.error("error", e);
                toast.error(e.message);
                setLoading(false);
            }
        }else{
            if(password != confirmPassword){
                toast.error("Please Make Sure Your Password and Confirm Password mactches!!");
            }else if(password.length<6){
                toast.error("Please Make Sure Your Password Length is more than 6!");
            }
            setLoading(false);
        }
        
    }
    return(
        <div>
            <InputComponent state={fullName} setState={setFullName} placeholder="Full Name" type="text" required={true}/>
            <InputComponent state={email} setState={setEmail} placeholder="Email" type="text" required={true}/>
            <InputComponent state={password} setState={setPassword} placeholder="Password" type="password" required={true}/>
            <InputComponent state={confirmPassword} setState={setConfirmPassword} placeholder="Confirm Password" type="password" required={true}/>
            <Button text={loading ? "Loading...":"SignUp"} disabled={loading} onClick={handleSignUp}/>
        </div>
    );
}
export default SignUpForm;