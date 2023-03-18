//import Welcome from './welcome.js';
import Sign from './sign.js';
import Log from './log.js';
import React,  { useState ,useEffect} from 'react';
import firebase from '../util/config';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/analytics';
import 'firebase/compat/database';
import { Button } from '@mui/material';
import { Grid } from '@mui/material';
import './welcome.css';



const Welcome = () =>{
    
    const [mode , SetMode] = useState("welcome");
    const [a , SetSign] = useState(<Sign />);
    
    
    function toSign(){
        console.log("change_mode");
        SetSign(<Sign />);
    };

    function toLog(){
        console.log("change_mode2");
        SetSign(<Log />);
    };

    /*
    var provider = new firebase.auth.GoogleAuthProvider();
    function toGoogle(){
      console.log('signInWithPopup');
      firebase.auth().signInWithPopup(provider).then(function (result) {
          var token = result.credential.accessToken;
          var user = result.user;
      }).then(function () {
          var user = firebase.auth().currentUser;
          var uid =user.uid;
          firebase.database().ref('userlist/userdata'+ uid).update({
              name:user.displayName,
              id:uid,
              mail:user.email
          }).catch(function (error) {
              console.log('error: ' + error.message);
          });
          console.log("google log in");
      }).catch(function (error) {
          console.log('error: ' + error.message);
      });
    };
    */
    /*
    useEffect(()=>{
      func(mode);
    },[])
    */
   // <div align = "center"><button id = 'button2' onClick={toSign}> Sign Up</button> <button id = 'button2' onClick={toLog}> Log in</button></div>
  return <div>
	  <div class="bg"></div>
	<div class="bg bg2"></div>
	<div class="bg bg3"></div>

    <div class="wrapper">
        <div class="link_wrapper">
          <a href="#"  onClick={toLog}>Log in</a>
          <div class="icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 268.832 268.832">
              <path d="M265.17 125.577l-80-80c-4.88-4.88-12.796-4.88-17.677 0-4.882 4.882-4.882 12.796 0 17.678l58.66 58.66H12.5c-6.903 0-12.5 5.598-12.5 12.5 0 6.903 5.597 12.5 12.5 12.5h213.654l-58.66 58.662c-4.88 4.882-4.88 12.796 0 17.678 2.44 2.44 5.64 3.66 8.84 3.66s6.398-1.22 8.84-3.66l79.997-80c4.883-4.882 4.883-12.796 0-17.678z"/>
            </svg>
          </div>
        </div>
    </div>

    <div class="wrapper2">
        <div class="link_wrapper">
          <a href="#"  onClick={toSign}>Sign Up</a>
          <div class="icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 268.832 268.832">
              <path d="M265.17 125.577l-80-80c-4.88-4.88-12.796-4.88-17.677 0-4.882 4.882-4.882 12.796 0 17.678l58.66 58.66H12.5c-6.903 0-12.5 5.598-12.5 12.5 0 6.903 5.597 12.5 12.5 12.5h213.654l-58.66 58.662c-4.88 4.882-4.88 12.796 0 17.678 2.44 2.44 5.64 3.66 8.84 3.66s6.398-1.22 8.84-3.66l79.997-80c4.883-4.882 4.883-12.796 0-17.678z"/>
            </svg>
          </div>
        </div>
    </div>

    
    <br></br>
      {a}
      
    </div>

    
}

export default Welcome;