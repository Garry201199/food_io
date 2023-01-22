import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase.config";
import userSlice from "../Store/user-Slice";
import { useDispatch } from "react-redux";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import SignUp from "./Auth/SignUp";
import Login from "./Auth/Login";


const Modal = ({ setOpenModal, openModal }) => {
  const [loginState, setLoginState] = useState("login");

  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const dispatch = useDispatch();



  return (
    <div>
      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
      <div className="modal backdrop-blur-sm	">
        <div
          className="modal-box  shadow-gray-500 shadow-lg
               bg-[#121212] text-white relative"
        >
          <label
            id={`${openModal} ? "my-modal-3":''`}
            onClick={() => setOpenModal(!openModal)}
            className="btn btn-sm bg-slate-600  hover:btn-info btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          {loginState === "login" ? (
            // Login
            <Login setOpenModal={setOpenModal} setLoginState={setLoginState} openModal={openModal}/>
          ) : (
            // Sign Up
            <SignUp setOpenModal={setOpenModal} setLoginState={setLoginState} openModal={openModal} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
