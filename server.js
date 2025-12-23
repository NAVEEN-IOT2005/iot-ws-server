const http = require("http");
const WebSocket = require("ws");

const PORT = process.env.PORT || 3000;

const server = http.createServer((req,res)=>{
  res.writeHead(200);
  res.end("WebSocket server is running");
});

const wss = new WebSocket.Server({ server });

wss.on("connection", ws=>{
  console.log("Client connected");

  ws.on("message", msg=>{
    wss.clients.forEach(client=>{
      if(client.readyState===WebSocket.OPEN){
        client.send(msg.toString());
      }
    });
  });

  ws.on("close",()=>console.log("Client disconnected"));
});

server.listen(PORT,()=>console.log("Server listening on",PORT));
