import React, { useEffect } from 'react'
import { useStateContext } from '../contexts/ContextProvider'
import { Link, Navigate, Outlet } from 'react-router-dom'
import axiosClient from '../axios-client'

export default function DefaultLayout() {
	const { user, token, setUser, setToken } = useStateContext();

  useEffect(() => {
    axiosClient.get('/user')
      .then(({data}) => {
        setUser(data.user);
      })
  
  }, [setUser]);


	if (!token) {
		return <Navigate to="/login" />
	}

  const logout = () => {
    axiosClient.post('/logout')
    .then(() => {
      setUser(null);
      setToken('');
    })
  }
  
  return (
    <>
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="bg-gray-800 text-gray-100 px-4 py-8 w-60">
          <h2 className="text-3xl font-semibold mb-4"><Link to="/">Image App</Link></h2>

          <ul>
            <li><Link to="/favourites" className="flex py-2 px-4 hover:bg-gray-700 rounded transition">Favourites</Link></li>
          </ul>
        </div>

        {/* Content */}
        <div className="flex-1 p-8">

          {/* Navbar */}
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-semibold">Dashboard</h1>
            
            <div className="flex items-center">
              <div className="mr-4">{user?.name}</div> 
              <button onClick={logout} className="bg-indigo-500 text-white px-2 py-1 rounded hover:bg-indigo-600">Logout</button>
            </div>
          </div>
          
          <Outlet />
        </div>

      </div>
    </>
  )
}
