"use client"
import React, { useEffect, useState } from 'react';
import Script from 'next/script';
import { useSession } from 'next-auth/react';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSearchParams } from 'next/navigation';
import { fetchuser, fetchpayments, initiate } from '@/actions/useractions';
import Payment from '@/models/Payment';

const PaymentPage = ({ username }) => {
  const { data: session } = useSession();
  const [paymentform, setPaymentForm] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [payments, setPayments] = useState([]);
  const searchParams = useSearchParams();

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const oid = searchParams.get("oid");
    const paymentDone = searchParams.get("payment_done");

    if (paymentDone === "true") {
      toast.success('Payment Successful', {
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
    } else if (oid) {
      fetch(`/api/verify-payment?oid=${oid}`)
        .then(response => response.json())
        .then(data => {
          if (data.payment_done) {
            toast.success('Payment Successful', {
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
          }
        })
        .catch(error => console.error('Error verifying payment:', error));
    }
  }, [searchParams]);

  const handleChange = (e) => {
    setPaymentForm({ ...paymentform, [e.target.name]: e.target.value });
  };

  const getData = async () => {
    let user = await fetchuser(username);
    setCurrentUser(user);
    let dbPayments = await fetchpayments(username);
    setPayments(dbPayments);
  };

  const pay = async (amount) => {
    try {
      let response = await initiate(amount, username, paymentform);
      let orderId = response.id;

      var options = {
        key: currentUser.razorpayid,
        amount: amount * 100,
        currency: "INR",
        name: "BUY ME A CHAI",
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: orderId,
        callback_url: `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
        prefill: {
          name: session?.user?.name || "Guest",
          email: session?.user?.email || "guest@example.com",
          contact: "9000090000"
        },
        notes: {
          address: "Razorpay Corporate Office"
        },
        theme: {
          color: "#3399cc"
        },
        method: {
          upi: true,
        }
      };

      var rzp1 = new Razorpay(options);
      rzp1.open();

      rzp1.on('payment.failed', function (response) {
        console.error("Payment failed:", response.error);
        toast.error('Payment failed. Please try again.', {
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
      });

    } catch (error) {
      console.error("Error initiating payment:", error);
      toast.error('Error initiating payment. Please check console for more details.', {
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
    }
  };

  return (
    <>
      <ToastContainer
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
      <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

      <div className="text-white">
        <div className="relative">
          <img
            className='object-cover w-full'
            src={currentUser.coverpic}
            alt="Background"
          />
          <div className="absolute -bottom-14 left-1/2 transform -translate-x-1/2 overflow-hidden rounded-full">
            <img
              className="h-28 w-28 rounded-full object-cover"
              src={currentUser.profilepic}
              alt="User"
            />
          </div>
        </div>
        <div className="info flex flex-col my-16 justify-center items-center">
          <div className="name font-bold">@{username}</div>
          <p className="text-slate-300">Let's help {username} get a chai!</p>
          <p className="text-slate-300">{payments.length} Payments . ₹{payments.reduce((total, p) => total + p.amount, 0)} raised</p>
        </div>
        <div className="payment flex flex-col md:flex-row w-full max-w-4xl mx-auto gap-5 pb-8">
          <div className="followers md:w-1/2 bg-slate-700 rounded-lg p-4">
            <h1 className="text-center font-bold text-xl">Top 10 Supporters</h1>
            <ul className="py-2">
              {payments.length === 0 && <li>No payments Yet</li>}
              {payments.map((p, i) => (
                <li key={i} className='py-1 flex items-center'>
                  <img className='h-5 w-5 rounded-full mr-2' src='https://img.freepik.com/free-photo/user-front-side-with-white-background_187299-40007.jpg?size=626&ext=jpg' alt="Supporter" />
                  <span>{p.name} donated ₹{p.amount} with a message "{p.message}"</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="payments md:w-1/2 bg-slate-700 rounded-lg p-4">
            <h1 className='text-center font-bold text-2xl'>Make a payment</h1>
            <input
              onChange={handleChange}
              value={paymentform.name}
              type="text"
              name="name"
              placeholder="Enter your name"
              className="w-[93%] rounded-lg px-4 bg-slate-800 py-1 my-2"
            />
            <input
              onChange={handleChange}
              value={paymentform.message}
              type="text"
              name="message"
              placeholder="Enter your message"
              className="w-[93%] rounded-lg px-4 bg-slate-800 py-1 my-2"
            />
            <div className="flex">
            <input
              onChange={handleChange}
              value={paymentform.amount}
              name="amount"
              className="bg-slate-800 no-spinner px-4 w-[80%] py-1 my-2 rounded-lg"
              type="number"
              placeholder="Enter amount"
            />
            <button
              type="button"
              className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm  mx-4 text-center mb-2 px-4 
                 "

              onClick={() => pay(paymentform.amount)}
            >
              Pay
            </button>
            </div>
            <div className="pay my-4">
              <button
                onClick={() => pay(500)}
                type="button"
                className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-1 mx-4 text-center mb-2"
              >
                Pay 500
              </button>
              <button
                onClick={() => pay(1000)}
                type="button"
                className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-1 mx-4 text-center mb-2"
              >
                Pay 1000
              </button>
              <button
                onClick={() => pay(2000)}
                type="button"
                className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-1 mx-4 text-center mb-2"
              >
                Pay 2000
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
