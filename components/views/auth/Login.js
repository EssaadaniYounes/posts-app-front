import { useRouter } from "next/router";
import { useState, useEffect, useContext, useRef } from "react";
import { useUserContext } from "../../../context/user";
import { LoginForm, Image } from "../../parts";


const Login = () => {

    const { setUser } = useUserContext();

    useEffect(() => { setUser(null) }, [])

    return (
        <div className="w-screen h-screen bg-gray-100 flex justify-end pr-20 items-center">
            <Image />
            <LoginForm />
        </div>
    )
};


export default Login;