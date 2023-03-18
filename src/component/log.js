import React,  {useState } from 'react';
import firebase from '../util/config';
import 'firebase/compat/auth';
import './log.css'
import 'firebase/compat/firestore';
import 'firebase/compat/analytics';
import 'firebase/compat/database';

const Log = () =>{
    const [mail_value , SetMail] = useState();
    const [password_value , SetPassword] = useState();

    function ChangeMail(e){
        SetMail(e.target.value);
    }

    function ChangePassword(e){
        SetPassword(e.target.value);
    }

    function change(){
        console.log("change");
    }
    
    function Log_in(){
        console.log("do log in");
        console.log(mail_value + password_value);
        firebase.auth().signInWithEmailAndPassword(mail_value, password_value).then(function(result){
            SetMail("");
            SetPassword("");
            change();
            var n = new Notification("Log in Success");
        }).catch(function(error){
            console.log(error.message);
            alert("fail");
        });
    }

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
    /*
    return <div>
        <p>Email :</p>
        <input type="email" id='email' value={mail_value} onChange={ChangeMail}/>
        <p>Password :</p>
        <input type="password" id='password'value={password_value} onChange={ChangePassword}/>
        <p/>
        <button id="btnLogin" onClick={Log_in}>Log In</button>
    </div>
    */
    return(
        <div id="loginform">
          <FormHeader title="Login" />
          <div>
            <div class="row">
                    <label>Email</label>
                    <input type="email" placeholder="Enter your Email" value={mail_value} onChange={ChangeMail}/>
            </div>  
            <div class="row">
                    <label>Password</label>
                    <input type="password" placeholder="Enter your password" value={password_value} onChange={ChangePassword}/>
            </div>
            <div id="button" class="row">
                <button onClick={Log_in} id="button" class="row">Log in</button>
            </div>
            </div>
            <div id="alternativeLogin">
                <label>Or sign in with:</label>
                    <div id="iconGroup">
                    <button  id="googleIcon" onClick={toGoogle}></button>
                    </div>
            </div>
        </div>
    )
}

const FormHeader = props => (
    <h2 id="headerTitle">{props.title}</h2>
);

/*
const Form = props => (
   <div>
     <FormInput description="Username" placeholder="Enter your username" type="text" />
     <FormInput description="Email" placeholder="Enter your password" type="email" value={mail_value} onChange={ChangeMail}/>
     <FormInput description="Password" placeholder="Enter your password" type="password" value={password_value} onChange={ChangePassword}/>
     <FormButton title="Log in" onClick={Log_in}/>
   </div>
);

const FormButton = props => (
  <div id="button" class="row">
    <button>{props.title}</button>
  </div>
);

const FormInput = props => (
  <div class="row">
    <label>{props.description}</label>
    <input type={props.type} placeholder={props.placeholder}/>
  </div>  
);
*/
const OtherMethods = props => (
  <div id="alternativeLogin">
    <label>Or sign in with:</label>
    <div id="iconGroup">
      <Google />
    </div>
  </div>
);

const Google = props => (
  <a href="#" id="googleIcon"></a>
);


export default Log;