import React, { useContext } from 'react'
import { FcGoogle } from 'react-icons/fc';
import {motion} from 'framer-motion'
import AuthContext from '../../Context/AuthContext';

const GoogleAuth = () => {
    const {onGoogleLogin} = useContext(AuthContext)
  return (
    <>  <div className="flex flex-col justify-center items-center">
    <motion.div
      className="cursor-pointer"
      whileTap={{ scale: 0.6 }}
    >
      <FcGoogle onClick={() => onGoogleLogin()} size={40} />
    </motion.div>
    </div></>
  )
}

export default GoogleAuth