export default class SocketErrors {
    static emitError(socket, err){
        socket.emit("error", {status: err.status, message: err.message, errors: err.errors})
        console.log(err)
    }
}