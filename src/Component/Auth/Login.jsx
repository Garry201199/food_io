import React, { useState , useEffect} from "react";

import { motion } from "framer-motion";

import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { app } from "../../firebase.config";
import { useDispatch } from "react-redux";
import userSlice from "../../Store/user-Slice";

const Login = ({ setLoginState }) => {
  const auth = getAuth(app)
  const dispatch = useDispatch()
  const [showPassword, setShowPassword] = useState(false);

  const [useDefaultCredentials , setuseDefaultCredentials ] = useState(false)

  const [loginInfo , setLoginInfo] = useState({ email:'', password:''})

  const handleLoginInfo=(e)=>{
    setLoginInfo((prevState) => ({
      ...prevState, [e.target.id] : e.target.value
    }))
  }

  const onNormalLogin= async()=>{

  await signInWithEmailAndPassword(auth, useDefaultCredentials?'defaultmail@gmail.com':loginInfo.email, useDefaultCredentials?'password': loginInfo.password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    dispatch(userSlice.actions.addUser(user.providerData[0]))
    console.log( user.providerData[0]);
    // ...
  })
  .catch((error) => {console.log(error);});
  }
  

  return (
    <motion.div>
              <h2 className="text-center text-xl text-cyan-400">Login </h2>
              <div className="form-control w-full ">
                <div>
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    id='email'
                    type="text"
                    value={useDefaultCredentials ?'defaultmail@gmail.com':loginInfo.email}
                    onChange={(e)=> handleLoginInfo(e) }
                    placeholder="Email"
                    className="input input-bordered w-full
                         focus:border-cyan-400 outline-none focus:outline-none  "
                  />
                </div>

                <div className="relative">
                  <label className="label  ">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    id='password'
                    type={!showPassword ? 'password':'text'}
                    onChange={(e)=> handleLoginInfo(e) }
                    placeholder='Password'
                    value={useDefaultCredentials ?'password':loginInfo.password}
                    className="input input-bordered 
                         focus:border-cyan-400 outline-none focus:outline-none w-full "
                  />
                  {showPassword ? (<MdVisibilityOff onClick={()=> setShowPassword(!showPassword)}
                      size={25}
                      className="absolute text-cyan-500 bottom-3 right-4 "
                    />
                    
                  ) : (
                    <MdVisibility onClick={()=> setShowPassword(!showPassword)}
                      size={25}
                      className="absolute text-cyan-500 bottom-3 right-4 "
                    />
                  )}
                </div>

                <label className="label p-4 ">
                  <span className="label-text">Use Default Credentials</span>
                  <input
                    type="checkbox"
                    checked={useDefaultCredentials}
                    onClick={()=> setuseDefaultCredentials(!useDefaultCredentials)}
                    className="checkbox cursor-pointer checkbox-primary"
                  />
                </label>
                <div>
                  <button onClick={()=>onNormalLogin()} 
                  className="btn btn-outline rounded-full w-full btn-info">
                    Login
                  </button>
                </div>

                <div className="flex flex-col justify-center items-center">
                  <div className="p-3">
                    <p>
                      Need an account?{" "}
                      <span
                        onClick={() => setLoginState("signUp")}
                        className="hover:underline  text-[#3ABFF8] text-xl font-semibold cursor-pointer"
                      >
                        Sign Up
                      </span>{" "}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
  )
}

export default Login