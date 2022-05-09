import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link'
import Input from './Input';
import { useRouter } from 'next/router';
import { post } from '../../../requests/post';
import { useUserContext } from '../../../context/user';
import { setCookie } from '../../../helpers/cookies';
import { convertProfile } from '../../../helpers/convert-file';
import Error from '../Error';

function RegisterForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [image, setImage] = useState(null);
    const [error, setError] = useState(null);
    const ref = useRef();
    const { setUser } = useUserContext();
    const router = useRouter();
    useEffect(() => { setUser(null) }, [])

    const Register = async () => {
        setError(null);
        const profile = new FormData();
        profile.append('profile', image);
        let res;
        if (image) res = await post('image', profile);
        const payload = {
            name: name,
            email: email,
            password: password,
            image: res?.data || null
        }
        const data = await post('user/register', payload);
        if (data.status === 400) return setError(data.data);
        localStorage.setItem("user", JSON.stringify(data.data.data));
        setCookie("email", email, 30 * 24 * 60);
        setCookie("password", password, 30 * 24 * 60);
        router.push('/auth/')
    }

    return (
        <div className="w-1/2 bg-white shadow-sm rounded-md p-6">
            <h1 className='mx-auto w-fit text-2xl text-blue-400 border-b my-4 font-bold'>Register</h1>
            <div className="px-4 flex flex-col gap-4">
                <Input label="Full Name"
                    inputType="text"
                    inputValue={name}
                    handleKeyUp={(e) => setName(e.target.value)} />
                <Input label="Email"
                    inputType="email"
                    inputValue={email}
                    handleKeyUp={(e) => setEmail(e.target.value)} />
                <Input label="Password"
                    inputType="password"
                    inputValue={password}
                    handleKeyUp={(e) => setPassword(e.target.value)} />
                <div className="input w-full flex my-4">
                    <label className='text-lg mr-3 w-1/5'>Profile:</label>
                    <input
                        ref={ref}
                        type='file'
                        onChange={e => setImage(e.target.files[0])}
                        className=' outline-none pt-1 pl-2 text-base flex-1 bg-transparent -mt-1 border-b border-black' />
                </div>
            </div>
            {error && <Error error={error} />}
            <button onClick={() => Register()} className='w-fit block mx-auto bg-blue-400 px-12 mt-4 text-white font-semibold rounded-md py-2 duration-150 hover:bg-blue-300'>Register</button>
            <p className='w-fit block mx-auto mt-2'>
                Already have an account,
                <Link href={'/auth/'}>
                    <a className='duration-150 hover:text-gray-600 hover:border-b'>  Login?</a>
                </Link>
            </p>
        </div>
    )
}

export default RegisterForm