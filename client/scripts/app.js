console.log('--> Hye it\'s ap m78')

const socket = io();
socket.on('message', function(info) {

  console.log(info);

});
