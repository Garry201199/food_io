import React, { useContext } from "react";
import AuthContext from "../Context/AuthContext";
import useAuthStatus from "../Hooks/useAuthStatus";
import bike from "../img/delivery.png";
import bg from "../img/heroBg.png";
import { heroData } from "../Utils/heroData";
const HomeContainer = () => {
  const { currentUser } = useContext(AuthContext);
  const { loggedIn, checkingStatus } = useAuthStatus();

  if (checkingStatus) {
    <h1 className="mt-24 whitespace-pre-wrap text-2xl text-cyan-100">
      Wait for it GUys
    </h1>;
  }
  return (
    <section
      id="home"
      className=" grid grid-cols-1  w-full h-screen md:grid-cols-2 gap-4 "
    >
      <div className=" gap-6 py-2 flex-1 flex flex-col justify-center md:items-start items-center ">
        {/* Bike Delivery */}
        <div className="flex p-1 bg-orange-100 rounded-full font-semibold text-slate-800 items-center  justify-center ">
          <p className="px-1 text-orange-600">Bike Delivery</p>
          <div className="w-10 h-10 rounded-full shadow-2xl drop-shadow-2xl bg-white overflow-hidden">
            <img lazy
              className="w-full h-full object-contain"
              src={bike}
              alt="bike"
            />
          </div>
        </div>
        {/* Fastest text  */}
        <p className="text-[2.5rem] font-semibold  md:tracking-wide  tracking-wider  text-white  md:text-start text-center md:text-[3.5rem] lg:text-[4rem] ">
          The Fastest Delivery In{" "}
          <span className="text-[3rem] text-orange-500 md:text-[4rem]  lg:text-[4.5rem]  ">
            Your City
          </span>
        </p>
        {/* faltu paragraph */}
        <p className=" md:text-left md:w-3/4 text-center">
          Rare nepenthe on yore sainted heart god nothing many, an and nothing
          the placid, angels upon some something till human to will but sad.
          Here and floor thing my and it than, the to out forgotten this cried
          said on.
        </p>
        {/* order now button */}

        <div className="flex justify-center md:justify-start w-full ">
          <div className="grid  gap-8 items-start justify-center">
            <div className="relative   group">
              <div className="absolute  -inset-0.5 bg-gradient-to-r from-yellow-100 to-orange-300 rounded-full blur opacity-75 group-hover:opacity-95 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
              <button
                className="relative  font-semibold px-7 py-4 bg-orange-500 
       rounded-full leading-none flex items-center justify-center
        text-slate-100 "
              >
                Order Now
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* right section */}
      <div className="flex-1 py-2 flex  relative  items-center  md:overflow-y-hidden">
        {/* bg image */}
        <img
          className="h-[420px] ml-auto w-full md:h-[500px] lg:w-auto lg:h-[650px]  "
          lazy="true"
          src={bg}
          alt="bg"
        />
        {/* overlay cards section */}
        <div className="flex flex-wrap md:gap-4 lg:gap-14  
        justify-center items-center  h-full w-full gap-2 py-2
          lg:py-16  lg:px-16  absolute  ">
          {/* cards */}
          {heroData &&
            heroData.map((i) => (
              <div
                key={i.id}
                className=" w-[140px] mb-4 md:w-[190px] shadow-2xl 
            lg:even:mb-12  flex  flex-col items-center 
            justify-center  bg-whiteAlpha backdrop-blur-sm 
            lg:p-4 md:p-3 p-2 rounded-2xl "
              >
                <img lazy='true'
                  src={i.imgsrc}
                  className="lg:w-40  md:w-32 w-20 md:-mt-16  -mt-10 lg:-mt-24"
                  alt="I5"
                />
                <p className="text-center sm:text-lg lg:text-xl sm:mt-1 lg:mt-4 dropshadow-2xl font-semibold text-slate-50">
                  {i.name}
                </p>
                <p className="text-center sm:text-sm dropshadow-2xl my-1 md:my-2 tracking-tight text-slate-200">
                  {i.desc}
                </p>
                <span class="px-3 py-1 font-semibold  text-base text-slate-800 uppercase  rounded-full bg-blue-200">
                  <span className="text-red-500 font-bold">$</span> {i.price}
                </span>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default HomeContainer;
