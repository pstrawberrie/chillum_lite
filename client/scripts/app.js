import $ from 'jquery';

const socket = io();
socket.on('test', function(info) {

  console.log('test socket came in from back-end');
  console.log(info);

});

// $('a#test').on('click', function() {
//   socket.emit('test', {test:'front-end-click'})
// })

// Screen 1
socket.on('screenChat', function(info) {

    $('.screen-chat').prepend(`
      <div class="item">
        <span class="user">${info.username}</span>
        <span class="message">${info.message}</span>
      </div>
    `)

});
