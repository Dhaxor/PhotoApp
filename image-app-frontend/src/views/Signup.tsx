import React, { useRef, useState } from 'react'
import axiosClient from '../axios-client';
import toast from 'react-hot-toast';
import { useStateContext } from '../contexts/ContextProvider';

export default function Signup() {

	const nameRef = useRef<HTMLInputElement>(null);
	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	const [errors, setErrors] = useState(null);
	const { setUser, setToken } = useStateContext();


	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		const payload = {
			name: nameRef.current?.value,
			email: emailRef.current?.value,
			password: passwordRef.current?.value
		}

		const toastId = toast.loading('loading');
		axiosClient.post('/signup', payload)
			.then(({data}) => {
				setUser(data.user);
				setToken(data.token)
				toast.success('Signup successful', { id: toastId });
			})
			.catch(err => {
				const response = err.response;

				if (response && response.status == 422) {
					setErrors(response.data.errors);
				}
			}).finally(() => {
				toast.dismiss(toastId);
			})
	}

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500">
      <div className="bg-white px-16 py-14 rounded-lg shadow-2xl">
      
        <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">Sign Up</h2>
        { errors && <div className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 mb-4" role="alert">
			{ Object.keys(errors).map(key => (
				<p key={key}>{ errors[key][0] }</p>
			))}
			</div>
		}
        <form 
			onSubmit={onSubmit}
			className="space-y-4">
          <div>
            <label htmlFor="name" className="text-sm font-bold text-gray-600 block">Name</label>
            <input  ref={nameRef} type="text" id="name" className="w-full p-3 border rounded mt-1"/>
          </div>
        
          <div>
            <label htmlFor="email" className="text-sm font-bold text-gray-600 block">Email</label>
            <input ref={emailRef} type="email" id="email"  className="w-full p-3 border rounded mt-1"/>
          </div>

          <div>
            <label htmlFor="password" className="text-sm font-bold text-gray-600 block">Password</label>
            <input  ref={passwordRef} type="password" id="password" className="w-full p-3 border rounded mt-1"/>
          </div>
        
          <button className="bg-indigo-500 text-white py-3 rounded-md text-sm w-full">Sign Up</button>
          
          <div className="text-center text-gray-400 text-xs">
            By signing up, you agree to our terms and conditions.
          </div>
        </form>
      </div>
    </div>
  )
}