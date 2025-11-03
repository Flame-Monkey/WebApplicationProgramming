import * as net from "net";

let connectedSockets: net.Socket[] = [];

let server = net.createServer();
server.on('connection', (socket: net.Socket)=>{
    console.log("hello, connection");
    connectedSockets.push(socket);

    socket.on('data', (data: Buffer)=>{
        console.log(data.toString());
        connectedSockets.forEach(socket => {
            socket.write(data);
        });
    });
})

server.on('close', () => {
    console.log("close");
})
server.on('error', ()=>{
    console.log("error");
})
server.on('listening', ()=>{
    console.log("listening...");
    console.log(server.address());
})

server.listen({host: '127.0.0.1', port: 12345});
