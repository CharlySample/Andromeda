const { Server } = require('socket.io');
const io = new Server();

socketRefresh = () => {
    io.on('connection', (socket) => {
        console.log(`Connected: ${socket.id}`);
        io.on('disconnnect', () => {
            console.log(`Disconnected: ${socket.id}`);
        });
    });
    
    return 0;
};

module.exports = { socketRefresh };