import React, { useContext, useState } from "react";
import avatar from "../img/avatar.png";
import icon from "../img/Icons/dosa.png";
import { Link} from "react-router-dom";
import AuthContext from "../Context/AuthContext";
import UserProfile from "./UserProfile";

const Header = () => {
  const [openProfile , setOpenProfile] = useState(false)
  const {currentUser} = useContext(AuthContext)
  return (
    <div>
      {/* Desktop AppBar  */}
      <div className=" w-full py-3 justify-between  z-10 top-0 fixed hidden px-8  md:flex bg-[#1f2229]  ">
        <Link to="/" className="flex items-center ml-8 justify-center">
          <img src={icon} className="h-12 w-12 bg-inherit" alt="icons"></img>
          <button className="px-3 font-Pop normal-case text-white font-semibold  text-2xl">Food.io</button>
        </Link>
        <div className="flex items-center justify-center mr-8">
          <ul className=" normal-case gap-x-12 text-lg flex  justify-center items-center ">
            <li className="cursor-pointer hover:text-white duration-300 transition-all">
              Home 
            </li>
            <li className="cursor-pointer hover:text-white duration-300 transition-all">
              Menu 
            </li>
            <li className="cursor-pointer hover:text-white duration-300 transition-all flex gap-x-1 ">
              About <span> Us</span> 
            </li>
            <li className="cursor-pointer hover:text-white duration-300 transition-all">
              Services 
            </li>
          </ul>

          <div className="dropdown dropdown-end px-3">
            <label tabIndex="0" className="btn  btn-ghost btn-circle">
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>

                <span className="badge badge-primary p-1 rounded-full indicator-item">
                  8
                </span>
              </div>
            </label>
            <div
              tabIndex="0"
              className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow"
            >
              <div className="card-body">
                <span className="font-bold text-lg">8 Items</span>
                <span className="text-info">Subtotal: $999</span>
                <div className="card-actions">
                  <button className="btn btn-primary btn-block">
                    View cart
                  </button>
                </div>
              </div>
            </div>
          </div>

          
          <div onClick={()=> setOpenProfile(!openProfile)} className="dropdown dropdown-end">
            <label
              tabIndex="0"
              htmlFor="my-modal-3"
              className="btn modal-button btn-ghost btn-circle avatar"
            >
              <div className="w-12 h-12 rounded-full">
                <img
                  className=" scale-100 focus:scale-95 "
                  src={ ` 
                  ${  currentUser?.photoURL ?? avatar}`}
                  alt="not"
                />
              </div>
            </label>
            {/* User Profile Card */}
            {
              openProfile && <UserProfile/>
            }
            
          </div>
        </div>
      </div>

      {/* Mobile AppBar  */}
      <div className=" w-full bg-[#1b1d20] py-3 z-10 fixed  flex justify-between items-center px-2 md:hidden ">
        <div className="">
        <div className="dropdown dropdown-content ">
            <label tabIndex="0" className="btn  btn-ghost btn-circle">
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>

                <span className="badge badge-primary p-1 rounded-full indicator-item">
                  8
                </span>
              </div>
            </label>
            <div
              tabIndex="0"
              className="mt-3 card card-compact dropdown-content w-52 bg-gray-800  shadow"
            >
              <div className="card-body">
                <span className="font-bold text-lg">8 Items</span>
                <span className="text-info">Subtotal: $999</span>
                <div className="card-actions">
                  <button className="btn btn-primary btn-block">
                    View cart
                  </button>
                </div>
              </div>
            </div>
          </div>
          
        </div>
        <div className="flex justify-center items-center ">
          <img src={icon} className="h-12 w-12" alt="icons"></img>
          <Link to='/' className="px-3 font-semibold text-white font-Pop normal-case text-2xl">Food.io</Link>
        </div>
        <div className="">
          <div className="dropdown dropdown-end">
            <label onClick={()=> setOpenProfile(!openProfile)} tabIndex="0" className="btn btn-ghost btn-circle avatar">
              <div className="w-12 h-12 rounded-full">
              <img
                  className=" scale-100 focus:scale-95 "
                  src={ ` 
                  ${  currentUser?.photoURL ?? avatar}`}
                  alt="not"
                />
              </div>
            </label>
            {
              openProfile && <UserProfile openProfile={openProfile}  setOpenProfile={setOpenProfile} />
            }
            

          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
