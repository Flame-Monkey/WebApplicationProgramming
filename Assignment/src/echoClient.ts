import * as net from "net";
import * as readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let client = new net.Socket();

client.on('data', (data:Buffer)=>{
    console.log(data.toString());
})

client.connect(12345, "127.0.0.1", () => {
  console.log("server connected.");
});

rl.on("line", (input: string) => {
  client.write(input);
});
