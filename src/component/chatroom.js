import React, { useEffect, useState } from 'react';
import ChatRoom from './App.js';
import firebase from '../util/config';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/analytics';
import 'firebase/compat/database';
import { Paper } from '@mui/material';
import { Grid } from '@mui/material';
import './welcome.css';

const Chatroom = () =>{
    const {uid} = firebase.auth().currentUser;
    const [RoomNumber, setRoomNumber] = useState("public");
    const [RoomList, setRoomList] = useState(["public"]);
    const [Change, setChange] = useState('');

    function change(){
        console.log("sign_out");
        firebase.auth().signOut().then(()=>{
        })
    }

    function ChangeKey(){
        var roomname = prompt("請輸入聊天室名稱","");
        if(roomname!=null){
            setRoomNumber(roomname);
            firebase.database().ref('userlist/userdata'+ uid +'/room').push({
                roomname:roomname
            })
        }else{
            alert('輸入錯誤');
        }
    }

    function handleClick(item){
        setRoomNumber(item);
    }
    
    useEffect(()=>{
        setRoomList(["public"]);
        firebase.database().ref('userlist/userdata'+ uid +'/room').on('child_added',function(snapshot){
            var data = snapshot.child('roomname').val();
            //console.log(data);
            if(data){
                setRoomList(oldArray =>  [...oldArray,data])
            }
        })
    },[RoomNumber])

    function AddMember(){
        if(RoomNumber != 'public'){
            var mailname = prompt("請輸入加入成員的信箱","");
            if(mailname != null){
                firebase.database().ref('userlist/').once('value',function(snapshot){
                    for(let item of Object.values(snapshot.val()) ){
                        console.log(item.email);
                        if(item.mail == mailname){
                            var key_word;
                            key_word = firebase.database().ref('userlist/userdata'+item.id+'/room').push({
                                roomname:RoomNumber,
                                check:true
                            }).key;

                            firebase.database().ref('userlist/userdata'+item.id+'/room/'+key_word ).update({
                                key:key_word
                            })
                        }
                    }
                    //data.forEach(element => console.log(element));
                })
            }else{
                alert('輸入錯誤');
            }
        }else{
            alert("You can't add member in public room");
        }
    }

    function handleClick(item){
        setRoomNumber(item);
    }
    /*
        <Grid container spacing={2}>
        <Grid item xs ={2}>
                <Item>xs</Item>
            </Grid>
        <Grid item xs ={2}>
                <Item>xs=6</Item>
            </Grid>
        <Grid item xs = {2}>
                <Item>xs</Item>
            </Grid>
        </Grid>
    */
   
    return <div> 
        
        
        <Grid container spacing={2}>
        <Grid item xs ={2}>
        <button id = 'button2' onClick={ChangeKey}>Add Chatroom</button>
            </Grid>
        <Grid item xs ={2}>
        <button id = 'button2'  onClick={AddMember}>Add Member</button>
            </Grid>
        <Grid item xs = {2}>
        <button align = "center" id = 'button2' onClick={change}>Sign out</button>
            </Grid>
        </Grid>


        <Grid container spacing={0}>
            <Grid item xs={8}>
                <ChatRoom keynum={RoomNumber}/>
            </Grid>
            <Grid item xs={4}>
                    <div id = 'main'>
                        {RoomList.map(item => {
                            return <div><button id = 'button3'onClick={() => handleClick(item)}>{item}</button></div>
                        })}
                    </div>
            </Grid>
            
        </Grid>
    </div>
}

export default Chatroom;