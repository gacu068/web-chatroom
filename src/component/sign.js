import React,  {useState } from 'react';
import firebase from '../util/config';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/analytics';
import 'firebase/compat/database';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import './log.css'



const Sign = () =>{
    const [name_value , SetName] = useState();
    const [mail_value , SetMail] = useState();
    const [password_value , SetPassword] = useState();


    function ChangeName(e){
        SetName(e.target.value);
    }

    function ChangeMail(e){
        SetMail(e.target.value);
    }

    function ChangePassword(e){
        SetPassword(e.target.value);
    }

    function change(){
        console.log("change");
    }

    function Sign_up(){
        
        firebase.auth().createUserWithEmailAndPassword(mail_value, password_value).then(function(result){
            
            var id = firebase.auth().currentUser.uid;
            firebase.database().ref('userlist/userdata'+ id).set({
                name:name_value,
                id:id,
                mail:mail_value
              }).then(()=>{
                SetMail("");
                SetPassword("");
                SetName("");
                if (Notification && Notification.permission === "granted") {
                    var n = new Notification("Sign Up Success");
                  };})
                change();
        }).catch(function(error){
            console.log(error.message);
            alert("fail");
        });
    }

  

    /*return <div>
        <p>Username :</p>
        <input type="text" id='username' value={name_value} onChange={ChangeName}/>
        <p>Email :</p>
        <input type="email" id='email' value={mail_value} onChange={ChangeMail}/>
        <p>Password :</p>
        <input type="password" id='password'value={password_value} onChange={ChangePassword}/>
        <p/>
        <button id="btnLogin" onClick={Sign_up}>Sign Up</button>
   
    </div>*/

    return(
        <div id="loginform">
          <FormHeader title="Sign up" />
          <div>
          <div class="row">
                    <label>Username</label>
                    <input type="text" placeholder="Enter your Username" value={name_value} onChange={ChangeName}/>
            </div>  
            <div class="row">
                    <label>Email</label>
                    <input type="email" placeholder="Enter your Email" value={mail_value} onChange={ChangeMail}/>
            </div>  
            <div class="row">
                    <label>Password</label>
                    <input type="password" placeholder="Enter your password" value={password_value} onChange={ChangePassword}/>
            </div>
            <div id="button" class="row">
                <button onClick={Sign_up}>Sign up</button>
            </div>
            </div>
        </div>
    )
    
}

const FormHeader = props => (
    <h2 id="headerTitle">{props.title}</h2>
);


export default Sign;