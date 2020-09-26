const rooms = []

function sockets(io) {

    io.on('connection', (socket) => {
        console.log('user connected')

        socket.on('new user', () => {

            // create and join new room
            console.log('kliknul')
            rooms.push({ id: socket.id })
            socket.join(socket.id)            

            console.log(rooms)
        })

        

        socket.on('client-send-message', (msg) => {
            console.log(msg)
            socket.to(socket.id).broadcast.emit('client-message', msg)
        })

        socket.on('admin-send-message', (msg, room) => {
            console.log(msg)
            socket.to(room).broadcast.emit('admin-message', msg)
        })

        socket.on('disconnect', () => {
            // delete room with disconnected user
           // rooms.splice(rooms.indexOf(socket.id), 1)
            console.log(rooms)
            console.log('user disconnected');
        })

    })  
}

module.exports.rooms = rooms
module.exports = sockets