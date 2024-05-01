const app = require('express')();
const server = require('http').Server(app);
var io = require('socket.io')(server);
const { delimiter } = require('path');
const SerialPort = require('serialport');

const config = {
  port: 'COM6', 
  baudRate: 9600,
};


const port = new SerialPort(config.port, { baudRate: config.baudRate });
var i=0;
var S =`[{
  "duration":{
    "hours":0,
    "minutes":0,
    "seconds":3
  },
  "shouldWaitForMotion":false,
  "color":"#FF0000",
  "isOn":true
 },
 {
  "duration":{
    "hours":0,
    "minutes":0,
    "seconds":5
  },
  "shouldWaitForMotion":true,
  "color":"#B053A7",
  "isOn":true
 },
 {
  "duration":{
    "hours":0,
    "minutes":0,
    "seconds":3
  },
  "shouldWaitForMotion":false,
  "color":"#B053A7",
  "isOn":false
 },
 {
   "duration":null,
   "shouldWaitForMotion":false,
   "color":"#FFFFFF",
   "isOn":true
  }
 ]`;
 const jsonObject = JSON.parse(S);

 S = JSON.stringify(jsonObject[i]);


port.on('open', () => {
  console.log('Serial port opened.');

  const dataToSend = 'Hello Arduino!';
  port.write(S, (err) => {
    if (err) {
      console.error('Error sending data:', err.message);
    } else {
      console.log('Data sent to Arduino:', S);
    }
  });
});

port.on('data', (data) => {
  
  if(i>=jsonObject.length-1){
    console.log("done")
  }else{
    i++;
    S = JSON.stringify(jsonObject[i]);
    port.write(S, (err) => {
      if (err) {
        console.error('Error sending data:', err.message);
      } else {
        console.log('Data sent to Arduino:', S);
      }
    });
  }
});


port.on('error', (err) => {
  console.error('Error:', err.message);
});