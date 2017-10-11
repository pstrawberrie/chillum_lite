import $ from 'jquery';

const socket = io();
socket.on('test', function(info) {

  console.log('test socket came in from back-end');
  console.log(info);

});

$('a#test').on('click', function() {
  socket.emit('test', {test:'front-end-click'})
})
