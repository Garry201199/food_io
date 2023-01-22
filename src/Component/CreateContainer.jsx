import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
// import "./Create.css";
import {
  MdCloudUpload,
  MdDelete,
  MdFastfood,
  MdFoodBank,
  MdMoney,
} from "react-icons/md";
import { Menu } from "@headlessui/react";
import { categories } from "../Utils/heroData";
import { RiArrowUpSLine, RiArrowDownSLine } from "react-icons/ri";
import { TailSpin } from "react-loader-spinner";
import {storage} from '../firebase.config'
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
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
  
const onUploadImage =(e) =>{
  setIsLoading(true)
  const imageFile = e.target.files[0]
  console.log(imageFile);
  const storageRef = ref(storage, `Images34/${Date.now()}-${imageFile.name}`);

  const uploadTask = uploadBytesResumable(storageRef, imageFile);
  uploadTask.on('state_changed' , 
  (snapshot)=> {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log(progress);
  } , (error)=> {
    setFields(true)
    setAlertStatus('danger')
    switch (error.code) {
      case 'storage/unauthorized':
        // "User doesn't have permission to access the object"
        setMsg("User doesn't have permission to access the object");
        break;
      case 'storage/canceled':
        setMsg("User canceled the upload");
        break;
      case 'storage/unknown':
   
        setMsg('Unknown error occurred, inspect error.serverResponse');
        break;
    }
    setTimeout(() => {
        setFields(false) ;
       setIsLoading(false)
    }, 4000);
  } , ()=> {
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      setImageAsset(downloadURL)
      setIsLoading(false)
      setFields(true)
      setAlertStatus('success')
      setMsg('Image Uploaded Successfully')
      setTimeout(() => {
        setFields(false) ;
        setIsLoading(false)
      }, 4000);
      console.log('File available at', downloadURL);
    });
  })
}
  const onDeleteImage = () => {
    
  };
  

  return (
    <div className="w-full  min-h-screen flex flex-col mt-24 items-center justify-start">
      <div className="w-[90%] md:w-[75%]   gap-4 border border-gray-300 p-4 flex flex-col rounded-xl items-center justify-between">
        <AnimatePresence  >{fields && (
          <motion.div
            key='nov'
            initial={{ opacity: 0 ,scale:0.5 }}
            animate={{ opacity: 1 ,scale:1  }}
            transition={{duration : 0.3  , ease:'easeIn' }}
            exit={{ opacity: 0 ,scale:0.5 , transition:{ duration : 0.3 } }}
            className={`trans md:py-4 md:px-12 py-2 px-2 rounded-md font-semibold  ${
              alertStatus === "danger" ? "bg-[#FFBABA]  hover:bg-[#FFA4A4] text-[#D8000C] " : "bg-[#B4F298] hover:bg-[#95ef6c] text-[#4F8A10]"
            } shadow-sm  shadow-slate-100 w-full  flex justify-evenly items-center md:text-normal text-sm md:text-lg `}
          >
            <div className="flex w-full justify-between items-center " >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="stroke-current flex-shrink-0 w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span className="max-w-[70%]">{msg} </span>
              <div className={` ${
              alertStatus === "danger" ? "border-[#D8000C] " : "border-[#4F8A10]"
            } border-2  rounded-full p-1 cursor-pointer `} onClick={()=>{setFields(false) ; setIsLoading(false) }} >
            <svg aria-hidden="true" class="w-5 h-5 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
            </svg>
            </div>
            </div>
            

          </motion.div>
          
        )}</AnimatePresence>
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
              <div className="text-[15px] font-medium capitalize leading-tight">
                { category !== null ?  <span className="text-white" >{category}</span> : 'Food Type'  }
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
          className="group p-5 flex justify-center transition-all duration-400 ease-linear group 
           hover:shadow-lg hover:shadow-slate-100/10 hover:bg-slate-800/70 items-center flex-col border-2 border-dotted border-gray-300 w-full
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
            />
          ) : (
            <>
              {!imageAsset ? (
                <>
                  <label
                    for="dropzone-file"
                    className="flex h-full flex-col  items-center justify-center w-full"
                  >
                    <div className="flex text-center flex-col items-center justify-center pt-5 pb-6">
                      <MdCloudUpload className="text-gray-500 group-hover:text-gray-100" size={40} />
                      <p className="mb-2 md:text-xl text-sm   text-gray-500 group-hover:text-gray-100">
                        <span className="font-semibold">Click to upload</span> or
                        drag and drop
                      </p>
                      <p className="text-xs text-gray-500 group-hover:text-gray-100">
                        SVG, PNG, JPG or GIF (MAX. 800x400px)
                      </p>
                    </div>
                    <input id="dropzone-file" onChange={(e) => onUploadImage(e)} type="file" accept="image/*" className="hidden" />
                  </label>
                </>
              ) : (
                <>
                  <div className=" relative h-full w-full">
                    <img
                      src={imageAsset}
                      alt="uploadedImage"
                      className="w-full h-full object-contain "
                    ></img>
                    <button
                      onClick={() => onDeleteImage()}
                      className="absolute py-2 md:py-3 bg-red-500 hover:bg-red-600  align-middle items-center flex rounded-full outline-none
               px-4 bottom-1 right-0  text-lg md:text-xl ease-in-out scale-95 hover:scale-100 transition-all duration-500  text-white "
                    >
                      <MdDelete size={20} /> Delete
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>

        {/*calories and price  */}
        <div className="w-full flex flex-col md:flex-row items-center gap-3 ">
          <div className="w-full rounded-lg py-2 border-b border-gray-300 flex items-center gap-2">
            <MdFoodBank size={30} className="" />
            <input
              type="text"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              required
              placeHolder="Calories"
              className="w-full   h-full text-lg bg-transparent outline-none text-white "
            ></input>
          </div>
          <div className="w-full rounded-lg py-2 border-b border-gray-300 flex items-center gap-2">
            <MdMoney size={30} className="" />
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              placeHolder="Price"
              className="w-full   h-full text-lg bg-transparent outline-none text-white "
            ></input>
          </div>
        </div>

        {/* Save Button */}
        <div className="w-full flex justify-center md:justify-end ">
          <button className="
           py-2 px-6 md:py-3 bg-[#B4F298] hover:bg-[#95ef6c] text-[#42681a] 
           md:w-fit w-full  justify-center items-center flex rounded-full outline-none
           md:px-8  text-xl trans font-semibold
           " >Save</button>
        </div>
      </div>
    </div>
  );
};

export default CreateContainer;
