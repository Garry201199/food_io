import React, { useContext } from "react";
import AuthContext from "../Context/AuthContext";
import avatar from "../img/avatar.png";
import { MdAdd,  MdLogin, MdLogout } from "react-icons/md";
import useAuthStatus from "../Hooks/useAuthStatus";
import { useNavigate } from "react-router-dom";
import { motion ,AnimatePresence } from "framer-motion";
const UserProfile = ({setOpenProfile, openProfile}) => {
  const { currentUser, onlogOut } = useContext(AuthContext);
  const { loggedIn } = useAuthStatus();
  const navigate = useNavigate()
  return (
   <AnimatePresence>
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      tabIndex="0"
      className="dropdown-content "
    >
      <div className="md:p-8 p-6  max-w-96 min-w-max md:w-96 relative bg-gray-700 rounded">
        <div className="absolute p-1 right-0 top-0">
          <button onClick={()=> setOpenProfile(!openProfile)} className="btn hover:bg-[#3abff8] text-white  btn-circle btn-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="md:mb-4  relative  text-center h-28 md:h-40   ">
          <div className=" h-16  md:h-28 p-3 bg-gradient-to-r from-[#3abff8] via-[#6DD5FA] to-[#FFFFFF]  skew-y-6 "></div>
          <div className=" w-16  md:w-24 drop-shadow-2xl  
          avatar online  rounded-full  absolute top-10 left-16 md:top-10 md:left-24  ">
            <img
              className="rounded-full"
              alt='none'
              src={` 
                  ${currentUser?.photoURL ?? avatar}`}
            />
          </div>
       
        </div>

        <div className="md:mb-8 mb-2 space-y-2">
          <p className="text-white text-center text-xl  md:text-2xl">
            {" "}
            Hi <motion.div className=" text-3xl md:text-6xl"
    style={{
      marginBottom: '-20px',
      marginRight: '-45px',
      paddingBottom: '20px',
      paddingRight: '45px',
      display: 'inline-block',
    }}
    animate={{ rotate: 20 }}
    transition={{
      repeat: Infinity,
      from: 0,
      duration: 0.2,
      ease: 'easeInOut',
      repeatType:'reverse',
    }}
  >
    👋
  </motion.div> , {currentUser.displayName ?? currentUser.email ?? "user"}
            
          </p>
        </div>
    {/*  */}
             <ul
              
              className="menu menu-compact p-2  text-semibold  md:hidden
              text text-slate-300  rounded-box "
            >
              <li className="focus:text-gray-900" >
                <a href="#">Home</a>
              </li>
              <li className="focus:text-gray-900">
                <a href="#">Menu</a>
              </li>
              <li className="focus:text-gray-900">
                <a href="#">About Us</a>
              </li>
              <li className="focus:text-gray-900">
                <a href="#">Services</a>
              </li>
            </ul>
    {/*  */}

        <div className="gap-y-2 flex flex-col">
          <button
            onClick={() => {navigate("/createItem");
              setOpenProfile(!openProfile)
  
            }}
            className="inline-flex items-center justify-center 
w-full  h-8 md:h-12 px-6 font-semibold md:tracking-wide
text-gray-900 hover:text-gray-900 transition duration-300 ease-in-out  rounded
shadow-md bg-[#3abff8] hover:bg-[#e1f6ff] 
focus:shadow-outline focus:outline-none"
          >
            New Item <MdAdd size={25} className="ml-3" />
          </button>

          <button
            onClick={() => {
              loggedIn ? onlogOut() : navigate("/login");
            }}
            className="inline-flex items-center justify-center 
       w-full h-8 md:h-12 px-6 font-semibold md:tracking-wide
        text-gray-900 hover:text-gray-900 transition duration-300 ease-in-out rounded
         shadow-md bg-[#3abff8] hover:bg-[#e1f6ff]
          focus:shadow-outline focus:outline-none"
          >
            {loggedIn ? (
              <>
                Log Out <MdLogout className="ml-3" size={25} />
              </>
            ) : (
              <>
                Log In <MdLogin size={25} className="ml-3" />
              </>
            )}
          </button>
        </div>
      </div>
      <div className="w-11/12 h-2 mx-auto bg-[#3abff8] rounded-b opacity-75" />
      <div className="w-10/12 h-2 mx-auto bg-[#3abff8] rounded-b opacity-50" />
      <div className="w-9/12 h-2 mx-auto bg-[#3abff8] rounded-b opacity-25" />
    </motion.div>
    </AnimatePresence>
  );
};

export default UserProfile;
