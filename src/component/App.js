import React, { useState , useEffect} from 'react';
import './App.css';

import firebase from '../util/config';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/analytics';
import 'firebase/compat/database';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { onSnapshot } from 'firebase/firestore';
import { Paper } from '@mui/material';
import { Grid } from '@mui/material';
var database = firebase.database();

const firestore = firebase.firestore();
const auth = firebase.auth();



const ChatRoom = (props) => {
  const [formValue, setFormValue] = useState('');
  const [ShowMessage, setShowMessage] = useState([]);
  const {keynum} = props;

  function Changetext(e){
    setFormValue(e.target.value);
  }

  function sendMessage (e){
    e.preventDefault();
    const { uid, photoURL }  = auth.currentUser;
    var username;
    var key_value;
    if(formValue!=""){
      database.ref('userlist/userdata'+ uid).once('value',function(snapshot){
        username = snapshot.child('name').val();
      }).then(()=>{
        //console.log('username is ' + username);
          key_value = database.ref('chatlist/' + keynum).push({
          text:formValue,
          id:uid,
          name:username,
          photo:photoURL
        }).key
      }).then(()=>{
        setFormValue("");
        console.log(key_value);
        database.ref('chatlist/' + keynum + '/' + key_value).update({
          key:key_value
        })
      })
    }else{
      alert("Input Empty Message")
    }
    
  }

  const Remove = (val) => {
    console.log(val);
    console.log("1");
  }
  /*
  function Remove(key_val,id_val){
    var remove = prompt("type in 'remove' to remove text","");
    if(remove=='remove'){
      
    }else{
        alert('輸入錯誤');
    }
    
}
  
  useEffect(()=>{
    database.ref('chatlist/'+ keynum).on('child_added',function(snapshot){
      var data = {
        text:snapshot.child('/text').val(),
        id:snapshot.child('/id').val(),
        user:snapshot.child('/name').val(),
      }
      console.log(data.text);
      setShowMessage(oldArray =>  [...oldArray,data])
    })
  },[])
  */
  useEffect(()=>{
    console.log("props change");
    database.ref('chatlist/'+ keynum).on('value',function(snapshot){
      setShowMessage([]);
      console.log("clean");
      for(let item of Object.values(snapshot.val()) ){
        setShowMessage(oldArray => [...oldArray,item]);
        console.log(ShowMessage);
      }
    })
  },[props])

  useEffect(()=>{
    const { uid, photoURL }  = auth.currentUser;
    database.ref('userlist/userdata'+ uid + '/room').on('child_added',function(snapshot){
      
      console.log(snapshot.child('roomname').val());
      console.log(snapshot.child('check').val());
      var t = snapshot.child('key').val();
      var r = snapshot.child('roomname').val();
      var check = snapshot.child('check').val();
      if (check == true) {
        var n = new Notification("Success enter " + r);
        firebase.database().ref('userlist/userdata'+ uid +'/room/' + t).update({
          check:false
        })
      }
    })
  },[props])

  
  return <div class = 'ran'>
      <div id = "out">
        <div id ="main2">
          {ShowMessage.map((values , index) => {
            const {uid}  = auth.currentUser;
            console.log(values.photo);
            var a = values.photo;
            var b = values.key;
            if(values.id != uid)return <div key = {index} id = "text1"><img src = {a||"https://sandstormit.com/wp-content/uploads/2021/06/incognito-2231825_960_720-1.png"}/>{values.name} :<div id = "text2" >{values.text}</div></div> 
            else return <div key = {index} id = "text3"><img src = {a||"https://sandstormit.com/wp-content/uploads/2021/06/incognito-2231825_960_720-1.png"}/>{values.name} :<div id = "text4"><button onClick={()=>{database.ref('chatlist/' + keynum + '/' + values.key).remove();}} id = "button6">🗑️</button >{values.text}</div></div> 
          })}
        </div>
        </div>

      <form>
        <div id = "but" >{keynum}</div>
        <input value={formValue} onChange={(e) => Changetext(e)} placeholder="type here" />
        <button onClick = {(e)=>sendMessage(e)}  value= "Send">Send</button>
      </form>
     
   
      
  </div>
}

export default ChatRoom;