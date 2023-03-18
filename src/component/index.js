//import Welcome from './welcome.js';
import Welcome from './welcome.js';
import Chatroom from './chatroom.js';
import firebase from '../util/config';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/analytics';
import 'firebase/compat/database';
import { useAuthState } from 'react-firebase-hooks/auth';
import React,  { useState ,useEffect} from 'react';

const auth = firebase.auth();



const Home = () =>{
  const [user] = useAuthState(auth);
  if (Notification.permission === 'default' || Notification.permission === 'undefined') {
    Notification.requestPermission(function(permission) {
      // permission 可為「granted」（同意）、「denied」（拒絕）和「default」（未授權）
      // 在這裡可針對使用者的授權做處理
    });
  }
  /*
  const [temp , SetTemp] = useState("welcome");
  const [b , SetComponent] = useState(<Welcome func = {SetTemp}/>);
  
  
  useEffect(()=>{
    if(temp == "chat"){
      console.log("go to chatroom");
      SetComponent(<Chatroom func = {SetTemp}/>);
    }else if(temp == "welcome"){
      console.log("go to welcome");
      SetComponent(<Welcome func = {SetTemp}/>);
    }
  })
  */
  return <div>
    {user ? <Chatroom /> : <Welcome />}
  </div>
}

export default Home;