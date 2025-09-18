import * as net from "net";

let client = new net.Socket();

client.connect(12345, '127.0.0.1', ()=>{
    console.log("asd");
})