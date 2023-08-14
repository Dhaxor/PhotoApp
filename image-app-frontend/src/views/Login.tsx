import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import axiosClient from '../axios-client';
import { useStateContext } from '../contexts/ContextProvider';
import toast from 'react-hot-toast/headless';

export default function Login() {
	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	const [errors, setErrors] = useState(null);
	const { setUser, setToken } = useStateContext();


	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		const payload = {
			email: emailRef.current?.value,
			password: passwordRef.current?.value
		}

    const toastId = toast.loading('Loading...');
		axiosClient.post('/login', payload)
			.then(({data}) => {
				setUser(data.user);
				setToken(data.token)
        toast.success('Login successful', { id: toastId });
			})
			.catch(err => {
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.message)
          toast.error(response.data.message, { id: toastId })
        }
			})
	}
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-white p-16 rounded-lg shadow-2xl w-96">
        <h2 className="text-3xl font-bold mb-10 text-gray-800">Login</h2>
           { errors && <div className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 mb-4" role="alert">
                <p>{ errors }</p>
              </div>
            }
        <form
            onSubmit={onSubmit}
            className="space-y-4">
          <div>
            <label htmlFor="email" className="block mb-1 uppercase font-bold text-gray-500">Email</label>
            <input ref={emailRef} type="email" id="email" className="border p-3 w-full rounded-lg" />  
          </div>
          
          <div>
            <label htmlFor="password" className="block mb-1 uppercase font-bold text-gray-500">Password</label>
            <input ref={passwordRef} type="password" id="password" className="border p-3 w-full rounded-lg"/>
          </div>
          
          <div>
            <button className="bg-indigo-500 text-white py-3 rounded-lg w-full hover:bg-indigo-600">Log In</button>  
          </div>
        </form>

        <div className="mt-10 grid grid-cols-3 items-center text-gray-400">
          <hr className="border-gray-300"/>
          <p className="text-center text-sm">OR</p>
          <hr  className="border-gray-300"/>
        </div>

		<div className="text-center mt-4">
          Don't have an account yet?  
          <Link to="/signup" className="text-indigo-500 hover:underline"> Sign up</Link>
        </div>
      </div>
    </div>
  )
}