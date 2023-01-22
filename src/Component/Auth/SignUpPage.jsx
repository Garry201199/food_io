import React, { useContext, useState } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import {motion} from 'framer-motion'
import signup from "../../img/Sign up.gif";
import GoogleAuth from "./GoogleAuth";
import AuthContext from "../../Context/AuthContext";
import { app } from "../../firebase.config";
import { getAuth } from "firebase/auth";
const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    loginInfo,
    handleFormInfo,
    onSignUp
  } = useContext(AuthContext);
  const auth = getAuth(app);
  const handleSubmit=(e)=>{
    e.preventDefault()
    if ((loginInfo.email !== '' || loginInfo.name !== '' || loginInfo.password !=='')){
      onSignUp(auth, loginInfo.name, loginInfo.email, loginInfo.password )
        return
    }
  }
  return (
    <motion.div initial={{ rotateY: 90 }}
    animate={{ rotateY: 0 }}
    transition={{ ease: "easeInOut", duration: 1 }}>
      <div className="flex flex-wrap w-full h-screen bg-black">
        <div className="flex flex-col w-full md:w-1/2">
          <div className="flex  justify-center pt-12 md:justify-start md:pl-12 md:-mb-20">
            <Link
              to='/'
              className="p-4 m-1 text-4xl font-bold text-gray-900 bg-[#46c4fb]"
            >
              Food.Io
            </Link>
          </div>
          <div className="flex flex-col justify-center px-8 pt-8 my-auto md:justify-start md:pt-0 md:px-24 lg:px-32">
            <p className="text-3xl text-white text-center">Sign Up </p>
            <form className="flex flex-col pt-3 md:pt-8" onSubmit={handleSubmit}  autoComplete="off" >
            <div className="flex flex-col pt-4 ">
                <div className="flex relative ">
                  <input
                    autoComplete='off'

                    id="name"
                    type="text"
                    value={loginInfo.name}
                    onChange={(e)=> handleFormInfo(e) }
                    placeholder="Name"
                    className="input text-white flex-1 border-gray-800 w-full
                    focus:ring-2 focus:ring-[#3abff8] focus:border-transparent outline-none focus:outline-none  "
                  />
                  {/* <input type="text" id="design-login-email" className=" flex-1 rounded-full appearance-none border border-gray-300  w-full py-2 px-4  text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-[#3abff8] focus:border-transparent" placeholder="Email"/> */}
                </div>
              </div>
              <div className="flex flex-col pt-4">
                <div className="flex relative ">
                  <input
                    autoComplete='off'
                    value={loginInfo.email}
                    onChange={(e)=> handleFormInfo(e) }
                    id="email"
                    type="text"

                    placeholder="Email"
                    className="input text-white  flex-1 border-gray-800 w-full
                    focus:ring-2 focus:ring-[#3abff8] focus:border-transparent outline-none focus:outline-none  "
                  />
                  {/* <input type="text" id="design-login-email" className=" flex-1 rounded-full appearance-none border border-gray-300  w-full py-2 px-4  text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-[#3abff8] focus:border-transparent" placeholder="Email"/> */}
                </div>
              </div>
              <div className="flex flex-col pt-4 mb-12">
                <div className="flex relative ">
                  <input
                    id="password"
                    autoComplete='off'
                    value={loginInfo.password || ''}
                    onChange={(e)=> handleFormInfo(e) }
                    type={!showPassword ? "password" : "text"}          
                    placeholder="Password"
                    className="input text-white flex-1 border-gray-800 w-full
                    focus:ring-2 focus:ring-[#3abff8] focus:border-transparent outline-none focus:outline-none "
                  />
                  {showPassword ? (
                    <MdVisibilityOff
                      onClick={() => setShowPassword(!showPassword)}
                      size={25}
                      className="absolute text-[#3abff8] bottom-3 right-4 "
                    />
                  ) : (
                    <MdVisibility
                      onClick={() => setShowPassword(!showPassword)}
                      size={25}
                      className="absolute text-[#3abff8] bottom-3 right-4 "
                    />
                  )}
                </div>
              </div>
              <button
                type="submit"
                className="w-full px-4 rounded-full py-2 text-base font-semibold text-center text-gray-900 transition duration-200 ease-in bg-[#3abff8] shadow-md hover:text-black hover:bg-white focus:outline-none focus:ring-2"
              >
                <span className="w-full">Sign Up</span>
              </button>
                    {/* Google Auth */}
              <div className="divider  ">OR</div>
                <GoogleAuth/>
            </form>
            <div className="pt-4 pb-4 text-center">
              <p>
                Already have an account?
                <Link to="/login" className="font-semibold text-[#3abff8] underline">
                  Login here.
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div className="w-1/2  ">
          <img
            className="hidden p-12  transition duration-300 ease-in
            shadow-2xl
              shadow-[#3abff8]
             object-cover w-full inset-y-0   h-screen md:block"
            src={signup}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default SignUpPage;
