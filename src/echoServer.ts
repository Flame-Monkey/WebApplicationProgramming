import * as net from "net";

let server = net.createServer();
server.on('connection', (socket: net.Socket)=>{
    console.log("hello, connection");
})

server.listen({host: '127.0.0.1', port: 12345});