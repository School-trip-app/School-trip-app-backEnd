const WebSocket = require('ws');
let wss;


// This function, initializeWebSocket, takes an HTTP or HTTPS 
// server as an argument, allowing the WebSocket server 
// to "piggyback" on an existing server.

function initializeWebSocket(server) {
    // wss = new WebSocket.Server({ server });:
    //  Initializes a new WebSocket server (wss) 
    //  using the provided server.

    wss = new WebSocket.Server({ server });

    // wss.on('connection', (ws) => {...});: Sets up an 
    // event listener for new WebSocket connections. 
    // When a client connects, this event triggers:

    wss.on('connection', (ws) => {
        console.log('New client connected');
        ws.on('close', () => console.log('Client disconnected'));
    });
}

function broadcastEvent(data) {
    // This function sends data to all connected clients.
    // if (wss) {...}: Checks if the WebSocket server has been initialized.
    // wss.clients.forEach((client) => {...});: Iterates through each connected client.
    // if (client.readyState === WebSocket.OPEN) {...}: Ensures the client is open and ready to receive messages.
    // client.send(JSON.stringify(data));: Sends the data (converted to a JSON string) to each connected client.

    if (wss) {
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(data));
            }
        });
    }
}

module.exports = { initializeWebSocket, broadcastEvent };
