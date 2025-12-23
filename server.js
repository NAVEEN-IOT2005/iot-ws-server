const http = require("http");
const WebSocket = require("ws");

const PORT = process.env.PORT || 3000;

// ================================
// HTTP SERVER (RENDER REQUIRES THIS)
// ================================
const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("WebSocket server is running");
});

// ================================
// WEBSOCKET SERVER
// ================================
const wss = new WebSocket.Server({ server });

console.log("🚀 Starting WebSocket server...");

wss.on("connection", ws => {
  console.log("🔌 Client connected");

  ws.on("message", message => {
    // Broadcast to ALL clients (dashboard + ESP32)
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message.toString());
      }
    });
  });

  ws.on("close", () => {
    console.log("❌ Client disconnected");
  });
});

// ================================
// START SERVER
// ================================
server.listen(PORT, () => {
  console.log(`✅ Server listening on port ${PORT}`);
});
