import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useDispatch } from "react-redux";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import userSlice from "../../Store/user-Slice";
import { app } from "../../firebase.config";

const SignUp = ({ setOpenModal, openModal ,setLoginState }) => {

  const [showPassword, setShowPassword] = useState(false);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const dispatch = useDispatch()

  const onGoogleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        dispatch(userSlice.actions.addUser(user.providerData[0]));
        localStorage.setItem('user',  JSON.stringify(user.providerData[0]))
        console.log('user logged with google ');
        setOpenModal(!openModal);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };
  return (
    <motion.div>
              <h2 className="text-center text-xl text-cyan-400">Sign Up </h2>
              <div className="form-control w-full ">
                <div>
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="text"
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
                    type={!showPassword ? 'password':'text'}
                    placeholder='Password'
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

                <div className="mt-4">
                  <button className="btn  btn-outline rounded-full w-full btn-info">
                    Sign Up
                  </button>
                </div>
                <div className="divider">OR</div>
                <div className="flex flex-col justify-center items-center">
                  <motion.div
                    className="cursor-pointer"
                    whileTap={{ scale: 0.6 }}
                  >
                    <FcGoogle onClick={() => onGoogleLogin()} size={40} />
                  </motion.div>
                  <div className="p-3">
                    <p>
                      Already a user?{" "}
                      <span
                        onClick={() => setLoginState("login")}
                        className="hover:underline  text-[#3ABFF8] text-xl font-semibold"
                      >
                        Log In
                      </span>{" "}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
  )
}

export default SignUp