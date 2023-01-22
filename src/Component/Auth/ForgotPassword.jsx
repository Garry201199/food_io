import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../Context/AuthContext";
import forgotPass from "../../img/Forgot password.gif";
const ForgotPassword = () => {
  const { forgotPassword } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  return (
    <div>
      <div className="flex flex-wrap w-full h-screen bg-black">
        <div className="flex flex-col w-full md:w-1/2">
          <div className="flex flex-col justify-center p-8  pt-8 my-auto md:justify-start md:pt-0 md:px-24 lg:px-32">
            <p className="text-3xl text-white text-center">Forgot Password </p>
            <div className="flex gap-y-8 flex-col pt-3 md:pt-8">
              <div className="flex flex-col pt-4">
                <div className="flex relative ">
                  <input
                    autoComplete="off"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id="email"
                    type="text"
                    placeholder="Email"
                    className="input text-white  flex-1 border-gray-800 w-full
                    focus:ring-2 focus:ring-[#3abff8] focus:border-transparent outline-none focus:outline-none  "
                  />
                </div>
              </div>

              <button
                onClick={() => forgotPassword(email)}
                className="w-full px-4 rounded-full py-2 text-base font-semibold text-center text-gray-900 transition duration-200 ease-in bg-[#3abff8] shadow-md hover:text-black hover:bg-white focus:outline-none focus:ring-2"
              >
                <span className="w-full">Submit</span>
              </button>
              <div className="divider  ">OR</div>
            </div>
            <div className="pt-4 pb-4 text-center">
              <p>
                Already have an account?
                <Link
                  to="/login"
                  className="font-semibold text-[#3abff8] underline"
                >
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
            src={forgotPass}
          />
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
