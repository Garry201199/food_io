import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useEffect, useRef, useState } from 'react'
import { app } from '../firebase.config'


const useAuthStatus = () => {
    
    const [loggedIn , setLoggedIn ] = useState(false)
    const [checkingStatus , setCheckingStatus ]=useState(true)
    const isMounted =useRef(true)
    const [currentUser, setCurrentUser] = useState([]);
    const auth = getAuth(app)
    useEffect(()=>{
        if(isMounted){
          onAuthStateChanged(auth, (user) =>{
            if(user){
                setLoggedIn(true)
                setCurrentUser(user.providerData[0]) 
              }
                setCheckingStatus(false)
        })  
        }return ()=>{
            isMounted.current =(false)
        }
        

    },[isMounted])
  return {loggedIn , currentUser , checkingStatus}
}

export default useAuthStatus