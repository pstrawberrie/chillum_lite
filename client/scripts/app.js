console.log('--> Hye it\'s ap m78')

const socket = io();
socket.on('passed', function(info) {

  console.log(info);

});
