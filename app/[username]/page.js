import React from 'react'
import PaymentPage from '@/components/PaymentPage'
import Razorpay from 'razorpay'
import { notFound } from 'next/navigation'
import connectDB from '@/db/connectDb'
import User from '@/models/User'
const Username =async ({ params }) => {
  const checkuser=async()=>{
    await connectDB()
    let u=await User.findOne({username:params.username
    })
    if(!u){
      return notFound()
    }
  }
  await checkuser()
  return (
    <>
    <PaymentPage username={params.username}/>
    </>
  )
}

export default Username
export async function generateMetadata({params}){
  return{
    title:`${params.username} - Get me a chai`
  }
}