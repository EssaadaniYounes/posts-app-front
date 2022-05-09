import React, { useState } from 'react';
import Link from 'next/link'
import Input from './Input';
import { useRouter } from 'next/router';
import { post } from '../../../requests/post';
import { useUserContext } from '../../../context/user';
import { setCookie } from '../../../helpers/cookies';
import Error from '../Error';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const { setUser } = useUserContext();
  const router = useRouter();
  const Login = async () => {
    setError(null);

    const payload = {
      email: email,
      password: password
    }

    const data = await post('user/login', payload);
    if (data.status === 400) return setError(data.data);
    localStorage.setItem("user", JSON.stringify(data.data.data));
    setCookie("email", email, 30 * 24 * 60);
    setCookie("password", password, 30 * 24 * 60);
    setUser(data.data.data)
    router.push('/')
  }

  return (
    <div className="w-1/3 bg-white shadow-sm rounded-md p-6">
      <h1 className='mx-auto w-fit text-2xl text-blue-400 border-b my-4 font-bold'>Login</h1>
      <div className="px-4 flex flex-col gap-4">
        <Input label="Email"
          inputType="email"
          inputValue={email}
          handleKeyUp={(e) => setEmail(e.target.value)} />
        <Input label="Password"
          inputType="password"
          inputValue={password}
          handleKeyUp={(e) => setPassword(e.target.value)} />
      </div>
      {error && <Error error={error} />}
      <button onClick={() => Login()} className='w-fit block mx-auto bg-blue-400 px-12 mt-4 text-white font-semibold rounded-md py-2 duration-150 hover:bg-blue-300'>Login</button>
      <p className='w-fit block mx-auto mt-2'>
        you don't have account ,
        <Link href={'/auth/register'}>
          <a className='duration-150 hover:text-gray-600 hover:border-b'>Register?</a>
        </Link>
      </p>
    </div>
  )
}

export default LoginForm