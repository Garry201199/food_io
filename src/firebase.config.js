import {getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyDAoXfHtqyoUTUgi1k3L4hiGCbUtPgJ6qY",
    authDomain: "food-io-71962.firebaseapp.com",
    databaseURL: "https://food-io-71962-default-rtdb.firebaseio.com",
    projectId: "food-io-71962",
    storageBucket: "food-io-71962.appspot.com",
    messagingSenderId: "1039646497987",
    appId: "1:1039646497987:web:299b2b83d11e91bf011676"
  };

const app = getApps.length >0 ? getApp(): initializeApp(firebaseConfig)
const db = getFirestore(app)
const storage = getStorage(app)

export {app , db , storage } ;