const WebSocket = require('ws')

const server = new WebSocket.Server({port: 8765})

const clients = new Set()

server.on('connection', (ws)=> {
    console.log('New client connected')
    clients.add(ws)
    
    ws.on('message', (message)=> {
        console.log('Received: ' + message)
        // Broadcast to all other clients
        for(const client of clients){
            if(client !== ws && client.readyState === WebSocket.OPEN){
                client.send(`User says: ${message}`)
            }
        }
    })

    ws.on('close', ()=> {
        clients.delete(ws)
        console.log('Client disconnected')
    })
})

console.log('Websocket server running on ws://localhost:8765')