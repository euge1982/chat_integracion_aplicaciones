//SERVER de la aplicacion

const express = require('express');   //Importa express
const app = express();   //Instancia de express
const server = require('http').Server(app);   //Se importa http
const io = require('socket.io')(server);   //Se importa socket.io

//Servir archivos estáticos desde el directorio 'public'
app.use(express.static('public'));

let messages = [];   //Array donde se van a guardar los mensajes
    
//Conexion con socket.io
io.on('connection', function(socket) {
    console.log('Un cliente se ha conectado');

    socket.emit('messages', messages);   //Emite los msjs iniciales al cliente

    socket.on('new-message', function(data) {   //Escucha el evento 'new-message' del cliente
        messages.push(data);
        io.sockets.emit('messages', messages);   //Emite el evento 'messages' a todos los cliente
    });
});

//Iniciar el servidor
server.listen(8080, function() {
    console.log('Servidor corriendo en http://localhost:8080');
});
    