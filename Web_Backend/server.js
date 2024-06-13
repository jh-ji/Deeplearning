const WebSocket = require('ws');
const express = require('express');
const http = require('http');
const net = require('net');

const app = express();
const server = http.createServer(app);
const server2 = http.createServer(app);
const wss = new WebSocket.Server({ server });
const wss2 = new WebSocket.Server({ server: server2 });

// TCP 서버 생성
const tcpServer = net.createServer(socket => {
    console.log('Client connected');
    let receivedData='';
    socket.on('data', data => {
        receivedData += data.toString('utf-8');
    });

    socket.on('end', () => {
        console.log('Client disconnected');
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                //console.log('Received data:', receivedData);
                client.send(receivedData);
            }
        });
        receivedData = '';
    });
    socket.on('error', err => {
        console.error('Socket error:', err);
        // Handle error as needed
    });
});

tcpServer.on('error', err => {
    console.error('TCP Server error:', err);
});
tcpServer.on('error', err => {
    console.error('TCP Server error:', err);
});
tcpServer.listen(8000, () => {
    console.log('TCP server listening on port 8000');
});



const tcpServer2 = net.createServer(socket => {
    console.log('Client connected');
    let receivedData='';
    socket.on('data', data => {
        receivedData += data.toString('utf-8');
        const decodedData = Buffer.from(receivedData, 'base64');

        // 바이너리 데이터를 UTF-8 문자열로 변환
        const utf8String = decodedData.toString('utf-8');
        console.log(utf8String);

        wss2.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                //console.log('Received data:', receivedData);
                client.send(utf8String);
            }
        });
        
        receivedData='';
    });

    socket.on('end', () => {
        console.log('Client disconnected');
        
    });
    socket.on('error', err => {
        console.error('Socket error:', err);
      
    });
});

tcpServer2.on('error', err => {
    console.error('TCP Server error:', err);
});
tcpServer2.on('error', err => {
    console.error('TCP Server error:', err);
});
tcpServer2.listen(8001, () => {
    console.log('TCP server listening on port 8001');
});


// WebSocket 연결 처리
wss.on('connection', ws => {
    console.log('WebSocket client connected');

    ws.on('message', message => {
        console.log('Received message from WebSocket client:', message);
    });

    ws.on('close', () => {
        console.log('WebSocket client disconnected');
    });
});


server.listen(3001, () => {
    console.log(`WebSocket server listening on port 3001`);
});

wss2.on('connection', ws => {
    console.log('WebSocket client connected');

    ws.on('message', message => {
        console.log('Received message from WebSocket client:', message);
        
    });

    ws.on('close', () => {
        console.log('WebSocket client disconnected');
    });
});


server2.listen(3002, () => {
    console.log(`WebSocket server listening on port 3002`);
});