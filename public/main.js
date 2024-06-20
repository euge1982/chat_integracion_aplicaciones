//Cliente

let socket = io.connect();   //Conexion entre el cliente y el server

//Escucha el evento 'messages' del server
socket.on('messages', function(data) {
    console.log(data);
});

//Muestra los msjs en el html
function render(data) {
    var html = data.map(function(elem, index){
    return(`<div>
        <strong>${elem.author}</strong>:
        <em>${elem.text}</em> </div>`)
    }).join(" ");
    document.getElementById('messages').innerHTML = html;
};

socket.on('messages', function(data) { render(data); });   //Escucha el evento 'messages' del servidor

//Para agregar un msj 
function addMessage(e) {
    var mensaje = {   //Arma el msj
        author: document.getElementById('username').value,
        text: document.getElementById('texto').value
    };

    socket.emit('new-message', mensaje);   //Emite el evento 'new-message' al servidor

    document.getElementById('texto').value = '';   //Devuelve el lugar del formulario a donde estaba el msj vacio
    return false;
}
    