import React from 'react'
import { Image } from '../../components/parts'
import { RegisterForm } from '../../components/parts'

function Register() {
    return (
        <div className="w-screen h-screen bg-gray-100 flex justify-end pr-20 items-center">
            <Image />
            <RegisterForm />
        </div>
    )
}

export default Register