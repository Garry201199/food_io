import React, {   useEffect, useState } from "react";
import { motion } from "framer-motion";
import  './Create.css'
import { MdCloudUpload, MdDelete, MdFastfood, MdFoodBank, MdMoney } from "react-icons/md";
import { Menu, Transition } from "@headlessui/react";
import { categories } from "../Utils/heroData";
import { RiArrowUpSLine, RiArrowDownSLine } from "react-icons/ri";
import { TailSpin } from "react-loader-spinner";
const CreateContainer = () => {
  const [title, setTitle] = useState("");
  const [calories, setCalories] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(null);
  const [imageAsset, setImageAsset] = useState(false);
  const [fields, setFields] = useState(true);
  const [alertStatus, setAlertStatus] = useState("");
  const [msg, setMsg] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    console.log(category);
  }, [category]);
  const onDeleteImage = () => {};

  return (
    <div className="w-full  min-h-screen flex flex-col mt-24 items-center justify-start">
      <div className="w-[90%] md:w-[75%] gap-4 border border-gray-300 p-4 flex flex-col rounded-xl items-center justify-center">
        {fields && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`alert ${
              alertStatus === "danger" ? "alert-error" : "alert-success"
            }  shadow-lg`}
          >
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                class="stroke-current flex-shrink-0 w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span>{msg}</span>
            </div>
          </motion.div>
        )}
        <div className="w-full border-b p-2 rounded-lg border-gray-200 focus:border-gray-50 flex first-letter:">
          <MdFastfood size={25} />
          <input
            placeholder="Give me any name..."
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            className="w-full px-3  h-full outline-none border-none  text-lg bg-transparent  
          placeholder:text-gray-500 text-white "
          ></input>
        </div>

        {/* drop down */}
        <Menu as="div" className="dropdown w-full ">
          <Menu.Button
            onClick={() => setIsOpen(!isOpen)}
            className="dropdown-btn w-full text-left"
          >
            <div>
              <div className="text-[15px] font-medium leading-tight">
                Food Type
              </div>
              <div className="text-[13px]">Choose food type</div>
            </div>
            {isOpen ? (
              <RiArrowDownSLine className="dropdown-icon-secondary" />
            ) : (
              <RiArrowUpSLine className="dropdown-icon-secondary" />
            )}
          </Menu.Button>

          <Menu.Items
            className="dropdown-menu 
trasition ease-in-out text-sm md:text-normal 
 duration-500 scale-95  "
          >
            {categories.map((i) => {
              return (
                <Menu.Item
                  as="li"
                  key={i.id}
                  onClick={() => setCategory(i.urlParamName)}
                  className="
               delay-75
              cursor-pointer px-8 
              hover:bg-gray-500 py-2 md:py-3 rounded-xl
               hover:text-white transition"
                >
                  {i.name}
                </Menu.Item>
              );
            })}
          </Menu.Items>
        </Menu>
            {/* image Uploader */}
        <div
          className="group p-5 flex justify-center transition-all duration-400 ease-linear group  hover:shadow-lg hover:shadow-slate-100/10 hover:bg-slate-800/70 items-center flex-col border-2 border-dotted border-gray-300 w-full
        h-[225px] cursor-pointer md:h-[350px] rounded-lg"
        >
          {isLoading ? (
              <TailSpin
              height="70"
              width="80"
              color="#14b8a6"
              ariaLabel="tail-spin-loading"
              radius="2"
              wrapperStyle={{}}
              wrapperClass=""
            />) : (<>
            {!imageAsset ? (
                <>
    
                  <lable for="uploadImage" className="w-full p-12 flex flex-col justify-center items-center  cursor-pointer"></lable> 
                    <div className="w-full gap-2 text-gray-400 group-hover:text-white transition duration-500 flex flex-col justify-center items-center">
                      <MdCloudUpload className="" size={30} />
                      <p className="">Click here to upload ...</p>
                      <input
                        type="file"
                        accept="image/*"
                        className="h-0 w-0"
                        id="uploadImage"
                        name="uploadImage"
                      ></input>
                    </div>
                  
                </>
              ) : (
                <>
                  <div className=" relative h-full">
                    <img
                      src="imageAsset"
                      alt="uploadedImage"
                      className="w-full h-full object-cover"
                    ></img>
                    <button
                      onClick={() => onDeleteImage()}
                      className="absolute py-3 bg-red-500 hover:bg-red-600  align-middle items-center flex rounded-full outline-none
             right-3 px-4 bottom-3 text-xl ease-in-out scale-95 hover:scale-100 transition-all duration-500  text-white "
                    >
                      <MdDelete size={25} /> Delete
                    </button>
                  </div>
                </>
              )}
            
            </> )
          
          }

        </div>
            {/*calories and price  */}
        <div className="w-full flex flex-col md:flex-row items-center gap-3 ">
            <div className="w-full rounded-lg py-2 border-b border-gray-300 flex items-center gap-2">
                <MdFoodBank  size={30} className=""/>
                <input  type='text' value={calories} onChange={(e)=> setCalories(e.target.value) } required placeHolder='Calories' 
                className='w-full   h-full text-lg bg-transparent outline-none text-white ' ></input>
            </div>
            <div className="w-full rounded-lg py-2 border-b border-gray-300 flex items-center gap-2">
                <MdMoney  size={30} className=""/>
                <input  type='text' value={price} onChange={(e)=> setPrice(e.target.value)} required placeHolder='Price' 
                className='w-full   h-full text-lg bg-transparent outline-none text-white ' ></input>
            </div>
        </div>

      </div>
    </div>
  );
};

export default CreateContainer;
