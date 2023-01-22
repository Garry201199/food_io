import React, { useContext, useState } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import login from "../../img/Computer login.gif";
import GoogleAuth from "./GoogleAuth";
import AuthContext from "../../Context/AuthContext";
import { getAuth } from "firebase/auth";
import { app } from "../../firebase.config";
import { toast } from "react-toastify";
const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    setuseDefaultCredentials,
    onLogin,
    useDefaultCredentials,
    loginInfo,
    handleFormInfo,
    setLoginInfo,
  } = useContext(AuthContext);
  // const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const auth = getAuth(app);


  const handleSubmit = (e) => {
    e.preventDefault();

    if ((loginInfo.email === '' || loginInfo.password==='')){

      if(useDefaultCredentials){
        onLogin(auth, 'default@gmail.com', 'password420' )
        
        return
      }
        toast.error('please enter all details')
        return
    }
    if ((loginInfo.email !== '' || loginInfo.password !=='')){
      onLogin(auth, loginInfo.email, loginInfo.password )
        
        return
    }
  };
 
  return (
    <motion.div
      initial={{ rotateY: 90 }}
      animate={{ rotateY: 0 }}
      transition={{ ease: "easeInOut", duration: 0.8 }}
    >
      <div className="flex flex-wrap w-full h-screen bg-black">
        <div className="flex flex-col w-full md:w-1/2">
          <div className="flex  justify-center pt-12 md:justify-start md:pl-12 md:-mb-24">
            <Link
              to="/"
              className="p-4  text-4xl font-bold text-gray-900 bg-[#3abff8]"
            >
              Food.Io
            </Link>
          </div>
          <div className="flex flex-col justify-center px-8 pt-8 my-auto md:justify-start md:pt-0 md:px-24 lg:px-32">
            <p className="text-3xl text-white text-center">Login</p>
            <form
              onSubmit={handleSubmit}  autoComplete="off" 
              readOnly 

              className="flex flex-col pt-3 md:pt-8"
            >
              <div className="flex flex-col pt-4">
                <div className="flex relative ">
                  <input
                    autoComplete="off"
                    id="email"
                    type="text"
                    value={
                      useDefaultCredentials
                        ? "default@gmail.com"
                        : loginInfo.email
                    }
                    onChange={(e) => handleFormInfo(e)}
                    placeholder="Email"
                    className="input  placeholder:Email  text-white flex-1 border-gray-800 w-full
                    focus:ring-2 focus:ring-[#3abff8] focus:border-transparent outline-none focus:outline-none  "
                  />
                  {/* <input type="text" id="design-login-email" className=" flex-1 rounded-full appearance-none border border-gray-300  w-full py-2 px-4  text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-[#3abff8] focus:border-transparent" placeholder="Email"/> */}
                </div>
              </div>
              <div className="flex flex-col pt-4 mb-4">
                <div className="flex relative ">
                  <input
                    autoComplete="off"
                    id="password"
                    placeholder="Password"
                    type={!showPassword ? "password" : "text"}
                    onChange={(e) => handleFormInfo(e)}
                    value={
                      useDefaultCredentials ? "password420" : loginInfo.password
                    }
                    className="input  placeholder:Email  text-white flex-1 border-gray-800 w-full
                    focus:ring-2 focus:ring-[#3abff8] focus:border-transparent outline-none focus:outline-none  "
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

                <label className="label px-4 py-2 ">
                  <span className="label-text">Use Default Credentials</span>
                  <input
                    type="checkbox"
                    checked={useDefaultCredentials}
                    onChange={() =>
                      setuseDefaultCredentials(!useDefaultCredentials)
                    }
                    className="checkbox cursor-pointer checkbox-primary"
                  />
                </label>
                <label className="label px-4 ">
                  <Link to="/forgotpassword">
                    <span className="label-text underline cursor-pointer font-semibold text-[#3abff8]">
                      Forgot Password ?
                    </span>
                  </Link>
                </label>
              </div>
              <button
                type="submit"
                className="w-full  px-4 rounded-full py-2 text-base font-semibold text-center text-gray-900 transition duration-200 ease-in bg-[#3abff8] shadow-md hover:text-black hover:bg-white focus:outline-none focus:ring-2"
              >
                <span className="w-full  ">Log In</span>
              </button>

              {/* Google Auth */}
              <div className="divider text-white ">OR</div>
              <GoogleAuth />
            </form>
            <div className="pt-4 pb-4  text-center">
              <p>
                Don&#x27;t have an account?
                <Link
                  to="/signup"
                  className="font-semibold text-[#3abff8] underline"
                >
                  Register here.
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div className="w-1/2 ">
          <img
            className="hidden p-12  transition duration-300 ease-in
            shadow-2xl
              shadow-[#3abff8]
             object-cover w-full   h-screen md:block"
            src={login}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default LoginPage;
