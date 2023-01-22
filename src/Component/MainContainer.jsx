import React from "react";
import HomeContainer from './HomeContainer'
const MainContainer = () => {
  return (
    <div className="md:px-16 h-auto flex flex-col 
    items-center justify-center  mt-24 md:py-2 
    px-4 w-full">
      <HomeContainer/>
    </div>
  );
};

export default MainContainer;
