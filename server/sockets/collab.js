async function collaborationHandler(io) {
    io.on('connection', (socket) => {
        console.log(`User connected: ${socket.id}`);

        socket.on('join-room', (room) => {
            socket.join(room);
            console.log(`User ${socket.id} joined room ${room}`);
        });

        socket.on('collaborate', (data) => {
            try {
                const { room, content } = data;

                if (!room || !content) {
                    throw new Error('Invalid data');
                }

                socket.to(room).emit('collaborate', content);
            } catch (err) {
                console.error('Socket error:', err);
            }
        });

        socket.on('disconnect', () => {
            console.log(`User disconnected: ${socket.id}`);
        });
    });
}

module.exports = collaborationHandler