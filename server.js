const WebSocket = require("ws");
const http = require("http");

const PORT = process.env.PORT || 3000;

// Create HTTP server (RENDER NEEDS THIS)
const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end("WebSocket server is running");
});

// Attach WebSocket to HTTP server
const wss = new WebSocket.Server({ server });

wss.on("connection", ws => {
  console.log("Client connected");

  ws.on("message", msg => {
    // Broadcast message to all connected clients
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(msg.toString());
      }
    });
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

// IMPORTANT: Start listening (Render detects this)
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
