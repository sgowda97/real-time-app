async function collaborationHandler(io) {
    io.on('connection', (socket) => {
        console.log(`User connected: ${socket.id}`);

        socket.on('join-room', (room) => {
            socket.join(room);
            console.log(`User ${socket.id} joined room ${room}`);
        });

        socket.on('collaborate', (data) => {
            const { room, content } = data;

            try {
                socket.to(room).emit('collaborate', content);
            } catch (err) {
                console.log(err);
            }
        });

        socket.on('disconnect', () => {
            console.log(`User disconnected: ${socket.id}`);
        });
    });
}

module.exports = collaborationHandler