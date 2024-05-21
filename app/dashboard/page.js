"use client"
import { React, useEffect, useState } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { fetchuser,updateProfile } from '@/actions/useractions'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify'
const Dashboard = () => {
  const { data: session, update } = useSession()
  const router = useRouter();
  const [form, setform] = useState({})
  useEffect(() => {
    getData()
    if (!session) {
      router.push('/login')
    }
  }, [router, session])
  const handlechange = (e) => {
    setform((prevForm) => ({
      ...prevForm,
      [e.target.name]: e.target.value
    }));
  };
  
  const getData = async () => {
    if (!session || !session.user) {
      // Handle case where session or session.user is not available
      return;
    }
    let u = await fetchuser(session.user.name);
    setform(u);
};
const handleSubmit = async () => {
  let a=await updateProfile(form,session.user.name)
  toast('Profile Updated', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
    });
  
};

  return (
    <><ToastContainer
    position="top-right"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="light"
    />
    {/* Same as */}
    <ToastContainer />
      <div className="container mx-auto text-white">
        <h1 className='font-bold text-2xl text-center my-5'>Welcome to the Dashboard</h1>
        <form className='max-w-2xl mx-auto' action={handleSubmit}>
          <div className="my-3">
            <label htmlFor='name' className='block  mx-2'>Name</label>
            <input type='text' value={form.name?form.name: ""} onChange={handlechange} name='name' id='name' className='w-full block p-1 bg-slate-800 border-gray-300 rounded-lg my-1'></input>
          </div>
          <div className="my-3">
            <label htmlFor='email' className='block  mx-2'>Email</label>
            <input type='text' value={form.email ? form.email : ""} onChange={handlechange} className='w-full block p-1 bg-slate-800 border-gray-300 rounded-lg my-1'></input>
          </div>
          <div className="my-3">
            <label htmlFor='username' className='block  mx-2'>Username</label>
            <input type='text' value={form.username ? form.username : ""} onChange={handlechange} className='w-full block p-1 bg-slate-800 border-gray-300 rounded-lg my-1'></input>
          </div>
          <div className="my-3">
            <label htmlFor='profile' className='block  mx-2'>Profile Picture</label>
            <input name='profilepic' type='text' value={form.profilepic ? form.profilepic : ""} onChange={handlechange} className='w-full block p-1 bg-slate-800 border-gray-300 rounded-lg my-1'></input>
          </div>
          <div className="my-3">
            <label htmlFor='cover'  className='block  mx-2'>Cover Picture</label>
            <input type='text' name='coverpic' value={form.coverpic ? form.coverpic : ""} onChange={handlechange} className='w-full block p-1 bg-slate-800 border-gray-300 rounded-lg my-1'></input>
          </div>
          <div className="my-3">
            <label htmlFor='razorpayid' className='block  mx-2'>Razorpay ID</label>
            <input type='text' name='razorpayid' value={form.razorpayid ? form.razorpayid : ""} onChange={handlechange} className='w-full block p-1 bg-slate-800 border-gray-300 rounded-lg my-1'></input>
          </div>
          <div className="my-3">
            <label htmlFor='razorpaysecret' className='block  mx-2'>Razorpay Sescret</label>
            <input type='text' name='razorpaysecret' value={form.razorpaysecret ? form.razorpaysecret : ""} onChange={handlechange} className='w-full block p-1 bg-slate-800 border-gray-300 rounded-lg my-1'></input>
          </div>
          <button onClick={handleSubmit} type="button" className="mx-72 my-3 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Submit</button>
        </form>
      </div>
    </>
  )
}

export default Dashboard
