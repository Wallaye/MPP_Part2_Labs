export default class SocketErrors {
    static emitError(socket, err){
        console.log(err)
        socket.emit("error", err)
    }
}