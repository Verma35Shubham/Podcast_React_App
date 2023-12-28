import React, { useState } from "react";
import Header from "../components/Common/Header";
import SignUpForm from "../components/SignUpComponents/SignUpForm";
import LoginForm from "../components/SignUpComponents/LoginForm";


function SignUpPage(){
    const [flag, setFlag] = useState(false);

    return(
        <div className="SignUp">
            <Header/>
            <div className="input-wrapper">
                {!flag ? <h1>SignUp</h1> : <h1>LogIn</h1>}
                {!flag ? <SignUpForm/> : <LoginForm/>}
                {!flag ? <p style={{cursor:"pointer"}} onClick={() => setFlag(!flag)}>Already have an account? Click here to Login.</p> : <p style={{cursor:"pointer"}} onClick={() => setFlag(!flag)}>Don't have an account? Click here to signup</p>}
            </div>
        </div>
    );
}
export default SignUpPage;