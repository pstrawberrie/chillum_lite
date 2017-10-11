const socketEntry = require('./socketEntry');

module.exports = {

  startListener(io) {
    this.io = io;
    io.on('connection', function(socket) {

      console.log('Socket Client Connected');
      socket.on('disconnect', function(){
        console.log('Socket Client Disconnected');
      });

      socket.on('test', function(json){
        console.log(`test socket came in from front-end:\n${JSON.stringify(json)}`);
        socketEntry('test', json);
      });

    });
  },

  send(eventName, json) {
    this.io.emit(eventName, json);
  }

}
